using AutoMapper;
using LibTrinh.Common;
using LibTrinh.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Data;
using System.Text.Json;

namespace LibTrinh.Api.PriceServices
{
    /// <summary>
    /// PriceServices
    /// </summary>
    public class PriceServices : BusinessService,IPriceServices
    {
        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="pContext"></param>
        /// <param name="pMapper"></param>
        /// <param name="pHttpContext"></param>
        public PriceServices(IBaseDbContext pContext, IMapper pMapper, IHttpContextAccessor pHttpContext) : base(pContext, pMapper, pHttpContext)
        {
        }
        #region LoadPriceServices
        /// <summary>
        /// LoadPriceServices
        /// </summary>
        /// <param name="Pagination"></param>
        /// <returns></returns>
        public async Task<string> LoadPriceServices(CFaSearchPriceServicesDTO searchPrice)
        {
            try
            {
                using (var uow = await _context.CreateAsync())
                {
                    var DataPrice = await uow.ExecuteDataTable("[YYY_sp_Load_T_PriceServices]", CommandType.StoredProcedure
                        , "@UserID", SqlDbType.NVarChar, searchPrice.UserUpdate
                       );
                    uow.Commit();
                    return JsonConvert.SerializeObject(DataPrice);
                };
            }
            catch (Exception ex)
            {
                _fileLogger.Error(ex.Message);
                return null;
            }
            return null;
        }
        #endregion
    }
}
