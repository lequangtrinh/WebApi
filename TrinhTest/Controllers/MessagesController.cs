using Microsoft.AspNetCore.Mvc;

namespace TrinhTest.Controllers
{
    public class MessagesController : Controller
    {
        [Route("LoadFriendChat")]
        public IActionResult LoadFriendChat()
        {
            return View("~/Views/Pages/Chat/ChatBots.cshtml");
        }
    }
}
