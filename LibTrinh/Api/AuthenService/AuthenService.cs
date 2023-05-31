using AutoMapper;
using Microsoft.Extensions.Configuration;
using LibTrinh.Models;
using Microsoft.AspNetCore.Http;
using System.Data;
using Newtonsoft.Json;
using System.Text;
using LibTrinh.Common;
using System.Net.Mail;
using System.Net;

namespace LibTrinh.Api.AuthenService
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
        private readonly IRedisCacheService _RedisCacheService;

        //protected JwtService _jwtService;
        public AuthenService(IConfiguration pConfiguration, IBaseDbContext pContext
                            , IMapper pMapper, IHttpContextAccessor pHttpContext
                            , ITokenService tokenService, IRedisCacheService RedisCacheService) : base(pContext, pMapper, pHttpContext)
        {
            _config = pConfiguration;
            _tokenService = tokenService;
            _RedisCacheService = RedisCacheService;
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
                CFaTokenLoginDTO token = new CFaTokenLoginDTO();
                CFaUserDTO cFaUserDTO = new CFaUserDTO();
                using (var uow = await _context.CreateAsync())
                {
                    string strPwd = Encrypt.EncryptString(pUserLoginInf.PassWord, _config["DATA:ROOTCODE"].ToString());
                    var CheckUser = await uow.ExecuteDataTable("[YYY_sp_CheckLoginUser]", CommandType.StoredProcedure,
                        "@UserID", SqlDbType.NVarChar, pUserLoginInf.userID
                    );
                    var dataUser = GlobalBase.ConvertDataTable<UserDTO>(CheckUser)[0];
                    bool checkPass = verifyPass(strPwd, dataUser.Password.Trim());
                    if (!checkPass)
                    {
                        return null;
                    }
                    _generatedToken = _tokenService.BuildToken(dataUser, _config["JWT:Issuer"].ToString());
                    token.token = _generatedToken;
                    token.PublicKey=_tokenService.ReadKeyToken(dataUser.UserID,Constant.Constant.PUBLICKEY).ToString();
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
                using (var uow = await _context.CreateAsync())
                {
                    if (!_tokenService.IsTokenValid(token, userId, _config["JWT:Issuer"].ToString()))
                    {
                        // refersh token
                        var CheckUser = await uow.ExecuteDataTable("[YYY_sp_CheckLoginUser]", CommandType.StoredProcedure,
                            "@UserID", SqlDbType.NVarChar, userId.Trim()
                        );
                        var dataUser = GlobalBase.ConvertDataTable<UserDTO>(CheckUser)[0];
               
                        _generatedToken = _tokenService.BuildToken(dataUser, _config["JWT:Issuer"].ToString());
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
                    subject = "Mật khẩu mới của bạn";
                    body = body = string.Format(@"<H1>Hey Alice,<H1>
                        <p>Cảm ơn bạn đã sử dụng hệ thống O2O
                        Saturday and I was hoping you could make it.<br>
                        <p>Mật khẩu mới của bạn la :11111<br>
                        <p>-- Joey<br>
                        <center><img src=""cid:{C:\New folder\WebApi\TrinhTest\wwwroot\Assets\img\doctor.jpg}""></center><br>
                        <p>----------------------------------------------------------------------"); ;
                    SendMail(email, subject, body);
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

                //var emailData = new MimeMessage();
                //emailData.From.Add(MailboxAddress.Parse(_config["EmailSettings:EmailId"].ToString()));
                //emailData.To.Add(MailboxAddress.Parse(email.Trim()));
                //emailData.Subject = subject;
                //emailData.Body = new TextPart("html") { Text = body };
                var mailMessage = new MailMessage
                {
                    From = new MailAddress(_config["EmailSettings:EmailId"].ToString()),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true,
                };
                mailMessage.To.Add(email);
                // send email
                var smtpClient = new SmtpClient(_config["EmailSettings:Host"].ToString())
                {
                    Port = 587,
                    UseDefaultCredentials = false,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    Credentials = new NetworkCredential(_config["EmailSettings:EmailId"].ToString()
                                                        ,_config["EmailSettings:Password"].ToString()),
                    EnableSsl = true,
            };
                smtpClient.Send(mailMessage);
                return true;
            }
            catch (Exception ex)
            {
                _fileLogger.Error(ex.Message);
                return false;
            }
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
                subject = "Mã xác thực của bạn";
                body = "<H1>Hey Alice,<H1><p>Cảm ơn bạn đã sử dụng hệ thống O2O.<br>"
                        +"<p>Mã OTP Của bạn là :"+ _NumBerOTP + "<br>"
                        +"<p>Joey<br>"
                        +"<center><span>trinh test mail</span></center>";
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
