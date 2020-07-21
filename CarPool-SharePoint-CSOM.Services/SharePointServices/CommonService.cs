using Microsoft.Online.SharePoint.TenantAdministration;
using Microsoft.SharePoint.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace CarPool_SharePoint_CSOM.Services.SharePointServices
{
    public class CommonService
    {
        private static readonly string UserName ="cpt@chandraprakashtiwariv.onmicrosoft.com";
        private static readonly string Password = "Akash@98";
        private static readonly string Url = "https://chandraprakashtiwariv.sharepoint.com/sites/carpool";

        public static ClientContext GetonlineContext()
        {
            try
            {
                var securePassword = new SecureString();
                foreach (char c in Password)
                {
                    securePassword.AppendChar(c);
                }
                var onlineCredentials = new SharePointOnlineCredentials(UserName, securePassword);
                var context = new ClientContext(Url);
                context.Credentials = onlineCredentials;
                try
                {
                    Web web = context.Web;
                    context.Load(web);
                    context.ExecuteQuery();
                    return context;
                }
                catch (Exception)
                {
                    return null;
                }
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}