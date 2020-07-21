using System;
using System.ComponentModel.DataAnnotations;

namespace CarPool_SharePoint_CSOM.Models
{
    public class Car
    {
        public string Id { get; set; }

        [Required(ErrorMessage = "Please enter car number")]
        public string Number { get; set; }

        [Required(ErrorMessage = "Please enter car model")]
        public string Model { get; set; }

        [Required(ErrorMessage = "Please enter max number of seats")]
        public int NoofSeat { get; set; }

        public DateTime CreatedDate { get; set; }

        public string OwnerId { get; set; }
    }
}
