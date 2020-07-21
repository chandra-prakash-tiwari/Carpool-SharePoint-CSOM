using CarPool_SharePoint_CSOM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarPool_SharePoint_CSOM.Services.ClientInterfaces
{
    public interface IRideService
    {
        bool Create(Ride ride);

        List<Ride> GetOffers(SearchRideRequest booking);

        bool Cancel(string rideId);

        bool OfferResponse(string rideId, string bookingId, BookingStatus status);

        bool Update(Ride updateRide);

        Ride GetById(string id);

        bool IsCarAvailable(string carId, int time, DateTime date);

        List<Ride> GetByOwnerId(string ownerId);
    }
}
