using LibTrinh.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace LibTrinh.Common
{
    /// <summary>
    /// TokenService
    /// </summary>
    public class TokenService : ITokenService
    {
        #region #BuildToken
        /// <summary>
        /// BuildToken
        /// </summary>
        /// <param name="key"></param>
        /// <param name="issuer"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public string BuildToken(string key, string issuer, UserDTO user)
        {
            var claims = new[] {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.Role, user.Role),
                new Claim(ClaimTypes.NameIdentifier, Guid.NewGuid().ToString())
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new JwtSecurityToken(issuer, issuer, claims,
                expires: DateTime.Now.AddMinutes(Constant.Constant.Token_Required_Time), signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
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
        public bool IsTokenValid(string token)
        {
            var jwtToken = new JwtSecurityToken(token);
           // return (jwtToken.ValidFrom > DateTime.UtcNow) || (jwtToken.ValidTo < DateTime.UtcNow);
            return (jwtToken.ValidTo < DateTime.UtcNow);
            //var mySecret = Encoding.UTF8.GetBytes(key);
            //var mySecurityKey = new SymmetricSecurityKey(mySecret);

            //var tokenHandler = new JwtSecurityTokenHandler();
            //try
            //{
            //    tokenHandler.ValidateToken(token, new TokenValidationParameters
            //    {
            //        ValidateIssuerSigningKey = true,
            //        ValidateIssuer = true,
            //        ValidateAudience = true,
            //        ValidIssuer = issuer,
            //        ValidAudience = issuer,
            //        IssuerSigningKey = mySecurityKey,
            //    }, out SecurityToken validatedToken);

            //}
            //catch
            //{
            //    return false;
            //}
            //return true;
        }
        #endregion
    }
}
