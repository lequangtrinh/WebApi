using AutoMapper;
using LibTrinh.Common;
using LibTrinh.Models;
using Microsoft.AspNetCore.Http;
using System.Data;
using System.Text.Json;

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
        public async Task<string> LoadUser()
        {
            try
            {
                using (var uow = await _context.CreateAsync())
                {
                    List<CFaUserLoginDTO> lstDataUser= new List<CFaUserLoginDTO>();
                    var CheckUser = await uow.ExecuteDataTable("[YYY_sp_UserLogin]", CommandType.StoredProcedure
                       );
                    foreach (DataRow row in CheckUser.Rows)
                    {
                        lstDataUser.Add(new CFaUserLoginDTO
                        {
                            UserID = row["UserID"].ToString(),
                            UserName = row["UserName"].ToString(),
                            Password = row["Password"].ToString(),
                            Image = row["Image"].ToString(),
                            PassReissueKey = row["PassReissueKey"].ToString(),
                            Email = row["Email"].ToString(),
                            Role = row["Role"].ToString(),
                            Address= row["Address"].ToString(),
                            PhoneNumber = row["PhoneNumber"].ToString()

                        });
                    }
                    uow.Commit();
                    return JsonSerializer.Serialize(lstDataUser);
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
