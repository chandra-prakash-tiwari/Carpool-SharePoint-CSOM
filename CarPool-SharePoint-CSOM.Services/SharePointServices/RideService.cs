using CarPool_SharePoint_CSOM.Models;
using CarPool_SharePoint_CSOM.Services.SharePointInterfaces;
using Microsoft.SharePoint.Client;
using Nancy.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CarPool_SharePoint_CSOM.Services.SharePointServices
{
    public class RideService:IRideService
    {
        private ClientContext ClientContext { get; set; }
        public RideService()
        {
            this.ClientContext = CommonService.GetonlineContext();
        }
        public bool Create(Ride ride)
        {
            try
            {
                List oList = this.ClientContext.Web.Lists.GetByTitle("Rides");
                ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
                ListItem oListItem = oList.AddItem(itemCreateInfo);
                oListItem["From"] = new FieldLookupValue { LookupId = GetCityId(ride.From) };
                oListItem["To"] = new FieldLookupValue { LookupId = GetCityId(ride.To) };
                oListItem["TravelDate"] = ride.TravelDate;
                oListItem["RideDate"] = DateTime.Now;
                oListItem["RatePerKM"] = ride.RatePerKM;
                oListItem["AvailableSeats"] = ride.AvailableSeats;
                oListItem["Time"] = ride.Time;
                oListItem["Status"] = (int)ride.Status;
                oListItem["ViaPoints"] = GetViaPoints(ride.ViaPoints);
                oListItem["Owner"] = ride.OwnerId;
                oListItem["Car"] = ride.CarId;
                oListItem.Update();
                this.ClientContext.ExecuteQuery();
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public ArrayList GetViaPoints(string viaPointsString)
        {
            JavaScriptSerializer ser = new JavaScriptSerializer();
            var viaPointsser = ser.Deserialize<List<string>>(viaPointsString);
            var viaPoints = new ArrayList();
            foreach (var viaPoint in viaPointsser)
            {
                var lookupValue = new FieldLookupValue { LookupId = GetCityId(viaPoint) };
                viaPoints.Add(lookupValue);
            }

            return viaPoints;
        }

        public int GetCityId(string cityName)
        {
            try
            {
                List oList = this.ClientContext.Web.Lists.GetByTitle("CitiesRecord");
                CamlQuery camlQuery = new CamlQuery();
                camlQuery.ViewXml = string.Format(@"<View>
                                                <Query>
                                                    <Where>
                                                        <Eq>
                                                            <FieldRef Name='Title' />
                                                            <Value Type='Text'>{0}</Value>
                                                        </Eq>
                                                    </Where>
                                                </Query>
                                                <ViewFields>
                                                    <FieldRef Name='Id'/>
                                                </ViewFields>
                                             </View>", cityName);
                ListItemCollection itemCollection = oList.GetItems(camlQuery);
                this.ClientContext.Load(itemCollection);
                this.ClientContext.ExecuteQuery();
                return (itemCollection[0]).Id;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public ListItemCollection GetOffers(SearchRideRequest booking)
        {
            try
            {
                List oList = this.ClientContext.Web.Lists.GetByTitle("Rides");
                CamlQuery camlQuery = new CamlQuery();
                camlQuery.ViewXml = string.Format(@"<View>
                                                <Query>
                                                    <Where><And>
                                                        <Contains>
                                                            <FieldRef Name='ViaPoints' />
                                                            <Value Type='Text'>{0}</Value>
                                                        </Contains>
                                                        <Contains>
                                                            <FieldRef Name='ViaPoints' />
                                                            <Value Type='Text'>{1}</Value>
                                                        </Contains></And>
                                                    </Where>
                                                </Query>
                                                <ViewFields>
                                                    <FieldRef Name='From'/>
                                                    <FieldRef Name='To'/>
                                                    <FieldRef Name='TravelDate'/>
                                                    <FieldRef Name='RideDate'/>
                                                    <FieldRef Name='RatePerKM'/>
                                                    <FieldRef Name='AvailableSeats'/>
                                                    <FieldRef Name='Time'/>
                                                    <FieldRef Name='Status'/>
                                                    <FieldRef Name='Owner'/>
                                                    <FieldRef Name='Car'/>
                                                    <FieldRef Name='ViaPoints'/>
                                                </ViewFields>
                                             </View>", booking.From, booking.To, booking.TravelDate.ToShortDateString());
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

        public bool Cancel(string rideId)
        {
            try
            {
                List oList = this.ClientContext.Web.Lists.GetByTitle("Rides");
                Int32.TryParse(rideId, out int id);
                ListItem listItem = oList.GetItemById(id);
                listItem["Status"] = RideStatus.Cancel;
                listItem.Update();
                this.ClientContext.ExecuteQuery();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool OfferResponse(string rideId, string bookingId, Models.BookingStatus status)
        {
            try
            {
                List oList = this.ClientContext.Web.Lists.GetByTitle("Bookings");
                Int32.TryParse(bookingId, out int id);
                ListItem listItem = oList.GetItemById(id);
                listItem["Status"] = status;
                listItem.Update();
                this.ClientContext.ExecuteQuery();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool Update(Models.Ride updateRide)
        {
            try
            {
                List oList = this.ClientContext.Web.Lists.GetByTitle("Rides");
                Int32.TryParse(updateRide.Id, out int id);
                ListItem listItem = oList.GetItemById(id);
                listItem["OwnerId"] = updateRide.OwnerId;
                listItem["RatePerKM"] = updateRide.RatePerKM;
                listItem["Status"] = updateRide.Status;
                listItem["Time"] = updateRide.Time;
                listItem["To"] = updateRide.To;
                listItem["TravelDate"] = updateRide.TravelDate;
                //listItem[""] = updateRide.ViaPoints;
                listItem["From"] = updateRide.From;
                listItem["CarId"] = updateRide.CarId;
                listItem["AvailableSeats"] = updateRide.AvailableSeats;
                listItem.Update();
                this.ClientContext.ExecuteQuery();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public ListItem GetById(string rideId)
        {
            try
            {
                List oList = this.ClientContext.Web.Lists.GetByTitle("Rides");
                Int32.TryParse(rideId, out int id);
                ListItem listItem = oList.GetItemById(id);
                this.ClientContext.Load(listItem);
                this.ClientContext.ExecuteQuery();
                return listItem;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public bool IsCarAvailable(string carId, int time, DateTime date)
        {
            try
            {
                List oList = this.ClientContext.Web.Lists.GetByTitle("Rides");
                Int32.TryParse(carId, out int id);
                FieldCollection fields = oList.Fields;
                this.ClientContext.Load(fields);
                this.ClientContext.ExecuteQuery();
                CamlQuery camlQuery = new CamlQuery();
                camlQuery.ViewXml = string.Format(@"<View>
                                                <Query>
                                                    <Where><And>
                                                        <Eq>
                                                            <FieldRef Name='Car'/>
                                                            <Value Type='Text'>{0}</Value>
                                                        </Eq></And><And>
                                                        <Eq>
                                                            <FieldRef Name='Time'/>
                                                            <Value Type='Text'>{1}</Value>
                                                        </Eq></And><And>
                                                        <Eq>
                                                            <FieldRef Name='TravelDate'/>
                                                            <Value Type='Text'>{2}</Value>
                                                        </Eq></And>
                                                    </Where>
                                                </Query>
                                                <ViewFields>
                                                    <FieldRef Name='From'/>
                                                </ViewFields>
                                             </View>", id, time, date);
                ListItemCollection itemCollection = oList.GetItems(camlQuery);
                this.ClientContext.Load(itemCollection);
                this.ClientContext.ExecuteQuery();
                if (itemCollection.Count == 0)
                    return true;

                return false;
            }
            catch (Exception ex)
            {
                return true;
            }
        }

        public ListItemCollection GetByOwnerId(string ownerId)
        {
            try
            {
                List oList = this.ClientContext.Web.Lists.GetByTitle("Rides");
                Int32.TryParse(ownerId, out int id);
                FieldCollection fields = oList.Fields;
                this.ClientContext.Load(fields);
                this.ClientContext.ExecuteQuery();
                CamlQuery camlQuery = new CamlQuery();
                camlQuery.ViewXml = string.Format(@"<View>
                                                <Query>
                                                    <Where>
                                                        <Eq>
                                                            <FieldRef Name='Owner'/>
                                                            <Value Type='Text'>{0}</Value>
                                                        </Eq>
                                                    </Where>
                                                </Query>
                                                <ViewFields>
                                                    <FieldRef Name='From'/>
                                                    <FieldRef Name='To'/>
                                                    <FieldRef Name='TravelDate'/>
                                                    <FieldRef Name='RideDate'/>
                                                    <FieldRef Name='RatePerKM'/>
                                                    <FieldRef Name='AvailableSeats'/>
                                                    <FieldRef Name='Time'/>
                                                    <FieldRef Name='Status'/>
                                                    <FieldRef Name='Owner'/>
                                                    <FieldRef Name='Car'/>
                                                    <FieldRef Name='ViaPoints'/>
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
    }
}
