using CarPool_SharePoint_CSOM.Models;
using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarPool_SharePoint_CSOM.Services.SharePointServices
{
    public class CarService:SharePointInterfaces.ICarService
    {
        private ClientContext ClientContext { get; set; }
        public CarService()
        {
            this.ClientContext = CommonService.GetonlineContext();
        }

        public bool Create(Car car)
        {
            try
            {
                List oList = this.ClientContext.Web.Lists.GetByTitle("Cars");
                ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
                ListItem oListItem = oList.AddItem(itemCreateInfo);
                oListItem["Model"] = car.Model;
                oListItem["NoofSeats"] = car.NoofSeat;
                oListItem["Number"] = car.Number;
                oListItem["OwnerId"] = car.OwnerId;
                oListItem.Update();
                this.ClientContext.ExecuteQuery();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool Delete(string carId)
        {
            try
            {
                List list = this.ClientContext.Web.Lists.GetByTitle("Cars");
                Int32.TryParse(carId, out int id);
                ListItem listItem = list.GetItemById(id);
                listItem.DeleteObject();
                this.ClientContext.ExecuteQuery();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public ListItemCollection GetByOwnerId(string ownerId)
        {
            try
            {
                List oList = this.ClientContext.Web.Lists.GetByTitle("Cars");
                Int32.TryParse(ownerId, out int id);
                CamlQuery camlQuery = new CamlQuery();
                camlQuery.ViewXml = string.Format(@"<View>
                                                <Query>
                                                    <Where>
                                                        <Eq>
                                                            <FieldRef Name='OwnerId'/>
                                                            <Value Type='Text'>{0}</Value>
                                                        </Eq>
                                                    </Where>
                                                </Query>
                                                <ViewFields>
                                                    <FieldRef Name='Model'/>
                                                    <FieldRef Name='Number'/>
                                                    <FieldRef Name='Id'/>
                                                    <FieldRef Name='Owner'/>
                                                    <FieldRef Name='NoofSeats'/>
                                                </ViewFields>
                                             </View>", id);
                ListItemCollection itemCollection = oList.GetItems(camlQuery);
                this.ClientContext.Load(itemCollection);
                this.ClientContext.ExecuteQuery();
                return itemCollection;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public ListItem GetById(string carId)
        {
            try
            {
                List list = this.ClientContext.Web.Lists.GetByTitle("Cars");
                Int32.TryParse(carId, out int id);
                ListItem listItem = list.GetItemById(id);
                this.ClientContext.Load(listItem);
                this.ClientContext.ExecuteQuery();
                return listItem;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public bool HasCarNumber(string number)
        {
            try
            {
                List oList = this.ClientContext.Web.Lists.GetByTitle("Cars");
                CamlQuery camlQuery = new CamlQuery();
                camlQuery.ViewXml = string.Format(@"<View>
                                                <Query>
                                                    <Where>
                                                        <Eq>
                                                            <FieldRef Name='Number'/>
                                                            <Value Type='Text'>{0}</Value>
                                                        </Eq>
                                                    </Where>
                                                </Query>
                                                <ViewFields>
                                                    <FieldRef Name='Id'/>
                                                </ViewFields>
                                             </View>", number);
                ListItemCollection itemCollection = oList.GetItems(camlQuery);
                this.ClientContext.Load(itemCollection);
                this.ClientContext.ExecuteQuery();
                if (itemCollection.Count == 0)
                    return false;

                return true;
            }
            catch (Exception ex)
            {
                return true;
            }
        }
    }
}
