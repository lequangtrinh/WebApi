using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TrinhTest.Controllers
{
    public class SettingsController : Controller
    {
        
        [Route("PriceServices")]
        public IActionResult PriceServices()
        {
           return View("~/Views/Pages/Setting/PriceServices/SettingPriceServices.cshtml");
        }
        [Authorize]
        [Route("Languages")]
        public IActionResult Languages()
        {
            return View("~/Views/Pages/Setting/Languages.cshtml");
        }
    }
}
