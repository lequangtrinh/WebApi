using LibTrinh.Common;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace LibTrinh
{
    /// <summary>
    /// RedisCacheService
    /// </summary>
    public class RedisCacheService: IRedisCacheService, IBusinessService
    {
        private readonly IDistributedCache _cache;

        public RedisCacheService(IDistributedCache cache)
        {
            _cache = cache;
        }
        /// <summary>
        /// GET DATA CACHE REDIS
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <returns></returns>
        public async Task<T> Get<T>(string key)
        {
            var value = await _cache.GetStringAsync(key).ConfigureAwait(false);

            if (value != null)
            {
                return JsonSerializer.Deserialize<T>(value);
            }

            return default;
        }

        /// <summary>
        /// Set DATA CACHE REDIS
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<T> Set<T>(string key, T value)
        {
            var timeOut = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(24),
                SlidingExpiration = TimeSpan.FromMinutes(60)
            };

            await _cache.SetStringAsync(key, JsonSerializer.Serialize(value), timeOut);

            return value;
        }
    }
}
