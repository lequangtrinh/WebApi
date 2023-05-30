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

namespace LibTrinh.Api
{
    /// <summary>
    /// Bed
    /// </summary>
    public class Bed : BusinessService, IBed
    {
        public Bed(IBaseDbContext pContext, IMapper pMapper, IHttpContextAccessor pHttpContext) : base(pContext, pMapper, pHttpContext)
        {
        }
        /// <summary>
        /// LoadBed
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<string> LoadBed(int id)
        {
            try
            {
                using (var uow = await _context.CreateAsync())
                {
                    var DataCbxRoom = await uow.ExecuteDataTable("[YYY_sp_LoadBed]", CommandType.StoredProcedure
                        , "@IDRoom", SqlDbType.Int, id);
                    uow.Commit();
                    return JsonConvert.SerializeObject(DataCbxRoom);
                };
            }
            catch (Exception ex)
            {
                _fileLogger.Error(ex.Message);
                return "";
            }
        }
        /// <summary>
        /// LoadBedAlotment
        /// </summary>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<string> LoadBedAlotment()
        {
            try{
                using (var uow = await _context.CreateAsync())
                {
                    var Data = await uow.ExecuteDataTable("[YYY_sp_LoadBedAlotment]", CommandType.StoredProcedure);
                    uow.Commit();
                    return JsonConvert.SerializeObject(Data);
                };
            }
            catch (Exception ex)
            {
                _fileLogger.Error(ex.Message);
                return "";
            }
        }

        /// <summary>
        /// LoadComboboxRoom
        /// </summary>
        /// <returns></returns>
        public async Task<string> LoadComboboxRoom()
        {
            try
            {
                using (var uow = await _context.CreateAsync())
                {
                    var DataCbxRoom = await uow.ExecuteDataTable("[YYY_sp_LoadComBoRoom]", CommandType.StoredProcedure);
                    uow.Commit();
                    return JsonConvert.SerializeObject(DataCbxRoom);
                };
            }
            catch(Exception ex)
            {
                _fileLogger.Error(ex.Message);
                return "";
            }
        }
    }
}
