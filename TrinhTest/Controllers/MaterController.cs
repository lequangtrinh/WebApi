using LibTrinh;
using LibTrinh.Api;
using Microsoft.AspNetCore.Mvc;

namespace TrinhTest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MaterController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IDashBoard _iDashBoard;
        private readonly IRedisCacheService _IRedisCache;
        /// <summary>
        /// Custrustor
        /// </summary>
        /// <param name="config"></param>
        /// <param name="tokenService"></param>
        public MaterController(IConfiguration config, IDashBoard DashBoard, IRedisCacheService IRedisCache)
        {
            _config = config;
            _iDashBoard = DashBoard;
            _IRedisCache = IRedisCache;
        }

        [Route("LoadDataHeardDashBoard")]
        [HttpPost]
        public async Task<IActionResult> LoadDataHeardDashBoard()
        {
            var res = await _iDashBoard.LoadDataHeardDashBoard();
            return Ok(res);
        }
    }
}
