using CarPool_SharePoint_CSOM.Models;
using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CarPool_SharePoint_CSOM.Services.ClientServices
{
    public class RideService: ClientInterfaces.IRideService
    {
        private SharePointInterfaces.IRideService Service { get; set; }

        public RideService()
        {
            this.Service = new SharePointServices.RideService();
        }

        public bool Create(Ride ride)
        {
            return this.Service.Create(ride);
        }

        public List<Ride> GetOffers(SearchRideRequest booking)
        {
            var offers = this.Service.GetOffers(booking);
            if (offers == null)
            {
                return null;
            }

            List<Ride> rides = new List<Ride>();
            foreach(var offer in offers)
            {
                var count = 0;
                var viaPoints = (FieldLookupValue[])offer["ViaPoints"];
                foreach(var viaPoint in viaPoints)
                {
                    if (viaPoint.LookupValue == booking.From)
                    {
                        count++;
                    }
                    else if (viaPoint.LookupValue == booking.To)
                    {
                        count++;
                        break;
                    }
                }

                if (count == 2)
                {
                    Ride ride = new Ride
                    {
                        Id = Convert.ToString(offer["ID"]),
                        CarId = Convert.ToString((offer["Car"] as FieldLookupValue).LookupId),
                        OwnerId = Convert.ToString((offer["Owner"] as FieldLookupValue).LookupId),
                        AvailableSeats = Convert.ToInt32(offer["AvailableSeats"]),
                        From = Convert.ToString(offer["From"]),
                        RatePerKM = Convert.ToInt32(offer["RatePerKM"]),
                        RideDate = Convert.ToDateTime(offer["RideDate"]),
                        Status = (RideStatus)Convert.ToInt32(offer["Status"]),
                        Time = Convert.ToInt32(offer["Time"]),
                        To = Convert.ToString(offer["To"]),
                        TravelDate = Convert.ToDateTime(offer["TravelDate"]),
                    };

                    rides.Add(ride);
                }
            }

            return rides;
        }

        public bool Cancel(string rideId)
        {
            return this.Service.Cancel(rideId);
        }

        public bool OfferResponse(string rideId, string bookingId, BookingStatus status)
        {
            return this.Service.OfferResponse(rideId, bookingId, status);
        }

        public bool Update(Ride updateRide)
        {
            return this.Service.Update(updateRide);
        }

        public Ride GetById(string id)
        {
            var response = this.Service.GetById(id);
            if (response == null)
                return null;

            Ride ride = new Ride
            {
                Id = Convert.ToString(response["ID"]),
                CarId = Convert.ToString((response["Car"] as FieldLookupValue).LookupId),
                OwnerId = Convert.ToString((response["Owner"] as FieldLookupValue).LookupId),
                AvailableSeats = Convert.ToInt32(response["AvailableSeats"]),
                From = Convert.ToString((response["From"] as FieldLookupValue).LookupValue),
                RatePerKM = Convert.ToInt32(response["RatePerKM"]),
                RideDate = Convert.ToDateTime(response["RideDate"]),
                Status = (RideStatus)Convert.ToInt32(response["Status"]),
                Time = Convert.ToInt32(response["Time"]),
                To = Convert.ToString((response["To"] as FieldLookupValue).LookupValue),
                TravelDate = Convert.ToDateTime(response["TravelDate"]),
            };
            return ride;
        }

        public bool IsCarAvailable(string carId, int time, DateTime date)
        {
            return this.Service.IsCarAvailable(carId, time, date);
        }

        public List<Ride> GetByOwnerId(string ownerId)
        {
            var responses = this.Service.GetByOwnerId(ownerId);
            if (responses == null || responses.Count <= 0)
                return null;

            List<Ride> rides = new List<Ride>();
            foreach (var response in responses)
            {
                //var abc = (response["ViaPoints"];


                Ride ride = new Ride
                {
                    Id = Convert.ToString(response["ID"]),
                    CarId =(response["Car"] as FieldLookupValue).LookupValue,
                    OwnerId = (response["Owner"] as FieldLookupValue).LookupValue,
                    AvailableSeats = Convert.ToInt32(response["AvailableSeats"]),
                    From = (response["From"] as FieldLookupValue).LookupValue,
                    RatePerKM = Convert.ToInt32(response["RatePerKM"]),
                    RideDate = Convert.ToDateTime(response["RideDate"]),
                    Status = (RideStatus)Convert.ToInt32(response["Status"]),
                    Time = Convert.ToInt32(response["Time"]),
                    To = (response["To"] as FieldLookupValue).LookupValue,
                    TravelDate = Convert.ToDateTime(response["TravelDate"]),
                };

               
                rides.Add(ride);
            }

            return rides;
        }
    }
}
