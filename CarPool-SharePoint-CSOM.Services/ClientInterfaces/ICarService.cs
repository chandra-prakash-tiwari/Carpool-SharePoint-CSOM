using CarPool_SharePoint_CSOM.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarPool_SharePoint_CSOM.Services.ClientInterfaces
{
    public interface ICarService
    {
        bool Create(Car car);

        bool Delete(string id);

        List<Car> GetByOwnerId(string ownerId);

        Car GetById(string id);

        bool HasCarNumber(string number);
    }
}
