using CarPool_SharePoint_CSOM.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CarPool_SharePoint_CSOM.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class BookingController : ApiController
    {
        private readonly Services.ClientInterfaces.IBookingService BookingService;
        public BookingController()
        {
            this.BookingService = new Services.ClientServices.BookingService();
        }
        
        [HttpPost]
        [ActionName("create")]
        public IHttpActionResult Create([FromBody] Booking booking, string bookerId)
        {
            if (string.IsNullOrEmpty(bookerId) || booking == null)
                return BadRequest();

            booking.BookerId = bookerId;
            booking.Status = BookingStatus.Pending;
            booking.BookingDate = DateTime.Now;
            if (!this.BookingService.Create(booking))
                return Ok();

            return NotFound();
        }

        [HttpGet]
        [ActionName("cancel")]
        public IHttpActionResult Cancel(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest();

            else if (!this.BookingService.Cancel(id))
                return NotFound();

            return Ok(this.BookingService.GetById(id));
        }

        [HttpGet()]
        [ActionName("getstatusbyownerid")]
        public IHttpActionResult GetStatusByOwnerId(string ownerId)
        {
            if (string.IsNullOrEmpty(ownerId))
                return BadRequest();

            return Ok(this.BookingService.Status(ownerId));
        }

        [HttpGet]
        [ActionName("getrequesterbyid")]
        public IHttpActionResult Requester(string id)
        {
            if (string.IsNullOrEmpty(id))
                return BadRequest();

            return Ok(this.BookingService.GetRequesterById(id));
        }

        [HttpGet]
        [ActionName("getallbyrideid")]
        public IHttpActionResult GetAllByRideId(string rideId)
        {
            if (string.IsNullOrEmpty(rideId))
                return BadRequest();

            return Ok(this.BookingService.GetAllByRideId(rideId));
        }

        [HttpGet]
        [ActionName("getbyuserid")]
        public IHttpActionResult GetByUserId(string userId)
        {
            if (string.IsNullOrEmpty(userId))
                return BadRequest();

            return Ok(this.BookingService.GetByUserId(userId));
        }

        [HttpGet]
        [ActionName("getbyid")]
        public IActionResult GetById(string id)
        {
            if (string.IsNullOrEmpty(id))
                return (IActionResult)BadRequest();

            return (IActionResult)Ok(this.BookingService.GetById(id));
        }

        [HttpGet]
        [ActionName("getbookerbyrideid")]
        public IHttpActionResult GetByRideId(string rideId, string bookerId)
        {
            if (rideId == null || bookerId == null)
                return BadRequest();

            return Ok(this.BookingService.GetByRideId(rideId, bookerId));
        }
    }
}
