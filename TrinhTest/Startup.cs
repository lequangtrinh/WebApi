using LibTrinh;
using System.Text;
using LibTrinh.Common;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.Cookies;
using AspNetCoreRateLimit;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using WebMarkupMin.AspNetCore6;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
//using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
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
            services.AddSignalR();

            services.Configure<SetupOptions>(Configuration.GetSection("Setup"));
            services.Configure<KestrelServerOptions>(
                op => op.Limits.MaxRequestBodySize = 300000000);
            services.Configure<IISServerOptions>(
                op=>op.MaxRequestBodySize=300000000);
            #region Regis Service Design 
            services.AddTransient<ITokenService, TokenService>();
            services.AddScoped<IBaseDbContext, BaseDbContext>();
            services.AddScoped<IRabitMQ, RabitMQ>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddBussiness();
            #endregion
            services.AddControllers(options => options.SuppressAsyncSuffixInActionNames = false).AddNewtonsoftJson();
            services.AddResponseCaching();
            var xx = Configuration.GetSection("Authentication:ClientID");
            services.AddAuthentication(options =>
            {
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            })
             .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme)
             .AddJwtBearer(
                 options =>
                 {
                     options.TokenValidationParameters = new TokenValidationParameters
                     {
                         ValidateIssuerSigningKey = true,
                         IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration.GetSection("Jwt").GetSection("SecretKey").Value)),
                         ValidateIssuer = true,
                         ValidateAudience = true,
                         ValidateLifetime = true,
                         ValidIssuer = Configuration.GetSection("JWT").GetSection("Issuer").Value,
                         ValidAudience = Configuration.GetSection("JWT").GetSection("Issuer").Value
                     };
                 });
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
            services.AddRazorPages().AddRazorPagesOptions(options => { }).AddNewtonsoftJson().AddMvcOptions(options =>
            {
                options.Filters.Add(new AsyncPageFilter(Configuration));
            });
            services.AddOutputCaching();
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
            #endregion
            #region RUNTIME VIEWS CODE
            services.AddRazorPages();
            services.AddControllersWithViews().AddRazorRuntimeCompilation();
            #endregion
            #region execute cache 
            services.AddDistributedMemoryCache();
            services.AddOptions();
            services.AddStackExchangeRedisCache(options =>
            {
                options.InstanceName = "T_";
                options.Configuration = Configuration.GetSection("Redis")["ConnectionString"];
            });
            #endregion
            //services.Configure<IISServerOptions>(options => { options.AllowSynchronousIO = true; });
            #region LimitRate user call api
            services.Configure<IpRateLimitOptions>(Configuration.GetSection("IpRateLimiting"));
            services.Configure<IpRateLimitPolicies>(Configuration.GetSection("IpRateLimitPolicies"));
            services.AddInMemoryRateLimiting();
            services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
            services.AddSingleton<IIpPolicyStore, DistributedCacheIpPolicyStore>();
            services.AddSingleton<IRateLimitCounterStore, DistributedCacheRateLimitCounterStore>();

            #endregion
            
            services.AddAntiforgery(o => o.HeaderName = "XSRF-TOKEN");
        }

        /// <summary>
        /// build web Configure
        /// </summary>
        /// <param name="app"></param>
        /// <param name="env"></param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory pLoggerFactory)
        {
            // Configure the HTTP request pipeline.
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseWebMarkupMin();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            };
            app.UseAuthentication();
            //pLoggerFactory.AddLog4Net();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
           app.UseIpRateLimiting();
            app.UseDefaultFiles();
            app.UseRouting();
            app.UseAuthorization();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseEndpoints(endpoints =>
            {
                //endpoints.MapControllerRoute(
                //  name: "default",
                //  pattern: "{controller}/{action}/{id?}",
                //  defaults: new { controller = "Home", action = "Index" }
                //);
                if (env.IsDevelopment())
                {
                    endpoints.MapControllerRoute(
                        name: "default",
                        pattern: "{controller}/{action}/{id?}",
                        defaults: new { controller = "Home", action = "Index" });
                    endpoints.MapControllerRoute(
                      name: "api",
                      pattern: "api/{controller}/{action}/{id?}",
                      defaults: new { controller = "Home", action = "Index" }
                    );

                }
                else
                {
                    endpoints.MapControllerRoute(
                      name: "default",
                      pattern: "{controller}/{action}/{id?}",
                      defaults: new { controller = "Home", action = "Index" });
                }
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
            if (KEYCODE != null) await GlobalBase.System_Start(KEYCODE.ToString(), Configuration);
        }
    }
}
