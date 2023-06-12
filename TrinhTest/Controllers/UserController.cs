using LibTrinh;
using LibTrinh.Api;
using LibTrinh.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;
namespace TrinhTest.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IRedisCacheService _IRedisCache;
        private readonly IUser _iUser;
        /// <summary>
        /// UserController
        /// </summary>
        /// <param name="config"></param>
        /// <param name="IRedisCache"></param>
        /// <param name="iUser"></param>
        public UserController(IConfiguration config, IRedisCacheService IRedisCache, IUser iUser)
        {
            _config = config;
            _IRedisCache = IRedisCache;
            _iUser = iUser;
        }

        //[Authorize]
        [Route("LoadUser")]
        [HttpPost]
        public async Task<IActionResult> LoadUser(CFaSerachUserDTO cFaSerachUserDTO)
        {
            var res = await _iUser.LoadUser(cFaSerachUserDTO);
            return Ok(res);
        }
    }
}
