
using LibTrinh.Common;

namespace LibTrinh.Api
{
    /// <summary>
    /// IDashBoard
    /// </summary>
    public interface IDashBoard : IBusinessService
    {
        /// <summary>
        /// LoadDataHeardDashBoard
        /// </summary>
        Task<string> LoadDataHeardDashBoard();
        /// <summary>
        /// LoadDataMenu
        /// </summary>
        /// <returns></returns>
        Task<string> LoadDataMenu();
    }
}
