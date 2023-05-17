using AutoMapper;
using LibTrinh.Common;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibTrinh.Api.Report
{
    public class Medicine : BusinessService, IMedicine
    {
        public Medicine(IBaseDbContext pContext, IMapper pMapper, IHttpContextAccessor pHttpContext) : base(pContext, pMapper, pHttpContext)
        {
        }
        /// <summary>
        /// LoadMedicineReport
        /// </summary>
        /// <returns></returns>

        public async Task<string> LoadMedicineReport()
        {
            try
            {
                using (var uow = await _context.CreateAsync())
                {
                    var dataMedicineReport = await uow.ExecuteDataTable("[yyy_sp_LoadData_Medicine]", CommandType.StoredProcedure
                       );
                    uow.Commit();
                    return JsonConvert.SerializeObject(dataMedicineReport);
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
