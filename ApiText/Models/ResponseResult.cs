using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiText.Models
{
    public class ResponseResult
    {
        public int Returncode { get; set; }//kết quả trả vè
        public string ReturnMessage { get; set; }//show trạng thái thông báo
        public object Data { get; set; }//trả về kết quả
        public int ResponseCode { get; set; }
    }
}
