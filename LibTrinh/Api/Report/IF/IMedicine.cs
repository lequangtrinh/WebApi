using LibTrinh.Common;

namespace LibTrinh.Api
{
    /// <summary>
    /// IMedicine
    /// </summary>
    public interface IMedicine : IBusinessService
    {
        /// <summary>
        /// LoadMedicineReport
        /// </summary>
        /// <returns></returns>
        Task<string> LoadMedicineReport();
    }
}
