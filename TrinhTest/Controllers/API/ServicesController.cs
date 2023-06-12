using LibTrinh;
using LibTrinh.Api;
using LibTrinh.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace TrinhTest.Controllers.API
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ServicesController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IPriceServices _IPriceServices;
        private readonly IRedisCacheService _IRedisCache;

        /// <summary>
        /// Custrustor
        /// </summary>
        public ServicesController(IConfiguration config, IPriceServices PriceServices, IRedisCacheService IRedisCache)
        {
            _config = config;
            _IPriceServices = PriceServices;
            _IRedisCache = IRedisCache;

        }
        [Route("LoadPriceServices")]
        [HttpPost]
        public async Task<IActionResult> LoadPriceServices(CFaSearchPriceServicesDTO searchPrice)
        {
            var res = await _IPriceServices.LoadPriceServices(searchPrice);
            return Ok(res);
        }
    }
}
