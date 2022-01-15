using ApiText.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiText.DataAccess;
using System.Data;
using Newtonsoft.Json;

namespace ApiText.Controllers
{
    [Produces("application/json")]
    [Route("/api/Certory")]
    [ApiController]

    public class CatoryController : Controller
    {
        DATA data = new DATA();

        [HttpGet]
        public IActionResult GetCertoryAll(string key)
        {
            var result = data.GetCertoryLoad(0,key);
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
        public IActionResult GetCertoryID(int id,string key)
        {
            var result = data.GetCertoryLoad(id,key);
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
        public IActionResult PostCertory([FromBody]Certory ce)
        {
            var result = status.Insert_Catory(ce);
            try
            {

                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        public IActionResult PutCeatory([FromBody]Certory cr)
        {
            var result = status.Update_Catory(cr);
            try
            {

                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
        [HttpDelete]
        public IActionResult DelectCertory(int id)
        {
            var result = status.Delete_Certory(id);
            try
            {

                return Ok(result);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}
