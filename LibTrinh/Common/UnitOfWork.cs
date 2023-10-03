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

        /// <summary>
        /// custrustor 
        /// </summary>
        /// <param name="connection"></param>
        /// <param name="cache"></param>
        /// <param name="transactional"></param>
        /// <param name="isolationLevel"></param>
        /// <param name="retryOptions"></param>
        internal UnitOfWork(SqlConnection connection,bool transactional = false
                            ,IsolationLevel isolationLevel = IsolationLevel.ReadCommitted,RetryOptions retryOptions = null)
        {
            _conn = connection;
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
        public Task ExecuteAsync(IAsyncCommand pCommand, CancellationToken pCancellationToken = default)
        {
            if (pCommand._blnRequiresTransaction && _transaction == null)
                throw new ArgumentNullException($"The command {pCommand.GetType()} requires a transaction");

            return Retry.DoAsync(() => pCommand.ExecuteAsync(_conn, _transaction, pCancellationToken), _retryOptions);
        }
        public interface IAsyncCommand
        {
            bool _blnRequiresTransaction { get; }
            bool _blnRequiresCache { get; }

            Task ExecuteAsync(IDbConnection connection, IDbTransaction transaction, CancellationToken cancellationToken = default);
        }

        #region
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
                com.CommandTimeout = 5;
                com.Transaction = (SqlTransaction)_transaction;
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
            finally
            {
                _conn.Close();
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
            com.CommandTimeout = 5;
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
    }
}
