using AutoMapper;
using Microsoft.Extensions.Configuration;
using LibTrinh.Models;
using Microsoft.AspNetCore.Http;
using System.Data;
using MailKit.Security;
using MimeKit.Text;
using MimeKit;
using MailKit.Net.Smtp;
using Newtonsoft.Json;
using System.Text;

namespace LibTrinh.Common.Api.AuthenService
{
    /// <summary>
    /// AuthenService
    /// </summary>
    public class AuthenService : BusinessService, IAuthenService
    {
        protected IConfiguration _config { get; }
        private string _generatedToken = null;
        private readonly ITokenService _tokenService;
        private string _PathImg;
        private int _NumBerOTP;

        //protected JwtService _jwtService;
        public AuthenService(IConfiguration pConfiguration, IBaseDbContext pContext
                            , IMapper pMapper, IHttpContextAccessor pHttpContext, ITokenService tokenService) : base(pContext, pMapper, pHttpContext)
        {
            _config = pConfiguration;
            _tokenService = tokenService;
            _PathImg = AppDomain.CurrentDomain.BaseDirectory + _config["Path:ForFront:ImagePath"].ToString();
        }
        #region login 
        /// <summary>
        /// LoginAsync
        /// </summary>
        /// <param name="pUserLoginInf"></param>
        /// <returns></returns>
        public async Task<CFaTokenLoginDTO> LoginAsync(CFaUserInfoDTO pUserLoginInf)
        {
            try
            {
                switch (pUserLoginInf.flags)
                {
                    case "0":
                        {
                            return await LoginUserAsync(pUserLoginInf);
                            break;
                        }
                    case "1":
                        {
                            return  LoginGoolgeAsync();
                            //return await LoginGoolgeAsync(pUserLoginInf);
                            break;
                        }
                    case "2":
                        {
                            ; break;
                        }
                }
            }
            catch (Exception ex)
            {
                _fileLogger.Error(ex.Message);

            }
            return null;
        }
        /// <summary>
        /// LoginGoolgeAsync
        /// </summary>
        /// <param name="pUserLoginInf"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<CFaTokenLoginDTO> LoginUserAsync(CFaUserInfoDTO pUserLoginInf)
        {
            try
            {
                UserDTO userDto = new UserDTO();
                CFaTokenLoginDTO token = new CFaTokenLoginDTO();
                CFaUserDTO cFaUserDTO = new CFaUserDTO();
                using (var uow = await _context.CreateAsync())
                {
                    string strPwd = Encrypt.EncryptString(pUserLoginInf.PassWord, _config["DATA:ROOTCODE"].ToString());
                    var CheckUser = await uow.ExecuteDataTable("[YYY_sp_CheckLoginUser]", CommandType.StoredProcedure,
                        "@UserID", SqlDbType.NVarChar, pUserLoginInf.userID
                    );
                    foreach (DataRow row in CheckUser.Rows)
                    {
                        userDto.UserName = row["UserName"].ToString();
                        userDto.Password = row["Password"].ToString();
                        userDto.IP = "123.123.123";
                        userDto.Role = row["Role"].ToString();
                    }
                    bool checkPass = verifyPass(strPwd, userDto.Password.Trim());
                    if (!checkPass)
                    {
                        return null;
                    }
                    _generatedToken = _tokenService.BuildToken(userDto, _config["JWT:Issuer"].ToString());
                    token.token = _generatedToken;
                    token.PublicKey=_tokenService.ReadKeyToken(userDto.UserID,Constant.Constant.PUBLICKEY).ToString();
                    //DataTable dt = new DataTable();
                    //dt = await uow.ExecuteDataTable("[YYY_sp_LoadDashboard]", CommandType.StoredProcedure,
                    //    "@UserID", SqlDbType.NVarChar, "00001"
                    //);
                    //var res = _mapper.Map<CFaUserDTO>(object);
                    uow.Commit();
                    return token;
                }
            }
            catch (Exception ex)
            {
                _fileLogger.Error(ex.Message);

            }
            return null;
        }

