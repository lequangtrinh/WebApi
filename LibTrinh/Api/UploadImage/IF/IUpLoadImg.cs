using LibTrinh.Common;
using LibTrinh.Models;

namespace LibTrinh.Api.UploadImage
{
    /// <summary>
    /// IUpLoadImg
    /// </summary>
    public interface IUpLoadImg: IBusinessService
    {
        /// <summary>
        /// UpInstImg
        /// </summary>
        /// <param name="objData"></param>
        /// <returns></returns>
        string UpInstImg(CFaUserRegisDTO objData);
    }
}
