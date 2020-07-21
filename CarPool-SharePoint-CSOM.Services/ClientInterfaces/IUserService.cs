using CarPool_SharePoint_CSOM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarPool_SharePoint_CSOM.Services.ClientInterfaces
{
    public interface IUserService
    {
        bool Create(User user);

        User Authenticate(LoginRequest credentials);

        bool Delete(string id);

        bool Update(User updateUser);

        User GetById(string id);

        bool HasUserName(string userName);

        bool HasEmail(string email);
    }
}
