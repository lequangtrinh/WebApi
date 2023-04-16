using LibTrinh;
using LibTrinh.Api;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TrinhTest.Controllers.API
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class PriceServicesController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IPriceServices _IPriceServices;
        private readonly IRedisCacheService _IRedisCache;

        /// <summary>
        /// Custrustor
        /// </summary>
        public PriceServicesController(IConfiguration config, IPriceServices PriceServices, IRedisCacheService IRedisCache)
        {
            _config = config;
            _IPriceServices = PriceServices;
            _IRedisCache = IRedisCache;

        }
        [Route("LoadPriceServices")]
        [HttpPost]
        public async Task<IActionResult> LoadPriceServices()
        {
            var res = await _IPriceServices.LoadPriceServices();
            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(res));
        }
    }
}
