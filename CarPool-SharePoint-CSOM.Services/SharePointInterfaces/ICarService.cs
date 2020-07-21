using CarPool_SharePoint_CSOM.Models;
using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarPool_SharePoint_CSOM.Services.SharePointInterfaces
{
    public interface ICarService
    {
        bool Create(Car car);

        bool Delete(string id);

        ListItemCollection GetByOwnerId(string ownerId);

        ListItem GetById(string id);

        bool HasCarNumber(string number);
    }
}
