using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarPool_SharePoint_CSOM.Models
{
    public enum BookingStatus
    {
        Confirm = 1,
        Rejected,
        Pending,
        Completed,
        Cancel
    };

    public enum UserType
    {
        User,
        Admin
    }

    public enum RideStatus
    {
        Active,
        Cancel,
        Completed,
        SeatFull
    }
}
