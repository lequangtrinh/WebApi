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
    }

    /// <summary>
    /// PriceServicesDTO    
    /// </summary>
    public class CFaPaginPriceServicesDTO
    {
        public List<CFaPriceServicesDTO> lstPriceServicesDTO = new List<CFaPriceServicesDTO>();
        public int CountData { get; set; }
    }
}
