using System.Web;
using System.Web.Mvc;

namespace CarPool_SharePoint_CSOM
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
