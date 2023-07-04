using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace LibTrinh
{
    /// <summary>
    /// DependencyInjection
    /// </summary>
    public static class DependencyInjection
    {
        /// <summary>
        /// AddBussiness
        /// </summary>
        /// <param name="pServices"></param>
        /// <returns></returns>
        public static IServiceCollection AddBussiness(this IServiceCollection pServices)
        {
            pServices.AddMemoryCache();

            var assemblies = new List<Assembly>();
            string strAssemblyFolder = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);
            foreach (var path in Directory.GetFiles(strAssemblyFolder, "*.dll"))
            {
                assemblies.Add(Assembly.LoadFrom(path));
            }
            pServices.AddAutoMapper(assemblies);

            pServices.RegisterBussinessServices();

            return pServices;
        }

    }
}
