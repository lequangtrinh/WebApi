using AutoMapper;
using LibTrinh.Common;
using LibTrinh.Models;
using Microsoft.AspNetCore.Http;
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
        public async Task<CFaPaginPriceServicesDTO> LoadPriceServices(int Pagination)
        {
            try
            {
                using (var uow = await _context.CreateAsync())
                {
                    CFaPaginPriceServicesDTO cFaPaginPriceServicesDTO = new CFaPaginPriceServicesDTO();
                    List<CFaPriceServicesDTO> lstPriceServices = new List<CFaPriceServicesDTO>();
                    var CheckData = await uow.ExecuteDataTable("[YYY_sp_Load_T_PriceServices]", CommandType.StoredProcedure
                        , "@PAGINATION", SqlDbType.Int, Pagination
                         , "@COUNT", SqlDbType.Int, 0
                       );
                    foreach (DataRow row in CheckData.Rows)
                    {
                        lstPriceServices.Add(new CFaPriceServicesDTO
                        {
                            CodeServices= row["CodeServices"].ToString().Trim(),
                            Name = row["Name"].ToString().Trim(),
                            Price  = row["Price"].ToString().Trim(),
                            Images = row["Images"].ToString().Trim(),
                            CreateDate = row["CreateDate"].ToString().Trim()
                        });
                    }
                    cFaPaginPriceServicesDTO.lstPriceServicesDTO = lstPriceServices;
                    cFaPaginPriceServicesDTO.CountData = 10;
                    uow.Commit();
                    return cFaPaginPriceServicesDTO;
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
