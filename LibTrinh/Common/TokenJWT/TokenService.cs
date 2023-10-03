using LibTrinh.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace LibTrinh.Common
{
    /// <summary>
    /// TokenService
    /// </summary>
    public class TokenService : ITokenService
    {
        private string _pathConsKey =  Path.Combine(AppDomain.CurrentDomain.BaseDirectory.Replace("bin\\Debug\\net6.0\\", "") + Constant.Constant.ForderToken);
        #region #BuildToken
        /// <summary>
        /// BuildToken
        /// </summary>
        /// <param name="key"></param>
        /// <param name="issuer"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public string BuildToken(UserDTO user,string issuer)
        {
            #region rsa token 
            if (CreateForderKeyToken(user.UserID))
            {
                var claims = new[] {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.NameIdentifier, Guid.NewGuid().ToString())
            };
                var rsaSecurityKey = new RsaSecurityKey(GlobalBase.ReadKeyToken(user.UserID, Constant.Constant.PrivateKey));
                rsaSecurityKey.KeyId = user.UserName;
                
                var credentials = new SigningCredentials(rsaSecurityKey, SecurityAlgorithms.RsaSha256);
                var tokenDescriptor = new JwtSecurityToken(issuer
                                                           ,issuer
                                                           ,claims
                                                           ,expires: DateTime.Now.AddMinutes(Constant.Constant.Token_Required_Time)
                                                           ,signingCredentials: credentials);
                return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
            }
            return null;
            #endregion

        }
        #endregion

        #region IsTokenValid
        /// <summary>
        /// IsTokenValid
        /// </summary>
        /// <param name="key"></param>
        /// <param name="issuer"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public bool IsTokenValid(string token, string UserID, string issuer)
        {
            var jwtToken = new JwtSecurityToken(token);
            #region rsa validtoken
            if (jwtToken.Header.Alg.Equals("RS256"))
            {
                if (jwtToken.ValidTo > DateTime.UtcNow)
                {
                    var rsaSecurityKey = new RsaSecurityKey(GlobalBase.ReadKeyToken(UserID, Constant.Constant.PublicKey));
                    var tokenHandler = new JwtSecurityTokenHandler();
                    try
                    {
                        tokenHandler.ValidateToken(token, new TokenValidationParameters
                        {
                            ValidateAudience = true,
                            ValidateLifetime = true,
                            ValidateIssuer = true,
                            ValidIssuer = issuer,
                            ValidAudience = issuer,
                            IssuerSigningKey = rsaSecurityKey,
                        }, out SecurityToken validatedToken);
                        return true;
                    }
                    catch (Exception ex)
                    {
                        return false;
                    }
                }
            }
            return false;
            #endregion
        }
        #endregion

        #region setup forder key token
        /// <summary>
        /// CreateForderKeyToken
        /// </summary>
        /// <param name="userID"></param>
        /// <returns></returns>
        private bool CreateForderKeyToken(string userID)
        {
            try
            {
                var path= _pathConsKey;
                path = Path.Combine(_pathConsKey, userID);
                if (!Directory.Exists(_pathConsKey)) Directory.CreateDirectory(_pathConsKey);
                if (!Directory.Exists(path)) Directory.CreateDirectory(path);
                var rsa = RSA.Create();
                string privateKeyXml = rsa.ToXmlString(true);
                string publicKeyXml = rsa.ToXmlString(false);
                using var privateFile = File.Create(path + "\\"+ userID + "_" + Constant.Constant.PrivateKey);
                using var publicFile = File.Create(path + "\\" + userID + "_" + Constant.Constant.PublicKey);
                privateFile.Write(Encoding.UTF8.GetBytes(privateKeyXml));
                publicFile.Write(Encoding.UTF8.GetBytes(publicKeyXml));
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
        #endregion
    }
}
