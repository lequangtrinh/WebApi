using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using LibTrinh;
using LibTrinh.Api;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace TrinhTest.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class BedController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IBed _IBed;
        private readonly IRedisCacheService _IRedisCache;
        /// <summary>
        /// Custrustor
        /// </summary>
        /// <param name="config"></param>
        /// <param name="tokenService"></param>
        public BedController(IConfiguration config, IBed bed, IRedisCacheService IRedisCache)
        {
            _config = config;
            _IBed =bed;
            _IRedisCache = IRedisCache;

        }
        [Route("LoadComboboxRoom")]
        [HttpPost]
        public async Task<IActionResult> LoadComboboxRoom()
        {
            var res = await _IBed.LoadComboboxRoom();
            //_IRedisCache.Set<object>(objUser.userID+"_"+DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss"), res.ToString());
            return Ok(res);
        }
        [Route("LoadBed")]
        [HttpPost]
        public async Task<IActionResult> LoadBed(int Id)
        {
            var res = await _IBed.LoadBed(Id);
            //_IRedisCache.Set<object>(objUser.userID+"_"+DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss"), res.ToString());
            return Ok(res);
        }
        [Route("LoadBedAlotment")]
        [HttpPost]
        public async Task<IActionResult> LoadBedAlotment()
        {
            var res = await _IBed.LoadBedAlotment();
            //_IRedisCache.Set<object>(objUser.userID+"_"+DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss"), res.ToString());
            return Ok(res);
        }
    }
}
