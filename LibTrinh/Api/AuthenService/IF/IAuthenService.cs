using LibTrinh.Common;
using LibTrinh.Models;

namespace LibTrinh
{
    /// <summary>
    /// IAuthenService
    /// </summary>
    public interface IAuthenService : IBusinessService
    {

        /// <summary>
        /// LoginAsync
        /// </summary>
        /// <param name="pUserLoginInf"></param>
        /// <returns></returns>
        Task<CFaTokenLoginDTO> LoginAsync(CFaUserInfoDTO pUserLoginInf);

        /// <summary>
        /// LoginGoolgeAsync
        /// </summary>
        /// <param name="pUserLoginInf"></param>
        /// <returns></returns>
        //Task<string> LoginGoolgeAsync(CFaUserInfoDTO pUserLoginInf);
        CFaTokenLoginDTO LoginGoolgeAsync();
        /// <summary>
        /// GetTokenByCode
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        Task<CFaGoogleTokenDTO> GetTokenByCode(string code);
        /// <summary>
        /// LoginUserAsync
        /// </summary>
        /// <param name="pUserLoginInf"></param>
        /// <returns></returns>
        Task<CFaTokenLoginDTO> LoginUserAsync(CFaUserInfoDTO pUserLoginInf);

        /// <summary>
        /// ValidateToken
        /// </summary>
        /// <param name="token"></param>
        /// <param name="userId"></param>
        /// <param name="publicKey"></param>
        Task<string> ValidateToken(string token, string userId,string publicKey);
        /// <summary>
        /// RegisUser
        /// </summary>
        /// <param name="objUser"></param>
        /// <returns></returns>
        Task<bool> RegisUser(CFaUserLoginDTO objUser);

        /// <summary>
        /// RestPassWord
        /// </summary>
        /// <param name="emailUser"></param>
        /// <param name="numVerify"></param>
        /// <returns></returns>
        bool RestPassWord(string emailUser,int numVerify);

        /// <summary>
        /// ReqOTPPassWord
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        string ReqOTPPassWord(string email);
    }
}
