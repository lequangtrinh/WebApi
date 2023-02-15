using AutoMapper.Configuration;
using Microsoft.Extensions.Caching.Memory;
using System.Data;
using System.Data.SqlClient;

namespace LibTrinh.Common
{
    /// <summary>
    /// BaseDbContext
    /// </summary>
    public class BaseDbContext : IBaseDbContext
    {
        private SqlConnection _conn;
        private readonly string _connectionString;
        private readonly IMemoryCache _cache;

        /// <summary>
        /// cutrustor
        /// </summary>
        public BaseDbContext()
        {
            try
            {
                _connectionString = String.Format(@"data source={0}; " + "Initial Catalog={1}; User ID={2};Password={3};Trusted_Connection=false; ", GlobalBase.Global.sys_DB_SOURCE
                    , GlobalBase.Global.sys_DB_Name
                   , GlobalBase.Global.sys_DB_User
                   , GlobalBase.Global.sys_DB_Pass);
                _conn = new SqlConnection(_connectionString);
                if (_conn.State == ConnectionState.Closed) _conn.Open();
                Console.WriteLine("----------------------connect thanh cong--------------------------------");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"----------------------Erron{0}--------------------------------", ex.Message);
            }
        }

        /// <summary>
        /// cutrustor connct db
        /// </summary>
        /// <param name="configuration"></param>
        /// <param name="cache"></param>
        public BaseDbContext(IConfiguration configuration,
            IMemoryCache cache)
        {
            _connectionString = String.Format(@"data source={0}; " + "Initial Catalog={1}; User ID={2};Password={3};Trusted_Connection=false; ", GlobalBase.Global.sys_DB_SOURCE
                   , GlobalBase.Global.sys_DB_Name
                   , GlobalBase.Global.sys_DB_User
                   , GlobalBase.Global.sys_DB_Pass);
            _cache = cache;
            Console.WriteLine("----------------------connect thanh cong--------------------------------");
        }
        public IUnitOfWork Create(bool pTransactional = false, IsolationLevel pIsolationLevel = IsolationLevel.ReadCommitted, RetryOptions pRetryOptions = null)
        {
             _conn = new SqlConnection(_connectionString);
            _conn.Open();

            return new UnitOfWork(_conn, _cache, pTransactional, pIsolationLevel, pRetryOptions);
        }

        public async Task<IUnitOfWork> CreateAsync(bool pTransactional = false, IsolationLevel pIsolationLevel = IsolationLevel.ReadCommitted, RetryOptions pRetryOptions = null, CancellationToken pCancellationToken = default)
        {
            _conn = new SqlConnection(_connectionString);
            //_conn.Close();
            await _conn.OpenAsync(pCancellationToken);

            return new UnitOfWork(_conn, _cache, pTransactional, pIsolationLevel, pRetryOptions);
        }
       
    }
}
