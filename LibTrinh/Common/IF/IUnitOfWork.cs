using System;
using System.Data;
using System.Threading;
using System.Threading.Tasks;

namespace LibTrinh.Common
{
    /// <summary>
    /// IUnitOfWork
    /// </summary>
    public interface IUnitOfWork : IDisposable
    {
        void Commit();
        void Rollback();

        /// <summary>
        /// ExecuteDatabaseLog
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public string ExecuteDatabaseLog(string s);

        /// <summary>
        /// ExecuteDatabaseNoLog
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public string ExecuteDatabaseNoLog(string s);

        /// <summary>
        /// LoadDataSource_Table
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public DataTable LoadDataSource_Table(string s);

        /// <summary>
        /// LoadDataSource_DataSet
        /// </summary>
        /// <param name="s"></param>
        /// <returns></returns>
        public DataSet LoadDataSource_DataSet(string s);

        /// <summary>
        /// ExecuteDataSet
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="commandType"></param>
        /// <param name="pars"></param>
        /// <returns></returns>
        public Task<DataSet> ExecuteDataSet(string sql,
          CommandType commandType,
          params object[] pars);
        /// <summary>
        /// ExecuteDataTable
        /// </summary>
        /// <param name="sql"></param>
        /// <param name="commandType"></param>
        /// <param name="pars"></param>
        /// <returns></returns>
        public Task<DataTable> ExecuteDataTable(string sql, CommandType commandType, params object[] pars);
    }
}
