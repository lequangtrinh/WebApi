using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibTrinh.Models
{
    /// <summary>
    /// PriceServicesDTO    
    /// </summary>
    public class CFaPriceServicesDTO
    {
        public string CodeServices { get; set; }
        public string Name { get; set; }
        public string Price { get; set; }
        public string Images { get; set; }
        public string CreateDate { get; set; }
        public string UpdateDate { get; set; }
        public string UserUpdate { get; set; }
    }

    public class CFaSearchPriceServicesDTO
    {
        //public string CodeServices { get; set; }
        //public string Name { get; set; }
        //public string Price { get; set; }
        //public string CreateDate { get; set; }
        public string UserUpdate { get; set; }
    }
}
