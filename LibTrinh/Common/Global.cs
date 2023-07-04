using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Reflection;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text.Encodings.Web;
using Microsoft.Extensions.Logging;

namespace LibTrinh.Common
{
    /// <summary>
    /// GlobalBase
    /// </summary>
    public class GlobalBase
    {
        #region Global custrustor
        public class Global
        {
            #region // Root
            public static string ROOTCODE;
            #endregion

            #region // Option
            public static int sys_DB_ID;
            public static string sys_DB_SOURCE;
            public static string sys_DB_Name;
            public static string sys_DB_User;
            public static string sys_DB_Pass;
            public static int sys_DB_AllowPermission;
            public static string sys_Session_Client;
            #endregion
            public static async Task System_Start(string keycode, IConfiguration _config)
            {
                sys_Session_Client = _config.GetValue<string>("DATA:NAME").ToString();
                ROOTCODE = _config.GetValue<string>("DATA:ROOTCODE").ToString();
                sys_DB_SOURCE = "HCM-PC-034\\MSSQLSERVER01";
                // Global.sys_DB_SOURCE = "DESKTOP-TD50OL3";
                //Global.sys_DB_SOURCE = Encrypt.DecryptString(_config.GetValue<string>("DBStringConn:RSOURCE").ToString(), Global.ROOTCODE);
                sys_DB_Name = Encrypt.DecryptString(_config.GetValue<string>("DBStringConn:RNAME").ToString(), ROOTCODE);
                sys_DB_User = Encrypt.DecryptString(_config.GetValue<string>("DBStringConn:RUSER").ToString(), ROOTCODE);
                sys_DB_Pass = Encrypt.DecryptString(_config.GetValue<string>("DBStringConn:RPASSWORD").ToString(),ROOTCODE);
                //var task_startclient = client.StartClient(keycode);
            }
        }
        #endregion

        #region
        public static List<T> ConvertDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }
        public static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                        pro.SetValue(obj, dr[column.ColumnName], null);
                    else
                        continue;
                }
            }
            return obj;
        }
        #endregion
        #region request author rsa
        public class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
        {
            private IConfiguration _config;
            public BasicAuthenticationHandler(IOptionsMonitor<AuthenticationSchemeOptions> options, ILoggerFactory logger
                , UrlEncoder encoder, ISystemClock clock, IConfiguration config) : base(options, logger, encoder, clock)
            {
                _config = config;
            }

            protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
            {
                if (!string.IsNullOrEmpty(Request.Headers?["Authorization"].ToString()))
                {
                    var authHeader = Request.Headers?["Authorization"].ToString();
                    string userID = Request.Cookies["X-UserID"].ToString();
                    if (string.IsNullOrEmpty(authHeader))
                    {
                        return AuthenticateResult.Fail("Invalid Authorization Header");
                    }

                    if (!authHeader.StartsWith("Bearer", StringComparison.OrdinalIgnoreCase))
                    {
                        return AuthenticateResult.Fail("Invalid Authorization Header");
                    }
                    if (userID is null)
                    {
                        Response.StatusCode = 401;
                        return AuthenticateResult.Fail("Invalid Authorization Cookies");
                    }
                    var token = authHeader.Substring("Bearer".Length).Trim();

                    var jwtToken = new JwtSecurityToken(token);
                    //if (jwtToken.ValidTo > DateTime.UtcNow)
                    //{
                    //    return AuthenticateResult.Fail("Token Time Out");
                    //};
                    var rsaSecurityKey = new RsaSecurityKey(ReadKeyToken(userID, "PUBLICKEY"));
                    var tokenHandler = new JwtSecurityTokenHandler();
                    ClaimsPrincipal principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                    {
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuer = true,
                        ValidIssuer = _config["Jwt:Issuer"],
                        ValidAudience = _config["Jwt:Issuer"],
                        IssuerSigningKey = rsaSecurityKey,
                    }, out SecurityToken validatedToken);
                    return AuthenticateResult.Success(new AuthenticationTicket(new ClaimsPrincipal(principal.Identity), "Authorization"));
                }
                else
                {
                    var claims = new List<Claim> { new Claim("user", "o2o") };
                    return AuthenticateResult.Success(new AuthenticationTicket(new ClaimsPrincipal(new ClaimsIdentity(claims)), "Authorization"));
                }

            }
            private RSA ReadKeyToken(string userID, string nameKey)
            {
                var rsa = RSA.Create();
                rsa.FromXmlString(System.IO.File.ReadAllText(Path.Combine("C:\\New folder\\SimpleWebApps\\src\\JwtAuthentication\\TokenGeneratorWebApi", "Token") + "\\" + userID.Trim() + "_" + nameKey.Trim()).ToString());
                return rsa;
            }
        }
        #endregion
    }
}
