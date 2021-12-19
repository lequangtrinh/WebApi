using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiText.Models
{
    public class Login
    {
        public string username { get; set; }
        public string password { get; set; }
        public int id { get; set; }
        public string passnew { get; set; }
        public class DOLOGIN{
            public int ResponseCode { get; set; }
        }
    }
}
