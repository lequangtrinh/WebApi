using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace LibTrinh.Common
{
    /// <summary>
    /// UnitOfWork
    /// </summary>
    public class UnitOfWork : IUnitOfWork
    {
        private bool _blnDisposed;
        private SqlConnection _conn;
        private readonly RetryOptions _retryOptions;
        private IDbTransaction _transaction;
        private readonly IMemoryCache _cache;

        /// <summary>
        /// custrustor 
        /// </summary>
        /// <param name="connection"></param>
        /// <param name="cache"></param>
        /// <param name="transactional"></param>
        /// <param name="isolationLevel"></param>
        /// <param name="retryOptions"></param>
        internal UnitOfWork(SqlConnection connection,IMemoryCache cache,bool transactional = false
                            ,IsolationLevel isolationLevel = IsolationLevel.ReadCommitted,RetryOptions retryOptions = null)
        {
            _conn = connection;
            _cache = cache;
            _retryOptions = retryOptions;
            if (transactional)
                _transaction = connection.BeginTransaction(isolationLevel);
        }
        public void Commit()
        => _transaction?.Commit();

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void Rollback()
        => _transaction?.Rollback();
        ~UnitOfWork()
          => Dispose(false);

        /// <summary>
        /// Dispose
        /// </summary>
        /// <param name="pDisposing"></param>
        protected virtual void Dispose(bool pDisposing)
        {
            if (_blnDisposed)
                return;

            if (pDisposing)
            {
                _transaction?.Dispose();
                _conn?.Dispose();
            }

            _transaction = null;
            _conn = null;

            _blnDisposed = true;
        }
        #region
        /// <summary>
        /// ExecuteDatabaseLog
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public string ExecuteDatabaseLog(string s)
        {
            SqlCommand command = (SqlCommand)_conn.CreateCommand();
            SqlTransaction transaction = (SqlTransaction)_conn.BeginTransaction();
            command.Transaction = transaction; command.CommandText = @s;
            try
            {
                command.ExecuteNonQuery();
                transaction.Commit();
                // EnterLog(s);
                if (_conn.State == ConnectionState.Open) _conn.Close();
                return "";
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw ex;
            }
            finally
            {
                transaction.Dispose();
            }
        }
        /// <summary>
        /// ExecuteDatabaseNoLog
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public string ExecuteDatabaseNoLog(string s)
        {
            SqlCommand command = (SqlCommand)_conn.CreateCommand();
            SqlTransaction transaction = (SqlTransaction)_conn.BeginTransaction();
            command.Transaction = transaction;
            command.CommandText = @s;
            try
            {
                command.ExecuteNonQuery();
                transaction.Commit();

                if (_conn.State == ConnectionState.Open) _conn.Close();
                return "";
            }
            catch (Exception ex)
            {
                transaction.Rollback();
                throw ex;
            }
            finally
            {
                transaction.Dispose();
            }
        }
        /// <summary>
        /// LoadDataSource_Table
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public DataTable LoadDataSource_Table(string s)
        {
            try
            {
                SqlCommand cmd = new SqlCommand(@s, (SqlConnection)_conn);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable table = new DataTable("myTable");
                da.Fill(table);
                if (_conn.State == ConnectionState.Open) _conn.Close();
                return table;
            }
            catch
            {
                return null;
            }
        }
        /// <summary>
        /// LoadDataSource_DataSet 
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public DataSet LoadDataSource_DataSet(string s)
        {
            try
            {
                SqlCommand cmd = new SqlCommand(@s, (SqlConnection)_conn);
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataSet ds = new DataSet();
                da.Fill(ds);
                if (_conn.State == ConnectionState.Open) _conn.Close();
                return ds;
            }
            catch
            {
                return null;
            }
        }
        /// <summary>
        /// ExecuteDataTable
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="commandType"></param>
        /// <param name="pars"></param>
        /// <returns></returns>
        public async Task<DataTable> ExecuteDataTable(string sql, CommandType commandType, params object[] pars)
        {
            try
            {
                SqlDataReader rdr = null;
                SqlCommand com = new SqlCommand(sql, (SqlConnection)_conn);
                com.CommandType = commandType;
                com.CommandTimeout = 10000;
                for (int i = 0; i < pars.Length; i += 3)
                {
                    SqlParameter par = new SqlParameter(pars[i].ToString(), pars[i + 1]);
                    par.Value = pars[i + 2];
                    com.Parameters.Add(par);
                }
                SqlDataAdapter dad = new SqlDataAdapter(com);
                DataTable dt = new DataTable();
                dad.Fill(dt); // Fill the dataset with the query data
                //await Task.Run(() => dad.Fill(dt));
                _conn.Close();
                return dt;
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }

        }
        /// <summary>
        /// ExecuteDataSet
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="commandType"></param>
        /// <param name="pars"></param>
        /// <returns></returns>
        public async Task<DataSet> ExecuteDataSet(string sql,
           CommandType commandType,
           params object[] pars)
        {
            if (_conn.State == ConnectionState.Closed) _conn.Open();
            SqlCommand com = new SqlCommand(sql, (SqlConnection)_conn);
            com.CommandType = commandType;
            com.CommandTimeout = 10000;
            for (int i = 0; i < pars.Length; i += 3)
            {
                SqlParameter par = new SqlParameter(pars[i].ToString(), pars[i + 1]);
                par.Value = pars[i + 2];
                com.Parameters.Add(par);
            }

            SqlDataAdapter dad = new SqlDataAdapter(com);
            DataSet ds = new DataSet();
            await Task.Run(() => dad.Fill(ds));
            if (_conn.State == ConnectionState.Open) _conn.Close();
            return ds;
        }
        #endregion

        private static List<T> ConvertDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }
        private static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                        pro.SetValue(obj, dr[column.ColumnName], null);
                    else
                        continue;
                }
            }
            return obj;
        }
    }
}
