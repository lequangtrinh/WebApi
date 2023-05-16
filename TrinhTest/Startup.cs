using LibTrinh;
using System.Text;
using LibTrinh.Common;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.Cookies;
using AspNetCoreRateLimit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Server.Kestrel.Core;
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
            //services.AddControllers(options => options.SuppressAsyncSuffixInActionNames = false).AddNewtonsoftJson();
            //services.AddResponseCaching();
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
                     options.Events = new JwtBearerEvents
                     {
                         OnMessageReceived = context =>
                         {
                             context.Token = context.Request.Cookies["X-Access-Token"];
                             return Task.CompletedTask;
                         },
                     };
                 });

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
            #region execute cache Redis 
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
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            };
            app.UseAuthentication();
            pLoggerFactory.AddLog4Net();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
           app.UseIpRateLimiting();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseAuthorization();
            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapRazorPages();
                if (env.IsDevelopment())
                {
                    endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                    endpoints.MapControllers().WithMetadata(new AllowAnonymousAttribute());
                }
                else
                {
                    endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
                    endpoints.MapControllers();
                }
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
