﻿using LibTrinh;
using LibTrinh.Api.UploadImage;
using LibTrinh.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace TrinhTest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IAuthenService _AuthenService;
        private readonly IUpLoadImg _IUpLoadImg;
        private readonly IRedisCacheService _IRedisCache;
        /// <summary>
        /// Custrustor
        /// </summary>
        /// <param name="config"></param>
        /// <param name="tokenService"></param>
        public AuthorController(IConfiguration config, IAuthenService authenService, IUpLoadImg upLoadImg, IRedisCacheService IRedisCache)
        {
            _config = config;
            _AuthenService = authenService;
            _IUpLoadImg = upLoadImg;
            _IRedisCache = IRedisCache;

        }

        /// <summary>
        /// Login class
        /// </summary>
        /// <param name="objUser"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login(CFaUserInfoDTO objUser)
        {
            var res = await _AuthenService.LoginAsync(objUser);
            if (res != null)
            {
                Response.Cookies.Append("X-UserID", objUser.userID, new CookieOptions() { HttpOnly = false, SameSite = SameSiteMode.Strict });
            }

            //_IRedisCache.Set<object>(objUser.userID+"_"+DateTime.Now.ToString("dd-MM-yyyy HH:mm:ss"), res.ToString());
            return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(res));
        }

        [AllowAnonymous]
        [Route("loginGoogle")]
        [HttpPost]
        public string LoginGoogle()
        {
            var res =  _AuthenService.LoginGoolgeAsync();
            //string email = Request.Form["email"].FirstOrDefault();
            return RedirectPermanent(res.Url).Url;
        }


        [AllowAnonymous]
        [Route("ResultViewGoogle")]
        [HttpPost]
        public IActionResult ResultViewGoogle(string code)
        {
            //string email = Request.Form["email"].FirstOrDefault();
            var res = _AuthenService.GetTokenByCode(code);
            return Ok();
        }
        /// <summary>
        /// Revoke token expired delete token
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [Authorize]
        [Route("logout")]
        public ActionResult RevokeToken()
        {
            //Response.Cookies.Delete("X-Access-Token");
            //Response.Cookies.Delete("X-UserID");
            return Ok();
        }

        
        [Route("ValidateToken")]
        [HttpPost]
        public async Task<IActionResult>ValidateToken(CFaAuthorValidateToken value)
        {
            if (value.Token != null)
            {
                var res = await _AuthenService.ValidateToken(value.Token, value.UserID, value.PublicKey);
                //Response.Cookies.Append("X-Access-Token", res, new CookieOptions() { HttpOnly = false, SameSite = SameSiteMode.Strict });
                return Ok(Newtonsoft.Json.JsonConvert.SerializeObject(res));
            }
            return null;
        }

        [AllowAnonymous]
        [Route("RegisUser")]
        [HttpPost]
        public async Task<IActionResult> RegisUser(CFaUserLoginDTO objUser)
        {
            var res = await _AuthenService.RegisUser(objUser);
            if (!res) return Content("0");
            else return Content("1");
        }

        [Authorize]
        [Route("UpdateInfoUser")]
        [HttpPost]
        public async Task<IActionResult> UpdateInfoUser([FromBody] CFaUserRegisDTO objData)
        {
            var res = _IUpLoadImg.UpInstImg(objData);
            return Content(res);
        }

        [Authorize]
        [Route("ResetPassWord")]
        [HttpPost]
        public async Task<IActionResult> ResetPassWord(string emailUser, int num)
        {
            var res = _AuthenService.RestPassWord(emailUser, num);
            if (!res) return Content("0");
            else return Content("1");
        }
        [Route("SendMail")]
        [HttpPost]
        public async Task<IActionResult> SendMail(string email)
        {
            var res = _AuthenService.ReqOTPPassWord(email);
            return Ok(res);


        }
    }
}
