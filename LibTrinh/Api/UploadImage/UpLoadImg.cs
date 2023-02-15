using AutoMapper;
using Microsoft.Extensions.Configuration;
using LibTrinh.Common;
using Microsoft.AspNetCore.Http;
using LibTrinh.Models;

namespace LibTrinh.Api.UploadImage
{
    public class UpLoadImg : BusinessService, IUpLoadImg
    {
        protected IConfiguration _config { get; }
        private readonly ITokenService _tokenService;
        private string _PathImg;
        public UpLoadImg(IConfiguration pConfiguration, IBaseDbContext pContext
                            , IMapper pMapper, IHttpContextAccessor pHttpContext, ITokenService tokenService) : base(pContext, pMapper, pHttpContext)
        {
            _config = pConfiguration;
            _tokenService = tokenService;
            _PathImg = Path.Combine(AppDomain.CurrentDomain.BaseDirectory.Replace("bin\\Debug\\net6.0\\", "") + _config["Path:ForFront:ImagePath"].ToString());
        }

        /// <summary>
        /// UpInstImg
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        /// <exception cref="NotImplementedException"></exception>
        public string UpInstImg(CFaUserRegisDTO onjData)
        {
            try
            {
                if (!Directory.Exists(_PathImg))
                { 
                    Directory.CreateDirectory(_PathImg);
                }
                var imgConvert = Convert.FromBase64String(onjData.pathImage.Substring(onjData.pathImage.LastIndexOf(',') + 1));
                string pathImg = Path.Combine(_PathImg,onjData.Image);
                if (Directory.Exists(pathImg))
                {
                    return onjData.Image;
                }
                System.IO.File.WriteAllBytes(pathImg, imgConvert);
                return onjData.Image;
            }
            catch(Exception ex)
            {
                _fileLogger.Error(ex.Message);
                return null;
            }
        }
        //// Resize Image
        //public static string ResizeImage(byte[] byteArrayIn, int width, int height)
        //{
        //    byte[] byteImage = ResizeImage_Byte(byteArrayIn, width, height);
        //    var SigBase64 = Convert.ToBase64String(byteImage);
        //    return SigBase64;
        //}
        //public static byte[] ResizeImage_Byte(byte[] byteArrayIn, int width, int height)
        //{
        //    using (var ms = new MemoryStream(byteArrayIn))
        //    {
        //        Image image = Image.FromStream(ms);
        //        var destRect = new Rectangle(0, 0, width, height);
        //        var destImage = new Bitmap(width, height);
        //        destImage.SetResolution(image.HorizontalResolution, image.VerticalResolution);
        //        using (var graphics = Graphics.FromImage(destImage))
        //        {
        //            graphics.CompositingMode = CompositingMode.SourceCopy;
        //            graphics.CompositingQuality = CompositingQuality.HighQuality;
        //            graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
        //            graphics.SmoothingMode = SmoothingMode.HighQuality;
        //            graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

        //            using (var wrapMode = new ImageAttributes())
        //            {
        //                wrapMode.SetWrapMode(WrapMode.TileFlipXY);
        //                graphics.DrawImage(image, destRect, 0, 0, image.Width, image.Height, GraphicsUnit.Pixel, wrapMode);
        //            }
        //        }
        //        Bitmap bImage = destImage;
        //        System.IO.MemoryStream ms1 = new MemoryStream();
        //        bImage.Save(ms1, ImageFormat.Jpeg);
        //        byte[] byteImage = ms1.ToArray();
        //        return byteImage;
        //    }
        //}
    }
}
