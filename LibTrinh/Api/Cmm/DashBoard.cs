using AutoMapper;
using LibTrinh.Common;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Data;



namespace LibTrinh.Api.Cmm
{
    public class DashBoard : BusinessService, IDashBoard
    {
        public DashBoard(IBaseDbContext pContext, IMapper pMapper, IHttpContextAccessor pHttpContext) : base(pContext, pMapper, pHttpContext)
        {
        }

        /// <summary>
        /// LoadDataHeardDashBoard
        /// </summary>
        public async Task<string> LoadDataHeardDashBoard()
        {
            try
            {
                using (var uow = await _context.CreateAsync())
                {
                    var LoadDataHeard = await uow.ExecuteDataTable("[yyy_sp_CountHeardDashBoard]", CommandType.StoredProcedure);
                    uow.Commit();
                    return JsonConvert.SerializeObject(LoadDataHeard);
                };
            }
            catch (Exception ex)
            {
                _fileLogger.Error(ex.Message);
                return null;
            }
        }
    }
}
