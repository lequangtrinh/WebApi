using LibTrinh.Common;
using LibTrinh.Models;

namespace LibTrinh.Api
{
    /// <summary>
    /// IPriceServices
    /// </summary>
    public interface IPriceServices : IBusinessService
    {
        /// <summary>
        /// LoadPriceServices
        /// </summary>
        /// <param name="Pagination"></param>
        /// <returns></returns>
        Task<string> LoadPriceServices(CFaSearchPriceServicesDTO searchPrice);
    }
}
