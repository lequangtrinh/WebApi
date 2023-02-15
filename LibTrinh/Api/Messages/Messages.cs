using AutoMapper;
using LibTrinh.Common;
using LibTrinh.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Text;
using System.Text.Json;

namespace LibTrinh.Api
{
    public class Messages : BusinessService,IMessages
    {
        private string _Pathfile;
        protected IConfiguration _config { get; }
        private readonly IRedisCacheService _IRedisCache;
        /// <summary>
        /// custrustor
        /// </summary>
        /// <param name="pContext"></param>
        /// <param name="pMapper"></param>
        /// <param name="pHttpContext"></param>
        public Messages(IConfiguration pConfiguration,IBaseDbContext pContext
            , IMapper pMapper, IHttpContextAccessor pHttpContext
            , IRedisCacheService IRedisCache) : base(pContext, pMapper, pHttpContext)
        {
            _config = pConfiguration;
            _IRedisCache = IRedisCache;
            _Pathfile = Path.Combine(AppDomain.CurrentDomain.BaseDirectory.Replace("bin\\Debug\\net6.0\\", "") + _config["Path:ForFront:MessagesPath"].ToString());
        }
        /// <summary>
        /// LoadFriendMessages
        /// </summary>
        /// <param name="UserID"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<string> LoadFriendMessages(string UserID)
        {
            try
            {
                using (var uow = await _context.CreateAsync())
                {
                    List<CFaLoadMessagesFriendsDTO> lstDataFriend = new List<CFaLoadMessagesFriendsDTO>();
                    var CheckUser = await uow.ExecuteDataTable("[YYY_sp_LoadDataFriendChat]", CommandType.StoredProcedure
                       ,"@UserID", SqlDbType.NVarChar, UserID.Trim()
                       );
                    foreach (DataRow row in CheckUser.Rows)
                    {
                        lstDataFriend.Add(new CFaLoadMessagesFriendsDTO
                        {
                            UserID = row["UserID"].ToString().Trim(),
                            IDFriend = row["IDFriend"].ToString().Trim(),
                            Status = row["Status"].ToString().Trim(),
                            CreateDate= row["CreateDate"].ToString().Trim(),
                            UserName = row["UserName"].ToString().Trim(),
                            TimeOnline = row["TimeOnline"].ToString().Trim(),
                            Image = row["Image"].ToString(),
                        });
                    }
                    uow.Commit();
                    return JsonSerializer.Serialize(lstDataFriend);
                };
            }
            catch (Exception ex)
            {
                _fileLogger.Error(ex.Message);
                return null;
            }
            return null;
        }

        /// <summary>
        /// LoadDataMessages
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="UserIDTo"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<string> LoadDataMessages(string UserID, string UserIDTo)
        {
            try
            {
                using (var uow = await _context.CreateAsync())
                {
                    var res = "";
                    #region check cache in redis
                    if (string.IsNullOrWhiteSpace(_IRedisCache.Get<string>($"{UserID + "_" + UserIDTo}").ToString()))
                    {
                        res = _IRedisCache.Get<string>($"{UserID + "_" + UserIDTo}").ToString();
                    }
                    #endregion
                    //get value DB 
                    else
                    {//List<CFaTableChatDTO> lstData = new List<CFaTableChatDTO>();
                        var valueMess = await uow.ExecuteDataTable("[YYY_sp_LoadDataChatUsers]", CommandType.StoredProcedure
                           , "@UserID", SqlDbType.NVarChar, UserID.Trim()
                           , "@UserIDTo", SqlDbType.NVarChar, UserIDTo.Trim()
                           );
                        foreach (DataRow row in valueMess.Rows)
                        {
                            res = ReldFileDataMess(row["ValueMess"].ToString().Trim());
                            //lstData.Add(new CFaTableChatDTO
                            //{
                            //    UserID = row["UserID"].ToString().Trim(),
                            //    UserIDTo = row["UserIDTo"].ToString().Trim(),
                            //    ValueMess = row["ValueMess"].ToString().Trim(),
                            //    CreateDate = row["CreateDate"].ToString().Trim(),
                            //    UpdateDate = row["UpdateDate"].ToString().Trim(),
                            //    FlagsDiv = row["FlagsDiv"].ToString().Trim()
                            //});
                        }
                    }
                    uow.Commit();
                    return res;
                };
            }
            catch (Exception ex)
            {
                _fileLogger.Error(ex.Message);
                return null;
            }
            return null;

        }
        /// <summary>
        /// ReldFileDataMess
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public string ReldFileDataMess(string data)
        {
            var res = "";
            FileStream fs = new FileStream($"{_Pathfile}\\"+ data, FileMode.Open);
            StreamReader rd = new StreamReader(fs, Encoding.UTF8);
            res = rd.ReadToEnd();
            rd.Close();
            return res;
        }
        /// <summary>
        /// RegisDataMessagesUser
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public async Task<bool> RegisDataMessagesUser(CFaRegisMessagesUserDTO data)
        {
            var data1=data.ToString();
            try
            {
                if (!Directory.Exists(_Pathfile))
                {
                    Directory.CreateDirectory(_Pathfile);
                }
                string FileName = $"{data.UserID}_{data.UserIDTo}_{ Guid.NewGuid()}.txt";
                string pathFile = Path.Combine(_Pathfile, FileName);

                if (!System.IO.File.Exists(pathFile))
                {
                    // save cache redis
                    #region
                    _IRedisCache.Set<string>($"{data.UserID+"_"+data.UserIDTo}", pathFile);
                    _IRedisCache.Set<string>($"{data.UserIDTo + "_" + data.UserID}", pathFile);
                    //var xx = _IRedisCache.Get<string>("Login");
                    #endregion

                    File.WriteAllText(pathFile, data.DataMess.ToString());
                    using (var uow = await _context.CreateAsync())
                    {
                        var regisMessages = await uow.ExecuteDataTable("[YYY_sp_InstUpMessagesUser]", CommandType.StoredProcedure,
                        "@UserID", SqlDbType.NVarChar, data.UserID
                        , "@UserIDTo", SqlDbType.NVarChar, data.UserIDTo
                        , "@ValueMess", SqlDbType.NVarChar, FileName
                        , "@CreateDate", SqlDbType.NVarChar, DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss")
                        , "@UpdateDate", SqlDbType.NVarChar, DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss")
                    );
                    }
                }
                return true;
            }
            catch(Exception ex)
            {
                return false;
                _fileLogger.Error(ex.Message);
            }
        }
    }
}
