using AutoMapper;
using LibTrinh.Common;
using LibTrinh.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Data;

namespace LibTrinh.Api
{
    /// <summary>
    /// User
    /// </summary>
    public class User : BusinessService, IUser
    {
        public User(IBaseDbContext pContext, IMapper pMapper, IHttpContextAccessor pHttpContext) : base(pContext, pMapper, pHttpContext)
        {
        }
        /// <summary>
        /// LoadUser
        /// </summary>
        /// <returns></returns>
        public async Task<string> LoadUser(CFaSerachUserDTO cFaSerachUserDTO)
        {
            try
            {
                using (var uow = await _context.CreateAsync())
                {
                    List<CFaUserLoginDTO> lstDataUser= new List<CFaUserLoginDTO>();
                    var CheckUser = await uow.ExecuteDataTable("[YYY_sp_LoadUsers]", CommandType.StoredProcedure,
                        "@UserID", SqlDbType.NVarChar,cFaSerachUserDTO.UserID
                       );
                    uow.Commit();
                    return JsonConvert.SerializeObject(CheckUser);
                };
            }
            catch (Exception ex)
            {
                _fileLogger.Error(ex.Message);
                return null;
            }
            return null;
        }
    }
}
