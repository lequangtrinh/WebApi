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
        private string _pathConsKey = string.Empty;
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
                var rsaSecurityKey = new RsaSecurityKey(ReadKeyToken(user.UserID, Constant.Constant.PRIVATEKEY));
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
        public bool IsTokenValid(string token, string publicKey, string issuer)
        {
            var jwtToken = new JwtSecurityToken(token);
            //return (jwtToken.ValidTo < DateTime.UtcNow);
            // return (jwtToken.ValidFrom > DateTime.UtcNow) || (jwtToken.ValidTo < DateTime.UtcNow);
            #region rsa validtoken
            if (jwtToken.ValidTo < DateTime.UtcNow)
            {
                var rsa = new RSACryptoServiceProvider();
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
                        IssuerSigningKey = new RsaSecurityKey(rsa),
                    }, out SecurityToken validatedToken);
                    return true;
                }
                catch (Exception ex)
                {
                    return false;
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
                var path=Path.Combine(AppDomain.CurrentDomain.BaseDirectory.Replace("bin\\Debug\\net6.0\\", "") + Constant.Constant.ForderToken);
                _pathConsKey = Path.Combine(path, userID);
                if (!Directory.Exists(path)) Directory.CreateDirectory(path);
                if (!Directory.Exists(_pathConsKey)) Directory.CreateDirectory(_pathConsKey);
                var rsa = RSA.Create();
                string privateKeyXml = rsa.ToXmlString(true);
                string publicKeyXml = rsa.ToXmlString(false);
                using var privateFile = File.Create(_pathConsKey + "\\"+ userID + "_" + Constant.Constant.PRIVATEKEY);
                using var publicFile = File.Create(_pathConsKey + "\\" + userID + "_" + Constant.Constant.PUBLICKEY);
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

        #region read Key token
        /// <summary>
        /// ReadKeyToken
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="nameKey"></param>
        /// <returns></returns>
        public RSA ReadKeyToken(string userID, string nameKey)
        {
            var rsa = RSA.Create();
            rsa.FromXmlString(System.IO.File.ReadAllText(_pathConsKey + "\\"+userID.Trim() + "_" + nameKey.Trim()).ToString());
            return rsa;
        } 
        #endregion
    }
}
