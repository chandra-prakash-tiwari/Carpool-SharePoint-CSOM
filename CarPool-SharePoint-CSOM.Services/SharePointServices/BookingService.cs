using CarPool_SharePoint_CSOM.Models;
using CarPool_SharePoint_CSOM.Services.SharePointInterfaces;
using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;

namespace CarPool_SharePoint_CSOM.Services.SharePointServices
{
    public class BookingService:IBookingService
    {
        private ClientContext ClientContext { get; set; }

        public BookingService()
        {
            this.ClientContext = CommonService.GetonlineContext();
        }
        public bool Create(Booking booking)
        {
            try
            {
                List oList = this.ClientContext.Web.Lists.GetByTitle("");
                ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
                ListItem oListItem = oList.AddItem(itemCreateInfo);
                oListItem["From"] = booking.From;
                oListItem["To"] = booking.To;
                oListItem["TravelDate"] = booking.TravelDate;
                oListItem["BookingDate"] = booking.BookingDate;
                oListItem["Time"] = booking.Time;
                oListItem["Status"] = booking.Status;
                oListItem["NoofSeats"] = booking.NoofSeats;
                oListItem["Ride"] = booking.RideId;
                oListItem["Booker"] = booking.BookerId;
                oListItem.Update();
                this.ClientContext.ExecuteQuery();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool Cancel(string id)
        {
            return true;
        }

        public ListItemCollection Status(string id)
        {
            return null;
        }

        public bool Response(string id, BookingStatus status)
        {
            return true;
        }

        public string GetRequesterById(string id)
        {
            return "abc";
        }

        public ListItemCollection GetByUserId(string userId)
        {
            try
            {
                List oList = this.ClientContext.Web.Lists.GetByTitle("Bookings");
                Int32.TryParse(userId, out int id);
                FieldCollection fields = oList.Fields;
                this.ClientContext.Load(fields);
                this.ClientContext.ExecuteQuery();
                CamlQuery camlQuery = new CamlQuery();
                camlQuery.ViewXml = string.Format(@"<View>
                                                <Query>
                                                    <Where>
                                                        <Eq>
                                                            <FieldRef Name='Booker'/>
                                                            <Value Type='Text'>{0}</Value>
                                                        </Eq>
                                                    </Where>
                                                </Query>
                                                <ViewFields>
                                                    <FieldRef Name='Id'/>
                                                    <FieldRef Name='From'/>
                                                    <FieldRef Name='To'/>
                                                    <FieldRef Name='TravelDate'/>
                                                    <FieldRef Name='NoofSeats'/>
                                                    <FieldRef Name='RatePerKM'/>
                                                    <FieldRef Name='Ride'/>
                                                    <FieldRef Name='Time'/>
                                                    <FieldRef Name='Status'/>
                                                    <FieldRef Name='Booker'/>
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

        public ListItemCollection GetAllByRideId(string rideId)
        {
            try
            {
                List oList = this.ClientContext.Web.Lists.GetByTitle("Bookings");
                Int32.TryParse(rideId, out int id);
                FieldCollection fields = oList.Fields;
                this.ClientContext.Load(fields);
                this.ClientContext.ExecuteQuery();
                CamlQuery camlQuery = new CamlQuery();
                camlQuery.ViewXml = string.Format(@"<View>
                                                <Query>
                                                    <Where>
                                                        <Eq>
                                                            <FieldRef Name='Ride'/>
                                                            <Value Type='Text'>{0}</Value>
                                                        </Eq>
                                                    </Where>
                                                </Query>
                                                <ViewFields>
                                                    <FieldRef Name='Id'/>
                                                    <FieldRef Name='From'/>
                                                    <FieldRef Name='To'/>
                                                    <FieldRef Name='TravelDate'/>
                                                    <FieldRef Name='NoofSeats'/>
                                                    <FieldRef Name='RatePerKM'/>
                                                    <FieldRef Name='Ride'/>
                                                    <FieldRef Name='Time'/>
                                                    <FieldRef Name='Status'/>
                                                    <FieldRef Name='Booker'/>
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

        public ListItemCollection RequestPending(string rideId)
        {
            return null;
        }

        public ListItem GetById(string bookingId)
        {
            return null;
        }

        public ListItemCollection GetByRideId(string rideId, string bookerId)
        {
            return null;
        }
    }
}
