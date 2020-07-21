using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarPool_SharePoint_CSOM.Models
{
    public class SearchRideRequest
    {
        [Required(ErrorMessage = "Please enter source city name")]
        public string From { get; set; }

        [Required(ErrorMessage = "Please enter destination city name")]
        public string To { get; set; }

        [Required(ErrorMessage = "Please enter date")]
        public DateTime TravelDate { get; set; }
    }
}
