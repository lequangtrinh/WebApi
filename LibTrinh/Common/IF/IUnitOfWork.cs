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
