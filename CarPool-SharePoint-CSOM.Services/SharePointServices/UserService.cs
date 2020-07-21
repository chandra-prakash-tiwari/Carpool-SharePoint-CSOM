using CarPool_SharePoint_CSOM.Models;
using CarPool_SharePoint_CSOM.Services.SharePointInterfaces;
using Microsoft.SharePoint.Client;
using System;

namespace CarPool_SharePoint_CSOM.Services.SharePointServices
{
    public class UserService:IUserService
    {
        private ClientContext ClientContext { get; set; }
        public UserService()
        {
            this.ClientContext = CommonService.GetonlineContext();
        }
        public bool Create(Models.User user)
        {
            try
            {
                List oList = this.ClientContext.Web.Lists.GetByTitle("user");
                ListItemCreationInformation itemCreateInfo = new ListItemCreationInformation();
                ListItem oListItem = oList.AddItem(itemCreateInfo);
                oListItem["Title"] = user.Name;
                oListItem["UserName"] = user.UserName;
                oListItem["DrivingLicence"] = user.DrivingLicence;
                oListItem["Email"] = user.Email;
                oListItem["Mobile"] = user.Mobile;
                oListItem["Address"] = user.Address;
                oListItem["Password"] = user.Password;
                oListItem.Update();
                this.ClientContext.ExecuteQuery();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public ListItem Authenticate(LoginRequest credentials)
        {
            try
            {
                List oList = this.ClientContext.Web.Lists.GetByTitle("user");
                CamlQuery camlQuery = new CamlQuery();
                camlQuery.ViewXml = string.Format(@"<View>
                                                <Query>
                                                    <Where><And>
                                                        <Eq>
                                                            <FieldRef Name='UserName' />
                                                            <Value Type='Text'>{0}</Value>
                                                        </Eq>
                                                        <Eq>
                                                            <FieldRef Name='Password' />
                                                            <Value Type='Text'>{1}</Value>
                                                        </Eq></And>
                                                    </Where>
                                                </Query>
                                                <ViewFields>
                                                    <FieldRef Name='ID'/>
                                                    <FieldRef Name='Title'/>
                                                    <FieldRef Name='UserName'/>
                                                    <FieldRef Name='DrivingLicence'/>
                                                    <FieldRef Name='Email'/>
                                                    <FieldRef Name='Mobile'/>
                                                    <FieldRef Name='Address'/>
                                                </ViewFields>
                                                <RowLimit>1</RowLimit>
                                             </View>", credentials.UserName, credentials.Password);
                ListItemCollection itemCollection = oList.GetItems(camlQuery);
                this.ClientContext.Load(itemCollection);
                this.ClientContext.ExecuteQuery();
                if (itemCollection.Count == 0)
                    return null;

                else
                {
                    ListItem list = itemCollection[0];
                    return list;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }

        public bool Delete(string id)
        {
            return false;
        }

        public bool Update(Models.User updateUser)
        {
            return true;
        }

        public ListItem GetById(string userId)
        {
            try
            {
                List oList = this.ClientContext.Web.Lists.GetByTitle("user");
                CamlQuery camlQuery = new CamlQuery();
                Int32.TryParse(userId, out int id);
                camlQuery.ViewXml = string.Format(@"<View>
                                                <Query>
                                                    <Where>
                                                        <Eq>
                                                            <FieldRef Name='ID'/>
                                                            <Value Type='Text'>{0}</Value>
                                                        </Eq>
                                                    </Where>
                                                </Query>
                                                <ViewFields>
                                                    <FieldRef Name='ID'/>
                                                    <FieldRef Name='Title'/>
                                                    <FieldRef Name='UserName'/>
                                                    <FieldRef Name='DrivingLicence'/>
                                                    <FieldRef Name='Email'/>
                                                    <FieldRef Name='Mobile'/>
                                                    <FieldRef Name='Address'/>
                                                </ViewFields>
                                                <RowLimit>1</RowLimit>
                                             </View>", id);
                ListItemCollection itemCollection = oList.GetItems(camlQuery);
                this.ClientContext.Load(itemCollection);
                this.ClientContext.ExecuteQuery();
                if (itemCollection.Count == 0)
                    return null;

                else
                {
                    ListItem list = itemCollection[0];
                    return list;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public bool HasUserName(string userName)
        {
            try
            {
                List oList = this.ClientContext.Web.Lists.GetByTitle("user");
                CamlQuery camlQuery = new CamlQuery();
                camlQuery.ViewXml = string.Format(@"<View>
                                                <Query>
                                                    <Where>
                                                        <Eq>
                                                            <FieldRef Name='UserName' />
                                                            <Value Type='Text'>{0}</Value>
                                                        </Eq>
                                                    </Where>
                                                </Query>
                                                <ViewFields>
                                                    <FieldRef Name='UserName'/>
                                                    <FieldRef Name='Title'/>
                                                    <FieldRef Name='UserName'/>
                                                    <FieldRef Name='DrivingLicence'/>
                                                    <FieldRef Name='Email'/>
                                                    <FieldRef Name='Mobile'/>
                                                    <FieldRef Name='Address'/>
                                                </ViewFields>
                                                <RowLimit>1</RowLimit>
                                             </View>", userName);
                ListItemCollection itemCollection = oList.GetItems(camlQuery);
                this.ClientContext.Load(itemCollection);
                this.ClientContext.ExecuteQuery();
                if (itemCollection.Count == 0)
                    return false;
                else
                    return true;
            }
            catch (Exception)
            {
                return true;
            }
        }

        public bool HasEmail(string email)
        {
            try
            {
                List oList = this.ClientContext.Web.Lists.GetByTitle("user");
                CamlQuery camlQuery = new CamlQuery();
                camlQuery.ViewXml = string.Format(@"<View>
                                                <Query>
                                                    <Where>
                                                        <Eq>
                                                            <FieldRef Name='Email' />
                                                            <Value Type='Text'>{0}</Value>
                                                        </Eq>
                                                    </Where>
                                                </Query>
                                                <ViewFields>
                                                    <FieldRef Name='ID'/>
                                                    <FieldRef Name='Title'/>
                                                    <FieldRef Name='UserName'/>
                                                    <FieldRef Name='DrivingLicence'/>
                                                    <FieldRef Name='Email'/>
                                                    <FieldRef Name='Mobile'/>
                                                    <FieldRef Name='Address'/>
                                                </ViewFields>
                                                <RowLimit>1</RowLimit>
                                             </View>", email);
                ListItemCollection itemCollection = oList.GetItems(camlQuery);
                this.ClientContext.Load(itemCollection);
                this.ClientContext.ExecuteQuery();
                if (itemCollection.Count == 0)
                    return false;

                else
                    return true;
            }
            catch (Exception)
            {
                return true;
            }
        }
    }
}
