using System.ComponentModel.DataAnnotations;

namespace CarPool_SharePoint_CSOM.Models
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "Please enter username")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Enter password")]
        public string Password { get; set; }
    }
}
