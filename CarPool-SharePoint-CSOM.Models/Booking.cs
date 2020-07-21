using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarPool_SharePoint_CSOM.Models
{
    public class Booking
    {
        public string Id { get; set; }

        public string RideId { get; set; }

        public string BookerId { get; set; }

        public string From { get; set; }

        public string To { get; set; }

        public float TravellingDistance { get; set; }

        public int NoofSeats { get; set; }

        public int Time { get; set; }

        public DateTime BookingDate { get; set; }

        public DateTime TravelDate { get; set; }

        public BookingStatus Status { get; set; }
    }
}
