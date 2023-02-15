using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;

namespace LibTrinh.Middleware
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    /// <summary>
    /// Authentication Middleware
    /// </summary>
    public class AuthenticationMiddleware
    {
        private readonly RequestDelegate _next;

        /// <summary>
        /// AuthenticationMiddleware
        /// </summary>
        /// <param name="pNext"></param>
        public AuthenticationMiddleware(RequestDelegate pNext)
        {
            _next = pNext;
        }

        /// <summary>
        /// Invoke
        /// </summary>
        /// <param name="pHttpContext"></param>
        /// <returns></returns>
        public Task Invoke(HttpContext pHttpContext)
        {
            return _next(pHttpContext);
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    /// <summary>
    /// Authentication Middleware Extensions
    /// </summary>
    public static class AuthenticationMiddlewareExtensions
    {
        /// <summary>
        /// UseAuthenticationMiddleware
        /// </summary>
        /// <param name="pBuilder"></param>
        /// <returns></returns>
        public static IApplicationBuilder UseAuthenticationMiddleware(this IApplicationBuilder pBuilder)
        {
            return pBuilder.UseMiddleware<AuthenticationMiddleware>();
        }
    }
}
