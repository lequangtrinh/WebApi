using ApiText.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiText.DataAccess;
using System.Net;
using Microsoft.AspNetCore.Authorization;

namespace ApiText.Controllers
{
    [Produces("application/json")]
    [Route("/api/Login")]
    [ApiController]
    public class LoginController : Controller
    {
        DATA data = new DATA();
       ResultStatus status = new ResultStatus();
        [HttpGet]
        public IActionResult LoadLoginAll(string key)
        {
            var result = data.GetLoginLoad(0,key);
            try
            {

                return Ok(result);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        [HttpGet("{id}")]
        public IActionResult LoadLoginID(int id,string key)
        {
            var result = data.GetLoginLoad(id,key);
            try
            {

                return Ok(result);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost]
        public IActionResult CreateLogin([FromBody] Login lg)
        {
            var result = status.Insert_Login(lg);
            try
            {

                return Ok(result);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpDelete]
        public IActionResult DeleteLogin(int id)
        {
            var result = status.Delete_Login(id);
            try
            {
                return Ok(result);
            }
            catch
            {
                return BadRequest(result);
            }
        }

        [HttpPut]
        public IActionResult updateLogin([FromBody] Login lg)
        {
            var result = status.Update_Login(lg);
            try
            {
                return Ok(result);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("UpdatePass")]
        public IActionResult updateLoginPass([FromBody] Login lg)
        {
            var result = status.Update_LoginPassNew(lg);
            try
            {
                return Ok(result);
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("DOLOGIN")]
        public IActionResult GetLoginDO(string user,string pass)
        {
            LoginDO d = new LoginDO();
            d.username = user;
            d.password = pass;
            string result = status.DoLogin(d);
            try
            {

                return Ok(result);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
