using Microsoft.AspNetCore.Mvc;

namespace TrinhTest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MaterController : ControllerBase
    {
        private readonly IConfiguration _config;
        /// <summary>
        /// Custrustor
        /// </summary>
        /// <param name="config"></param>
        /// <param name="tokenService"></param>
        public MaterController(IConfiguration config)
        {
            _config = config;

        }
    }
}
