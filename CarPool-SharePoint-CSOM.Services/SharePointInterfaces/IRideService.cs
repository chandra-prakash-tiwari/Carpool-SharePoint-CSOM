using System;
using System.Collections.Generic;
using CarPool_SharePoint_CSOM.Models;
using Microsoft.SharePoint.Client;

namespace CarPool_SharePoint_CSOM.Services.SharePointInterfaces
{
    public interface IRideService
    {
        bool Create(Ride ride);

        ListItemCollection GetOffers(SearchRideRequest booking);

        bool Cancel(string rideId);

        bool OfferResponse(string rideId, string bookingId, BookingStatus status);

        bool Update(Ride updateRide);

        ListItem GetById(string id);

        bool IsCarAvailable(string carId, int time, DateTime date);

        ListItemCollection GetByOwnerId(string ownerId);
    }
}
