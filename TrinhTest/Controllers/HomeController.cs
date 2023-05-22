using LibTrinh;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace TrinhTest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    //[ValidateAntiForgeryToken]
    public class HomeController : ControllerBase
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IAuthenService _AuthenService;
        public HomeController(ILogger<HomeController> logger, IAuthenService authenService)
        {
            _logger = logger;
            _AuthenService = authenService;
        }
        [HttpGet("KeepAlive")]
        public ActionResult KeepAlive()
        {
            return Content("1");
        }
    }
}