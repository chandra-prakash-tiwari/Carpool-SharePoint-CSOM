using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CarPool_SharePoint_CSOM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CarController : ApiController
    {
        private readonly Services.ClientInterfaces.ICarService Services;

        public CarController()
        {
            this.Services = new Services.ClientServices.CarService();
        }

        [HttpPost]
        [ActionName("create")]
        public IHttpActionResult Create([FromBody] Models.Car car, string ownerId)
        {
            if (string.IsNullOrEmpty(ownerId) || car == null)
                return BadRequest();

            car.OwnerId = ownerId;
            if (!this.Services.Create(car))
                return NotFound();

            return Ok();
        }

        [HttpDelete]
        [ActionName("delete")]
        public IHttpActionResult Remove(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest();

            if (!this.Services.Delete(id))
                return NotFound();

            return Ok();
        }

        [HttpGet]
        [ActionName("getbyownerid")]
        public IHttpActionResult GetByOwnerId(string ownerId)
        {
            if (string.IsNullOrEmpty(ownerId))
                return BadRequest();

            return Ok(this.Services.GetByOwnerId(ownerId));
        }

        [HttpGet]
        [ActionName("getbyid")]
        public IHttpActionResult GetById(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest();

            return Ok(this.Services.GetById(id));
        }

        [HttpGet]
        [ActionName("hasnumber")]
        public bool HasNumber(string number)
        {
            if (number == null)
                return false;

            return this.Services.HasCarNumber(number);
        }
    }
}
