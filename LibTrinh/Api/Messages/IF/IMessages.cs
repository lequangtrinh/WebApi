using LibTrinh.Common;
using LibTrinh.Models;

namespace LibTrinh.Api
{
    /// <summary>
    /// IMessages
    /// </summary>
    public interface IMessages: IBusinessService
    {
        /// <summary>
        /// LoadFriendMessages
        /// </summary>
        /// <param name="UserID"></param>
        /// <returns></returns>
        Task<string> LoadFriendMessages(string UserID);
        /// <summary>
        /// LoadDataMessages
        /// </summary>
        /// <param name="UserID"></param>
        /// <param name="UserIDTo"></param>
        /// <returns></returns>
        Task<string> LoadDataMessages(string UserID,string UserIDTo);

        /// <summary>
        /// RegisDataMessagesUser
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        Task<bool> RegisDataMessagesUser(CFaRegisMessagesUserDTO data);
    }
}
