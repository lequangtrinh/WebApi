using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Threading.Tasks;

namespace LibTrinh.Common
{
    public class AsyncPageFilter : IAsyncPageFilter
    {
        private readonly IConfiguration _config;
        public AsyncPageFilter(IConfiguration config)
        {
            _config = config;
        }

        public Task OnPageHandlerSelectionAsync(PageHandlerSelectedContext context)
        {
            return Task.CompletedTask;
        }

        public async Task OnPageHandlerExecutionAsync(PageHandlerExecutingContext context, PageHandlerExecutionDelegate next)
        {
            var isPass = true;
            if (context.HttpContext.Request.Method == "GET")
            {
                var path = context.HttpContext.Request.Path;
                if (path != "/Login/Login" && path != "/Shared/_Layout")
                    //{
                    //    if (Session.GetSession(context.HttpContext.Session, "Token") == null)
                    //    {
                    //        isPass = false;
                    //    }
                    //    else
                    //    {
                    //        if (CheckPermission(path, context.HttpContext))
                    //        {
                    //            isPass = false;
                    //        }
                    //    }
                    //}
                    if (CheckPermission(path, context.HttpContext))
                    {
                        isPass = false;
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
