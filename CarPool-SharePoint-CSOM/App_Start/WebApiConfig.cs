using CarPool_SharePoint_CSOM.Services.ClientInterfaces;
using CarPool_SharePoint_CSOM.Services.ClientServices;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace CarPool_SharePoint_CSOM
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.EnableCors();
        }
    }
}
