﻿using LibTrinh;
using System.Text;
using LibTrinh.Common;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.Cookies;
using AspNetCoreRateLimit;
using WebMarkupMin.AspNetCore6;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Razor;
using static LibTrinh.Common.GlobalBase;
using Microsoft.AspNetCore.Authentication;

namespace TrinhTest
{
    /// <summary>
    /// Startup
    /// </summary>
    public class Startup
    {
        /// <summary>
        /// Cunstructor
        /// </summary>
        /// <param name="env"></param>
        /// <param name="configuration"></param>
        public Startup(IWebHostEnvironment env, IConfiguration configuration)
        {
            Configuration = configuration;
            CurrentEnvironment = env;
        }

        public IConfiguration Configuration { get; }
        private IWebHostEnvironment CurrentEnvironment { get; set; }

        /// <summary>
        /// call Services
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<SetupOptions>(Configuration.GetSection("Setup"));
            #region Regis Service Design 
            services.AddTransient<ITokenService, TokenService>();
            services.AddScoped<IBaseDbContext, BaseDbContext>();
            services.AddScoped<IRabitMQ, RabitMQ>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddBussiness();
            #endregion
            services.AddControllers(options => options.SuppressAsyncSuffixInActionNames = false).AddNewtonsoftJson();
            services.AddResponseCaching();

            services.AddAuthentication("BearerAuthentication")
             .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BearerAuthentication", null)
             #region login authen google and facabook
            //.AddGoogle(options =>
            //{
            //    IConfigurationSection googleAuthNSection =
            //    Configuration.GetSection("Authentication:Google");
            //    options.ClientId = googleAuthNSection[Configuration.GetSection("Authentication:ClientID").ToString()];
            //    options.ClientSecret = googleAuthNSection[Configuration.GetSection("Authentication:ClientSecret").ToString()];
            //    //options.CallbackPath=""
            //});

            //.AddFacebook(options =>
            //{
            //    IConfigurationSection FBAuthNSection =
            //    config.GetSection("Authentication:FB");
            //    options.ClientId = FBAuthNSection["ClientId"];
            //    options.ClientSecret = FBAuthNSection["ClientSecret"];
            //});
            #endregion;
            services.AddResponseCompression(options =>
            {
                options.EnableForHttps = true;
                options.MimeTypes = new[] { "text/plain",
                        "text/css",
                        "application/javascript",
                        "text/html",
                        "application/xml",
                        "text/xml",
                        "application/json",
                        "text/json"};
            });
            services.AddWebMarkupMin(options =>
            {
                options.AllowMinificationInDevelopmentEnvironment = true;
                options.AllowCompressionInDevelopmentEnvironment = true;
                options.DisableMinification = false;
                options.DisableCompression = false;
                options.DisablePoweredByHttpHeaders = true;
            }).AddHtmlMinification(options =>
            {
                options.MinificationSettings.RemoveHttpProtocolFromAttributes = false;
                options.MinificationSettings.RemoveHttpsProtocolFromAttributes = false;
                options.MinificationSettings.WhitespaceMinificationMode = WebMarkupMin.Core.WhitespaceMinificationMode.Safe;
                options.MinificationSettings.RemoveRedundantAttributes = false;
                options.MinificationSettings.RemoveTagsWithoutContent = false;
                options.MinificationSettings.PreserveCase = true;
                options.MinificationSettings.RemoveEmptyAttributes = false;
                options.MinificationSettings.RemoveOptionalEndTags = false;
                options.MinificationSettings.MinifyEmbeddedCssCode = true;
                options.MinificationSettings.MinifyInlineCssCode = true;
                options.MinificationSettings.MinifyEmbeddedJsonData = true;
                options.MinificationSettings.EmptyTagRenderMode = WebMarkupMin.Core.HtmlEmptyTagRenderMode.Slash;

            }).AddHttpCompression();
            services.AddOutputCaching();
            #region execute cache 
            services.AddDistributedMemoryCache();
            services.AddOptions();
            services.AddStackExchangeRedisCache(options =>
            {
                options.InstanceName = "T_";
                options.Configuration = Configuration.GetSection("Redis")["ConnectionString"];
            });
            #endregion
           
            #region LimitRate user call api
            services.Configure<IpRateLimitOptions>(Configuration.GetSection("IpRateLimiting"));
            services.Configure<IpRateLimitPolicies>(Configuration.GetSection("IpRateLimitPolicies"));
            services.AddInMemoryRateLimiting();
            services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
            services.AddSingleton<IIpPolicyStore, DistributedCacheIpPolicyStore>();
            services.AddSingleton<IRateLimitCounterStore, DistributedCacheRateLimitCounterStore>();
            #endregion
            services.AddRazorPages().AddRazorPagesOptions(options => { }).AddNewtonsoftJson().AddMvcOptions(options =>
            {
              // options.Filters.Add(new AsyncPageFilter(Configuration));
            });

            services.Configure<IISServerOptions>(options => { options.AllowSynchronousIO = true; });
            services.AddSignalR();
            services.AddAntiforgery(o => o.HeaderName = "XSRF-TOKEN");
            services.AddControllersWithViews().AddRazorRuntimeCompilation();
        }

        /// <summary>
        /// build web Configure
        /// </summary>
        /// <param name="app"></param>
        /// <param name="env"></param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory pLoggerFactory)
        {
            // Configure the HTTP request pipeline.
            if (bool.Parse(Configuration["IsProductEnviroment"]))
            {
                app.UseResponseCompression();
                app.UseWebMarkupMin();
            }
            app.UseIpRateLimiting();
            if (env.IsDevelopment()){app.UseDeveloperExceptionPage();}
            else{app.UseExceptionHandler("/Error");app.UseHsts();};
            //pLoggerFactory.AddLog4Net();
            app.UseDefaultFiles();// mặc định là file index.hmtl luôn đặt trước staticFiles().
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                  name: "default",
                  pattern: "{controller}/{action}/{id?}",
                  defaults: new { controller = "Home", action = "Index" }
                );
                endpoints.MapControllerRoute(
                  name: "api",
                  pattern: "api/{controller}/{action}/{id?}",
                  defaults: new { controller = "Home", action = "Index" }
                );
                endpoints.MapRazorPages();
                endpoints.MapHub<MessagesHub>("/MessagesHub");

            });
            Initialize_Application();
        }

        /// <summary>
        /// Initialize_Application connect DB
        /// </summary>
        private async void Initialize_Application()
        {
            var KEYCODE = Configuration.GetValue<string>("DATA:KEYCODE");
            if (KEYCODE != null) await GlobalBase.Global.System_Start(KEYCODE.ToString(), Configuration);
        }
    }
}
