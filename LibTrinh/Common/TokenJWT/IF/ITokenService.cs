using LibTrinh.Models;
using System.Security.Cryptography;

namespace LibTrinh.Common
{
    /// <summary>
    /// ITokenService
    /// </summary>
    public interface ITokenService
    {
        /// <summary>
        /// BuildToken
        /// </summary>
        /// <param name="key"></param>
        /// <param name="issuer"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        string BuildToken(UserDTO user, string issuer);


        /// <summary>
        /// IsTokenValid
        /// </summary>
        /// <param name="key"></param>
        /// <param name="issuer"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        //bool IsTokenValid(string key, string issuer, string token);
        bool IsTokenValid(string token,string publicKey, string issuer);
        /// <summary>
        /// ReadKeyToken
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="nameKey"></param>
        /// <returns></returns>
        RSA ReadKeyToken(string userID, string nameKey);
    }
}
