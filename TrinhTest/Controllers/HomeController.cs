﻿using LibTrinh;
using Microsoft.AspNetCore.Mvc;

namespace TrinhTest.Controllers
{
    //[ValidateAntiForgeryToken]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IAuthenService _AuthenService;
        public HomeController(ILogger<HomeController> logger, IAuthenService authenService)
        {
            _logger = logger;
            _AuthenService = authenService;
        }

        public IActionResult Index()
        {
            return View("~/Views/Pages/Login/Login.cshtml");
            //return View("~/Views/Pages/Dash/Dash_Master.cshtml");
        }
        [Route("DashBoards")]
        public IActionResult DashBoards(string code)
        {
            if(!string.IsNullOrWhiteSpace(code))
            {
                _AuthenService.GetTokenByCode(code);
            }
            return View("~/Views/Pages/Dash/Dash_Master.cshtml");
        }
        [Route("ChangePass")]
        public IActionResult ChangePass()
        {
            return View("~/Views/Pages/Login/ChangePassword.cshtml");
        }

        [Route("SignIn")]
        public IActionResult SignIn()
        {
            return View("~/Views/Pages/Login/SignIn.cshtml");
        }

        [Route("User")]
        public IActionResult User()
        {
            return View("~/Views/Pages/Login/User.cshtml");
        }
        [Route("RoleUser")]
        public IActionResult RoleUser()
        {
            return View("~/Views/Pages/Setting/SettingRoleUser.cshtml");
        }

        [Route("EditRole")]
        public IActionResult EditRole()
        {
            return View("~/Views/Pages/Dash/EditMater.cshtml");
        }
    }
}