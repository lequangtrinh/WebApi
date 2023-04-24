using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace TrinhTest.Controllers
{
    public class ProductsController : Controller
    {
        [Authorize]
        [Route("Product")]
        public IActionResult Product()
        {
            return View("~/Views/Pages/Products/Products.cshtml");
        }
    }
}
