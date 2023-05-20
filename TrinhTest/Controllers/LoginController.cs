using AutoMapper.Configuration;
using LibTrinh.Api;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Threading.Tasks;

namespace TrinhTest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUser _iUser;

        /// <summary>
        /// Custrustor
        /// </summary>
        /// <param name="config"></param>
        /// <param name="iUser"></param>
        public LoginController(IConfiguration config, IUser iUser)
        {
            _config = config;
            _iUser = iUser;

        }

        [AllowAnonymous]
        //[Authorize]
        [Route("LoadUser")]
        [HttpPost]
        public async Task<string> Loaduser()
        {
            return await _iUser.LoadUser();
        }
    }
}
