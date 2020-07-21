using System.ComponentModel.DataAnnotations;

namespace CarPool_SharePoint_CSOM.Models
{
    public class User
    {
        public string Id { get; set; }

        [Required(ErrorMessage = "Please enter userName")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Please enter password")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Please enter name")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Please enter mobile number")]
        public string Mobile { get; set; }

        [Required(ErrorMessage = "Please enter email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Please enter address")]
        public string Address { get; set; }

        public string DrivingLicence { get; set; }

        public UserType Role { get; set; }

        public string Token { get; set; }

        public float Rating { get; set; }
    }
}
