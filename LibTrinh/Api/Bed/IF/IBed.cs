using LibTrinh.Common;

namespace LibTrinh.Api
{
    /// <summary>
    /// IBed
    /// </summary>
    public interface IBed : IBusinessService
    {
        /// <summary>
        /// LoadComboboxRoom
        /// </summary>
        /// <returns></returns>
        Task<string> LoadComboboxRoom();

        /// <summary>
        /// LoadBed
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<string> LoadBed(int id);

        /// <summary>
        /// LoadBedAlotment
        /// </summary>
        /// <returns></returns>
        Task<string> LoadBedAlotment();

    }
}
