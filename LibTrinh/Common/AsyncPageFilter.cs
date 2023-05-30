using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace LibTrinh.Common
{
    public class AsyncPageFilter  :IAsyncActionFilter
    {
        private readonly IConfiguration _config;
        public AsyncPageFilter(IConfiguration config)
        {
            _config = config;
        }
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var isPass = true;
            if (context.HttpContext.Request.Method == "GET")
            {
                var path = context.HttpContext.Request.Path;
                if (path != "/Login/Login" && path != "/Shared/_Layout")
                {
                    if (CheckPermission(path, context.HttpContext))
                    {
                        isPass = false;
                    }

                }
            }
            if (isPass) await next.Invoke();
            else return;
        }
        private bool CheckPermission(string path, HttpContext httpContext)
        {
            return PermissionPage.CheckPermissionPageByMenu(httpContext, path);
        }
    }
}
