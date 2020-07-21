using CarPool_SharePoint_CSOM.Models;
using CarPool_SharePoint_CSOM.Services.ClientInterfaces;
using System;
using System.Collections.Generic;

namespace CarPool_SharePoint_CSOM.Services.ClientServices
{
    public class CarService:ICarService
    {
        private SharePointInterfaces.ICarService Service { get; set; }

        public CarService()
        {
            this.Service = new SharePointServices.CarService();
        }
        public bool Create(Car car)
        {
            return this.Service.Create(car);
        }

        public bool Delete(string id)
        {
            return this.Service.Delete(id);
        }

        public List<Car> GetByOwnerId(string ownerId)
        {
            var responses = this.Service.GetByOwnerId(ownerId);
            if (responses == null)
                return null;

            List<Car> cars = new List<Car>();
            foreach(var response in responses)
            {
                Car car = new Car
                {
                    Id = Convert.ToString(response["ID"]),
                    Model = Convert.ToString(response["Model"]),
                    NoofSeat = Convert.ToInt32(response["NoofSeats"]),
                    Number = Convert.ToString(response["Number"])
                };

                cars.Add(car);
            }

            return cars;
        }

        public Car GetById(string id)
        {
            return null;
        }

        public bool HasCarNumber(string number)
        {
            return this.Service.HasCarNumber(number);
        }
    }
}