        /// <summary>
        /// LoginUserAsync
        /// </summary>
        /// <param name="pUserLoginInf"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        //public async Task<string> LoginGoolgeAsync(CFaUserInfoDTO pUserLoginInf)
        public CFaTokenLoginDTO LoginGoolgeAsync()
        {
            try
            {
                CFaTokenLoginDTO TokenLogin = new CFaTokenLoginDTO();
                StringBuilder sbUri = new StringBuilder(Constant.Constant.OauthUri);
                sbUri.Append("client_id=" + Constant.Constant.ClientId);
                sbUri.Append("&redirect_uri=" + Constant.Constant.RedirectUri);
                sbUri.Append("&response_type=" + "code");
                sbUri.Append("&scope=" + Constant.Constant.Scopes);
                sbUri.Append("&access_type=" + "offline");
                //sbUri.AppendLine("&Access-Control-Allow-Headers=" + "*");
                //sbUri.Append("&Access-Control-Allow-Origin=" + "*");
                //sbUri.Append("&state=" + extraParam);
                sbUri.Append("&state=" + "");
                sbUri.Append("&approval_prompt=" + "force");
                TokenLogin.Url = sbUri.ToString();
                return TokenLogin;
            }
            catch (Exception ex)
            {
                _fileLogger.Error(ex.Message);

            }
            return null;
        }

        /// <summary>
        /// GetTokenByCode
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public async Task<CFaGoogleTokenDTO> GetTokenByCode(string code)
        {
            CFaGoogleTokenDTO token = null;
            var postData = new
            {
                code = code,
                client_id = Constant.Constant.ClientId,
                client_secret = Constant.Constant.ClientSecret,
                redirect_uri = Constant.Constant.RedirectUri,
                grant_type = "authorization_code"
            };

            using (var httpClient = new HttpClient())
            {
                StringContent content = new StringContent(JsonConvert.SerializeObject(postData), Encoding.UTF8, "application/json");

                using (var response = await httpClient.PostAsync(Constant.Constant.TokenUri, content))
                {
                    if (response.StatusCode == System.Net.HttpStatusCode.OK)
                    {
                        string responseString = await response.Content.ReadAsStringAsync();
                        token = JsonConvert.DeserializeObject<CFaGoogleTokenDTO>(responseString);
                    }
                }
            }

            return token;
        }
        #endregion
        /// <summary>
        /// verifyPass
        /// </summary>
        /// <param name="currPass"></param>
        /// <param name="pass"></param>
        /// <returns></returns>
        public bool verifyPass(string currPass, string pass)
        {
            if (!currPass.Equals(pass))
            {
                return false;
            }
            return true;
        }
        /// <summary>
        /// ValidateToken
        /// </summary>
        /// <param name="token"></param>
        public async Task<string> ValidateToken(string token, string userId, string publicKey)
        {
            try
            {
                UserDTO userDto = new UserDTO();
                using (var uow = await _context.CreateAsync())
                {
                    if (_tokenService.IsTokenValid(token, _config["JWT:Issuer"].ToString(), publicKey))
                    {
                        // refersh token
                        var CheckUser = await uow.ExecuteDataTable("[YYY_sp_CheckLoginUser]", CommandType.StoredProcedure,
                            "@UserID", SqlDbType.NVarChar, userId.Trim()
                        );
                        foreach (DataRow row in CheckUser.Rows)
                        {
                            userDto.UserName = row["UserName"].ToString();
                            userDto.Password = row["Password"].ToString();
                            userDto.IP = "123.123.123";
                            userDto.Role = row["Role"].ToString();
                        }
                        _generatedToken = _tokenService.BuildToken(userDto, _config["JWT:Issuer"].ToString());
                    }
                    #region validate token google,FaceBook
                    //-----------------------google---------------------------------------
                    var postData = new
                    {
                        code = token,// refesh_token in google
                        client_id = Constant.Constant.ClientId,
                        client_secret = Constant.Constant.ClientSecret,
                        redirect_uri = Constant.Constant.RedirectUri,
                        grant_type = "refresh_token"
                    };
                    using (var httpClient = new HttpClient())
                    {
                        StringContent content = new StringContent(JsonConvert.SerializeObject(postData), Encoding.UTF8, "application/json");

                        using (var response = await httpClient.PostAsync(Constant.Constant.TokenUri, content))
                        {
                            if (response.StatusCode == System.Net.HttpStatusCode.OK)
                            {
                                string responseString = await response.Content.ReadAsStringAsync();
                                _generatedToken = JsonConvert.DeserializeObject<CFaGoogleTokenDTO>(responseString).ToString();
                            }
                        }
                    }

                    //-----------------------FaceBook---------------------------------------
                    #endregion

                    uow.Commit();
                    return _generatedToken;
                };
            }
            catch (Exception ex)
            {
                _fileLogger.Error(ex.Message);
            }
            return null;
        }

