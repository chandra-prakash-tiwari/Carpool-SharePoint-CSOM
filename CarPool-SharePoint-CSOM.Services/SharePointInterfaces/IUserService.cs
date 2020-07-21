using CarPool_SharePoint_CSOM.Models;
using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarPool_SharePoint_CSOM.Services.SharePointInterfaces
{
    public interface IUserService
    {
        bool Create(Models.User user);

        ListItem Authenticate(LoginRequest credentials);

        bool Delete(string id);

        bool Update(Models.User updateUser);

        ListItem GetById(string id);

        bool HasUserName(string userName);

        bool HasEmail(string email);
    }
}
