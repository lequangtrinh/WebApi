using LibTrinh.Models;

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
        string BuildToken(string key, string issuer, UserDTO user);


        /// <summary>
        /// IsTokenValid
        /// </summary>
        /// <param name="key"></param>
        /// <param name="issuer"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        //bool IsTokenValid(string key, string issuer, string token);
        bool IsTokenValid(string token);
    }
}
