using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiText.Models;
using System.Data;
using ApiText.DataAccess;
namespace ApiText.Controllers
{
    [Produces("application/json")]
    [Route("api/Procuder")]
    [ApiController]
    public class ProduceController : Controller
    {
         DATA data = new DATA();
        ResultStatus status = new ResultStatus();
        [HttpPost]
        public IActionResult CreateProcuder([FromBody] Procuder pro)
        {
             var result = status.Insert_Produce(pro);
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
        public IActionResult UpdateProduder([FromBody] Procuder pro)
        {
            var result = status.Update_Produder(pro);
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
        public IActionResult DeleteProducer(int id)
        {
            var result = status.Delete_Produder(id);
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
