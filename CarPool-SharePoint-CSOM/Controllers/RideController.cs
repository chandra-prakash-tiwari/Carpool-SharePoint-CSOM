using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CarPool_SharePoint_CSOM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class RideController : ApiController
    {
        private readonly Services.ClientInterfaces.IRideService Services;

        public RideController()
        {
            this.Services = new Services.ClientServices.RideService();
        }

        [HttpPost]
        [ActionName("create")]
        public IHttpActionResult Create([FromBody] Models.Ride ride)
        {
            if (ride == null)
                return BadRequest();

            else if (!this.Services.Create(ride))
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpGet]
        [ActionName("response")]
        public IHttpActionResult RideResponse(string rideId, string bookingId, Models.BookingStatus status)
        {
            if (!this.Services.OfferResponse(rideId, bookingId, status))
                return BadRequest();

            return Ok();
        }

        [HttpPut]
        [ActionName("update")]
        public IHttpActionResult Update([FromBody] Models.Ride ride, string rideId)
        {
            if (ride == null && rideId == null)
                return BadRequest();

            ride.Id = rideId;
            if (!Services.Update(ride))
                return BadRequest();

            return Ok();
        }

        [HttpGet]
        [ActionName("getbyid")]
        public IHttpActionResult GetById(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest();

            Models.Ride ride = this.Services.GetById(id);

            return Ok(ride);
        }

        [HttpGet]
        [ActionName("getallrides")]
        public List<Models.Ride> GetOwnerRides(string ownerId)
        {
            if (string.IsNullOrEmpty(ownerId))
                return null;

            return this.Services.GetByOwnerId(ownerId);
        }

        [HttpPost]
        [ActionName("offers")]
        public List<Models.Ride> GetOffers([FromBody] Models.SearchRideRequest booking)
        {
            if (booking == null)
                return null;

            return this.Services.GetOffers(booking);
        }

        [HttpGet]
        [ActionName("caravailable")]
        public bool CarAvailable(string carId, int time, DateTime date)
        {
            if (carId == null || date == null)
                return false;

            return this.Services.IsCarAvailable(carId, time, date);
        }
    }
}