        /// <summary>
        /// RegisUser
        /// </summary>
        /// <param name="objUser"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<bool> RegisUser(CFaUserLoginDTO objUser)
        {
            try
            {
                using (var uow = await _context.CreateAsync())
                {
                    UserDTO userDto = new UserDTO();
                    // refersh token
                    var regisUser = await uow.ExecuteDataTable("[YYY_sp_InsertUser]", CommandType.StoredProcedure,
                        "@UserID", SqlDbType.NVarChar, objUser.UserID
                        , "@UserName", SqlDbType.NVarChar, objUser.UserName
                        , "@Password", SqlDbType.NVarChar, objUser.Password
                        , "@Image", SqlDbType.NVarChar, objUser.Image
                        , "@PassReissueKey", SqlDbType.NVarChar, objUser.PassReissueKey
                        , "@Email", SqlDbType.NVarChar, objUser.Email
                        , "@Role", SqlDbType.NVarChar, objUser.Role
                    );
                    if (!File.Exists(_PathImg))
                    {
                        File.Copy(objUser.Image, _PathImg);
                    }
                    else
                    {
                        uow.Rollback();
                        return false;
                    }
                    if (regisUser.Rows.Count == 0)
                    {
                        uow.Rollback();
                        return false;
                    }
                    uow.Commit();
                    return true;
                };
            }
            catch (Exception ex)
            {
                _fileLogger.Error(ex.Message);
            }
            return false;
        }

        /// <summary>
        /// RestPassWord
        /// </summary>
        /// <param name="emailUser"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public bool RestPassWord(string email, int numVerify)
        {
            try
            {
                Random rnd = new Random();
                _NumBerOTP = rnd.Next(1, 10000);
                string subject, body = string.Empty;
                if (numVerify == _NumBerOTP)
                {
                    subject = "Mật khẩu mới của bạn là: 11111";
                    body = "Xác thực thành công mật khẩu mới của bạn ";
                }
                else return false;

            }
            catch (Exception ex)
            {
                _fileLogger.Error(ex.Message);
                return false;
            }
            return false;
        }
        /// <summary>
        /// SendMail
        /// </summary>
        /// <returns></returns>
        public bool SendMail(string email, string subject, string body)
        {
            try
            {
                var emailData = new MimeMessage();
                emailData.From.Add(MailboxAddress.Parse(_config["EmailSettings:EmailId"].ToString()));
                emailData.To.Add(MailboxAddress.Parse(email.Trim()));
                emailData.Subject = subject;
                emailData.Body = new TextPart(TextFormat.Plain) { Text = body };

                // send email
                var smtp = new SmtpClient();
                smtp.Connect(_config["EmailSettings:Host"].ToString(), Convert.ToInt32(_config["EmailSettings:Port"]), SecureSocketOptions.StartTls);
                smtp.Authenticate(_config["EmailSettings:EmailId"].ToString(), _config["EmailSettings:Password"].ToString());
                smtp.Send(emailData);
                smtp.Disconnect(true);
                return true;
            }
            catch (Exception ex)
            {
                _fileLogger.Error(ex.Message);
                return false;
            }
            return false;
        }

        /// <summary>
        /// ReqOTPPassWord
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public string ReqOTPPassWord(string email)
        {
            try
            {
                Random rnd = new Random();
                _NumBerOTP = rnd.Next(1, 10000);
                string subject, body = string.Empty;
                subject = "Mã xác thực của bạn là:";
                body = "Mã xác thực ";
                SendMail(email, subject, body);
                return _NumBerOTP.ToString();
            }
            catch (Exception ex)
            {
                _fileLogger.Error(ex.Message);
                return null;
            }
        }
    }
}
