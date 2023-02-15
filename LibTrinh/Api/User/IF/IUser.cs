using LibTrinh.Common;

namespace LibTrinh.Api
{
    /// <summary>
    /// ILoadUser
    /// </summary>
    public interface IUser : IBusinessService
    {
        /// <summary>
        /// ILoadUser
        /// </summary>
        /// <returns></returns>
        Task<string> LoadUser();
    }
}
