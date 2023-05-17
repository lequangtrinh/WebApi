using LibTrinh;
using LibTrinh.Api;
using Microsoft.AspNetCore.Mvc;

namespace TrinhTest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IMedicine _iMedicine;
        private readonly IRedisCacheService _IRedisCache;
        /// <summary>
        /// Custrustor
        /// </summary>
        /// <param name="config"></param>
        /// <param name="tokenService"></param>
        public ReportController(IConfiguration config, IMedicine Medicine, IRedisCacheService IRedisCache)
        {
            _config = config;
            _iMedicine = Medicine;
            _IRedisCache = IRedisCache;
        }
        [Route("LoadMedicineReport")]
        [HttpPost]
        public async Task<IActionResult> LoadMedicineReport()
        {
            var res = await _iMedicine.LoadMedicineReport();
            return Ok(res);
        }
       
    }
}
