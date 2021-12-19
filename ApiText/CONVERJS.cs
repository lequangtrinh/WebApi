using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ApiText
{
    public class CONVERJS
    {
        public static string convert<T>(T t)
        {
            return JsonConvert.SerializeObject(t);
        }


        public static Stream ReturnResult(string strResult)
        {
            var resultBytes = Encoding.UTF8.GetBytes(strResult);
            return new MemoryStream(resultBytes);
        }
    }
}
