using CarPool_SharePoint_CSOM.Models;
using CarPool_SharePoint_CSOM.Services.ClientInterfaces;
using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;

namespace CarPool_SharePoint_CSOM.Services.ClientServices
{
    public class BookingService:IBookingService
    {
        private SharePointInterfaces.IBookingService Service { get; set; }
        public BookingService()
        {
            this.Service = new SharePointServices.BookingService();
        }
        public bool Create(Booking booking)
        {
            return this.Service.Create(booking);
        }

        public bool Cancel(string id)
        {
            return this.Service.Cancel(id);
        }

        public List<Booking> Status(string id)
        {
            var bookings = this.Service.Status(id);
            if(bookings==null && bookings.Count <= 0)
            {
                return null;
            }

            List<Booking> bookings1 = new List<Booking>();
            foreach(var booking in bookings)
            {
                Booking booking1 = new Booking
                {
                    From = Convert.ToString(booking["From"]),
                    To = Convert.ToString(booking["To"]),
                    Time = Convert.ToInt32(booking["Time"]),
                    Status = (BookingStatus)Convert.ToInt32(booking["Status"]),
                    TravelDate = Convert.ToDateTime(booking["TravelDate"]),
                    NoofSeats = Convert.ToInt32(booking["NoofSeats"]),
                    Id = Convert.ToString(booking["ID"]),
                    RideId = Convert.ToString((booking["Ride"] as FieldLookupValue).LookupId),
                    BookerId = Convert.ToString((booking["Booker"] as FieldLookupValue).LookupId)
                };
                bookings1.Add(booking1);
            }

            return bookings1;
        }

        public bool Response(string id, BookingStatus status)
        {
            return this.Service.Response(id, status);
        }

        public string GetRequesterById(string id)
        {
            return this.Service.GetRequesterById(id);
        }

        public List<Booking> GetByUserId(string userId)
        {
            var bookings = this.Service.GetByUserId(userId);
            if (bookings == null)
                return null;

            List<Booking> bookings1 = new List<Booking>();
            foreach (var booking in bookings)
            {
                Booking booking1 = new Booking
                {
                    From = Convert.ToString(booking["From"]),
                    To = Convert.ToString(booking["To"]),
                    Time = Convert.ToInt32(booking["Time"]),
                    Status = (BookingStatus)Convert.ToInt32(booking["Status"]),
                    TravelDate = Convert.ToDateTime(booking["TravelDate"]),
                    NoofSeats = Convert.ToInt32(booking["NoofSeats"]),
                    Id = Convert.ToString(booking["ID"]),
                    RideId = Convert.ToString((booking["Ride"] as FieldLookupValue).LookupId),
                    BookerId = Convert.ToString((booking["Booker"] as FieldLookupValue).LookupId)
                };
                bookings1.Add(booking1);
            }

            return bookings1;
        }

        public List<Booking> GetAllByRideId(string rideId)
        {
            var bookings = this.Service.GetAllByRideId(rideId);
            if (bookings == null && bookings.Count <= 0)
            {
                return null;
            }

            List<Booking> bookings1 = new List<Booking>();
            foreach (var booking in bookings)
            {
                Booking booking1 = new Booking
                {
                    From = Convert.ToString(booking["From"]),
                    To = Convert.ToString(booking["To"]),
                    Time = Convert.ToInt32(booking["Time"]),
                    Status = (BookingStatus)Convert.ToInt32(booking["Status"]),
                    TravelDate = Convert.ToDateTime(booking["TravelDate"]),
                    NoofSeats = Convert.ToInt32(booking["NoofSeats"]),
                    Id = Convert.ToString(booking["ID"]),
                    RideId = Convert.ToString((booking["Ride"] as FieldLookupValue).LookupId),
                    BookerId = Convert.ToString((booking["Booker"] as FieldLookupValue).LookupId)
                };
                bookings1.Add(booking1);
            }

            return bookings1;
        }

        public List<Booking> RequestPending(string rideId)
        {
            var bookings = this.Service.RequestPending(rideId);
            if (bookings == null && bookings.Count <= 0)
            {
                return null;
            }

            List<Booking> bookings1 = new List<Booking>();
            foreach (var booking in bookings)
            {
                Booking booking1 = new Booking
                {
                    From = Convert.ToString(booking["From"]),
                    To = Convert.ToString(booking["To"]),
                    Time = Convert.ToInt32(booking["Time"]),
                    Status = (BookingStatus)Convert.ToInt32(booking["Status"]),
                    TravelDate = Convert.ToDateTime(booking["TravelDate"]),
                    NoofSeats = Convert.ToInt32(booking["NoofSeats"]),
                    Id = Convert.ToString(booking["ID"]),
                    RideId = Convert.ToString(booking["RideId"]),
                    BookerId = Convert.ToString(booking["BookerId"])
                };
                bookings1.Add(booking1);
            }

            return bookings1;
        }

        public Booking GetById(string bookingId)
        {
            var booking = this.Service.GetById(bookingId);
            if (booking == null)
            {
                return null;
            }
            Booking booking1 = new Booking
            {
                From = Convert.ToString(booking["From"]),
                To = Convert.ToString(booking["To"]),
                Time = Convert.ToInt32(booking["Time"]),
                Status = (BookingStatus)Convert.ToInt32(booking["Status"]),
                TravelDate = Convert.ToDateTime(booking["TravelDate"]),
                NoofSeats = Convert.ToInt32(booking["NoofSeats"]),
                Id = Convert.ToString(booking["ID"]),
                RideId = Convert.ToString(booking["RideId"]),
                BookerId=Convert.ToString(booking["BookerId"])
            };

            return booking1;
        }

        public List<Booking> GetByRideId(string rideId, string bookerId)
        {
            var bookings = this.Service.GetByRideId(rideId, bookerId);
            if (bookings == null || bookings.Count <= 0)
            {
                return null;
            }

            List<Booking> bookings1 = new List<Booking>();
            foreach (var booking in bookings)
            {
                Booking booking1 = new Booking
                {
                    From = Convert.ToString(booking["From"]),
                    To = Convert.ToString(booking["To"]),
                    Time = Convert.ToInt32(booking["Time"]),
                    Status = (BookingStatus)Convert.ToInt32(booking["Status"]),
                    TravelDate = Convert.ToDateTime(booking["TravelDate"]),
                    NoofSeats = Convert.ToInt32(booking["NoofSeats"]),
                    Id = Convert.ToString(booking["ID"]),
                    RideId = Convert.ToString(booking["RideId"]),
                    BookerId = Convert.ToString(booking["BookerId"])
                };
                bookings1.Add(booking1);
            }

            return bookings1;
        }
    }
}
