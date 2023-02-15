using LibTrinh.Common;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace LibTrinh
{
    /// <summary>
    /// LibRCLServiceCollection
    /// </summary>
    public static class LibRCLServiceCollection
    {
        /// <summary>
        /// RegisterBussinessServices 
        /// </summary>
        /// <param name="services"></param>
        /// <param name="lifetime"></param>
        public static void RegisterBussinessServices(this IServiceCollection services,
           ServiceLifetime lifetime = ServiceLifetime.Transient)
        {
            var assemblies = Assembly.GetCallingAssembly();
            var typesFromAssemblies = assemblies.DefinedTypes.Where(x => x.IsClass && x.GetInterfaces().Any(t => t.IsAssignableFrom(typeof(IBusinessService))));
            foreach (var type in typesFromAssemblies)
                services.Add(new ServiceDescriptor(type.GetInterfaces().FirstOrDefault(), type, lifetime));
        }
    }
}
