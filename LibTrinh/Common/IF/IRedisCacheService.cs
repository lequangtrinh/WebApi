using LibTrinh.Common;

namespace LibTrinh
{
    /// <summary>
    /// IRedisCacheService
    /// </summary>
    public interface IRedisCacheService: IBusinessService
    {
        /// <summary>
        /// GET DATA REDIS CACHE
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <returns></returns>
        Task<T> Get<T>(string key);

        /// <summary>
        /// Set DATA REDIS CACHE
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        Task<T> Set<T>(string key, T value);

        /// <summary>
        /// Remove DATA REDIS CACHE
        /// </summary>
        /// <typeparam name="bool"></typeparam>
        /// <param name="key"></param>
        /// <returns></returns>
        Task<bool> Remove<T>(string key);
    }
}
