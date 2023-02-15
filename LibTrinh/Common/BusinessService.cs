using AutoMapper;
using log4net;
using Microsoft.AspNetCore.Http;

namespace LibTrinh.Common
{
    /// <summary>
    /// BusinessService
    /// </summary>
    public class BusinessService
    {
        #region param
        protected readonly ILog _fileLogger;
        protected readonly ILog _dbUserLogger;
        protected readonly IBaseDbContext _context;
        protected readonly IHttpContextAccessor _pHttpContext;
        protected readonly string _language;
        protected readonly IMapper _mapper;
        #endregion

        /// <summary>
        /// cutrustor 
        /// </summary>
        /// <param name="pContext"></param>
        /// <param name="pMapper"></param>
        /// <param name="pHttpContext"></param>
        public BusinessService(IBaseDbContext pContext, IMapper pMapper, IHttpContextAccessor pHttpContext)
        {
            _fileLogger = LogManager.GetLogger("LogFileLogger");
            _dbUserLogger = LogManager.GetLogger("UserLogger");
            _context = pContext;
            _pHttpContext = pHttpContext;
            _mapper = pMapper;
            
        }

        /// <summary>
        /// Log info User
        /// </summary>
        /// <param name="pOperationDate"></param>
        /// <param name="pUserID"></param>
        /// <param name="pSql"></param>
        protected void LogInfoUser(DateTime pOperationDate, int pUserID, string pSql)
        {
            Task logTask = new Task(() =>
            {
                ThreadContext.Properties["OperationDate"] = pOperationDate;
                ThreadContext.Properties["UserID"] = pUserID;
                ThreadContext.Properties["RunSQL"] = pSql;
                _dbUserLogger.Info("Log");
            });
            logTask.Start();
        }
    }
}
