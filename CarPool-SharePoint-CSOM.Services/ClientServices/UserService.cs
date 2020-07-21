using CarPool_SharePoint_CSOM.Models;
using System;

namespace CarPool_SharePoint_CSOM.Services.ClientServices
{
    public class UserService: ClientInterfaces.IUserService
    {
        private SharePointInterfaces.IUserService Service { get; set; }
        public UserService()
        {
            this.Service = new SharePointServices.UserService();
        }

        public bool Create(User user)
        {
            return this.Service.Create(user);
        }

        public User Authenticate(LoginRequest credentials)
        {
            var user = this.Service.Authenticate(credentials);
            if (user == null)
                return null;

            User userDetails = new User();
            userDetails.Id = Convert.ToString(user["ID"]);
            userDetails.Name = Convert.ToString(user["Title"]);
            userDetails.UserName = Convert.ToString(user["UserName"]);
            userDetails.Mobile = Convert.ToString(user["Mobile"]);
            userDetails.Address = Convert.ToString(user["Address"]);
            userDetails.Email = Convert.ToString(user["Email"]);

            return userDetails;
        }

        public bool Delete(string id)
        {
            return this.Service.Delete(id);
        }

        public bool Update(User updateUser)
        {
            return this.Service.Update(updateUser);
        }

        public User GetById(string id)
        {
            var user = this.Service.GetById(id);
            if (user == null)
                return null;

            User userDetails = new User();
            userDetails.Id = Convert.ToString(user["ID"]);
            userDetails.Name = Convert.ToString(user["Title"]);
            userDetails.UserName = Convert.ToString(user["UserName"]);
            userDetails.Mobile = Convert.ToString(user["Mobile"]);
            userDetails.Address = Convert.ToString(user["Address"]);
            userDetails.Email = Convert.ToString(user["Email"]);

            return userDetails;
        }

        public bool HasUserName(string userName)
        {
            return this.Service.HasUserName(userName);
        }

        public bool HasEmail(string email)
        {
            return this.Service.HasEmail(email);
        }
    }
}
