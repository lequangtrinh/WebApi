using LibTrinh.Common;
using Microsoft.Extensions.Caching.Distributed;
using StackExchange.Redis;
using System.Text.Json;

namespace LibTrinh
{
    /// <summary>
    /// RedisCacheService
    /// </summary>
    public class RedisCacheService: IRedisCacheService, IBusinessService
    {
        private readonly IDistributedCache _cache;
        //private readonly IConnectionMultiplexer _redis;

        //public RedisCacheService(IDistributedCache cache, IConnectionMultiplexer redis)
        //{
        //    _cache = cache;
        //    _redis = redis;
        //}
        /// <summary>
        /// RedisCacheService
        /// </summary>
        /// <param name="cache"></param>
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

            await _cache.SetStringAsync(key, JsonSerializer.Serialize(value), timeOut).ConfigureAwait(false);
            return value;
        }

        /// <summary>
        /// Remove DATA CACHE REDIS
        /// </summary>
        /// <typeparam name="bool"></typeparam>
        /// <param name="key"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public async Task<bool> Remove<T>(string key)
        {
            var value = await _cache.GetStringAsync(key).ConfigureAwait(false);
            
            if (value != null)
            {
                await _cache.RemoveAsync(key).ConfigureAwait(false);
                return true;
            }
            return false;
        }
        #region get set cache IConnectionMultiplexer
        ///// <summary>
        ///// GET DATA CACHE REDIS Token hash
        ///// </summary>
        ///// <typeparam name="T"></typeparam>
        ///// <param name="key"></param>
        ///// <returns></returns>
        //public string GetHash<T>(string keyName,string id)
        //{
        //    var db = _redis.GetDatabase();
        //    var value =  db.HashGet(keyName, id);
        //    return value;
            
        //}

        ///// <summary>
        ///// set DATA CACHE REDIS Token hash
        ///// </summary>
        ///// <typeparam name="T"></typeparam>
        ///// <param name="key"></param>
        ///// <returns></returns>
        //public void SetHash<T>(string keyName, string id,string token)
        //{
            
        //    var db = _redis.GetDatabase();
        //    db.HashSet(keyName, new HashEntry[] { new HashEntry(id, token)});

        //}
        #endregion
    }
}
