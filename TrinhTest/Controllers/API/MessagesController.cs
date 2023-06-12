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
    public class MessagesController:ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IMessages _Imessages;
        private readonly IRedisCacheService _IRedisCache;

        /// <summary>
        /// Custrustor
        /// </summary>
        public MessagesController(IConfiguration config, IMessages messages, IRedisCacheService IRedisCache)
        {
            _config = config;
            _Imessages = messages;
            _IRedisCache = IRedisCache;

        }
        [Route("loadFriendChat")]
        [HttpPost]
        public async Task<IActionResult> loadFriendChat(string UserID)
        {
            var res =await _Imessages.LoadFriendMessages(UserID);
            return Ok(res);
        }
        [Route("RegisDataMessagesUser")]
        [HttpPost]
        public async Task<IActionResult> RegisDataMessagesUser(CFaRegisMessagesUserDTO data)
        {
            var res = await _Imessages.RegisDataMessagesUser(data);
            return Ok(res);
        }
        [Route("LoadDataMessages")]
        [HttpPost]
        public async Task<IActionResult> LoadDataMessages(CFaLoadMessagesDTO objData)
        {
            var res = await _Imessages.LoadDataMessages(objData.UserID, objData.UserIDTo);
            return Ok(res);
        }
    }
}
