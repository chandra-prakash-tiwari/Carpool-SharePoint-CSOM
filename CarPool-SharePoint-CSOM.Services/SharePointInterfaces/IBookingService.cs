using System;
using System.Collections.Generic;
using CarPool_SharePoint_CSOM.Models;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.SharePoint.Client;

namespace CarPool_SharePoint_CSOM.Services.SharePointInterfaces
{
    public interface IBookingService
    {
        bool Create(Booking booking);

        bool Cancel(string id);

        ListItemCollection Status(string id);

        bool Response(string id, BookingStatus status);

        string GetRequesterById(string id);

        ListItemCollection GetByUserId(string userId);

        ListItemCollection GetAllByRideId(string rideId);

        ListItemCollection RequestPending(string rideId);

        ListItem GetById(string bookingId);

        ListItemCollection GetByRideId(string rideId, string bookerId);
    }
}
