using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApiText.DataAccess;
namespace ApiText.Models
{
    public class ResultStatus
    {
        private static DATA data = new DATA();
        public string DoLogin(LoginDO d)
        {
            ResponseResult rs = new ResponseResult();
            var res = data.DoLogin(d.username, d.password);
            if (res.ResponseCode != 0)
            {

                rs.Returncode = ResponseCodeRes.Success.GetHashCode();
                rs.ReturnMessage = "Đăng nhập thành công";
            }
            else
            {
                rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                rs.ReturnMessage = "Đăng nhập thất bại";
            }
            string js = CONVERJS.convert(rs);
            return js;
        }
        public string Insert_Login(Login lg)
        {
            ResponseResult rs = new ResponseResult();
            if(string.IsNullOrEmpty(lg.username))
            {
                rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                rs.ReturnMessage = "Tên tài khoản không được để trống";
            }
            else if(string.IsNullOrEmpty(lg.password))
            {
                rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                rs.ReturnMessage = "Vui lòng nhập mật khẩu";
            }
            else
            {
                var res = data.InsertLogGin(lg.username, lg.password);
                if(res.ResponseCode != 0)
                {
                    rs.Returncode = ResponseCodeRes.Success.GetHashCode();
                    rs.ReturnMessage = "Thêm thành công";
                }
                else
                {
                    rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                    rs.ReturnMessage = "Thêm thất bại";
                }
            }
            return CONVERJS.convert(rs);
        }
        public string Update_Login(Login lg)
        {
            ResponseResult rs = new ResponseResult();
            if (string.IsNullOrEmpty(lg.username))
            {
                rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                rs.ReturnMessage = "Tên tài khoản không được để trống";
            }
            else if (string.IsNullOrEmpty(lg.password))
            {
                rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                rs.ReturnMessage = "Vui lòng nhập mật khẩu";
            }
            else
            {
                var res = data.UpdateLogin(lg.id,lg.username, lg.password);
                if (res.ResponseCode != 0)
                {
                    rs.Returncode = ResponseCodeRes.Success.GetHashCode();
                    rs.ReturnMessage = "Update Tài Khoản thành công";
                }
                else
                {
                    rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                    rs.ReturnMessage = "Update Tài Khoản thất bại";
                }
            }
            return CONVERJS.convert(rs);
        }
        public string Update_LoginPassNew(Login lg)
        {
            ResponseResult rs = new ResponseResult();
            if (string.IsNullOrEmpty(lg.username))
            {
                rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                rs.ReturnMessage = "Tên tài khoản không được để trống";
            }
            else if (string.IsNullOrEmpty(lg.password))
            {
                rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                rs.ReturnMessage = "Vui lòng nhập mật khẩu";
            }
            else if (string.IsNullOrEmpty(lg.passnew))
            {
                rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                rs.ReturnMessage = "Vui lòng nhập mật khẩu mới";
            }
            else
            {
                var res = data.UpdateLoginPassNew(lg.id, lg.username, lg.password,lg.passnew) ;
                if (res.ResponseCode != 0)
                {
                    rs.Returncode = ResponseCodeRes.Success.GetHashCode();
                    rs.ReturnMessage = "Đổi mật khẩu thành công";
                }
                else
                {
                    rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                    rs.ReturnMessage = "Đổi mật khẩu Tài Khoản thất bại";
                }
            }
            return CONVERJS.convert(rs);
        }
        public string Delete_Login(int id)
        {
            ResponseResult rs = new ResponseResult();
                var res = data.DeleteLogin(id);
                if (res.ResponseCode != 0)
                {
                    rs.Returncode = ResponseCodeRes.Success.GetHashCode();
                    rs.ReturnMessage = "Xóa tài khoản thành công";
                }
                else
                {
                    rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                    rs.ReturnMessage = "Xóa Tài Khoản thất bại vui lòng kiểm tra thông tin";
                }
            return CONVERJS.convert(rs);
        }
        public string Delete_Certory(int id)
        {
            ResponseResult rs = new ResponseResult();
            var res = data.DeleteCertory(id);
            if (res.ResponseCode != 0)
            {
                rs.Returncode = ResponseCodeRes.Success.GetHashCode();
                rs.ReturnMessage = "Xóa thành công";
            }
            else
            {
                rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                rs.ReturnMessage = "Xóa thất bại vui lòng kiểm tra thông tin";
            }
            return CONVERJS.convert(rs);
        }
        public string Insert_Produce(Procuder pro)
        {
            ResponseResult rs = new ResponseResult();
            if (pro.emp_id !=0){
                var resckeck = data.CkeckEmp_id_Category(pro.emp_id);
                if (resckeck.ResponseCode != 0)
                {
                    if (string.IsNullOrEmpty(pro.masp))
                    {
                        rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                        rs.ReturnMessage = "Vui lòng nhập mã sản phẩm";
                    }
                    else if (string.IsNullOrEmpty(pro.tensp))
                    {
                        rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                        rs.ReturnMessage = "Vui lòng nhập tên sản phẩm";
                    }
                    var res = data.InsertProcuder(pro.emp_id, pro.masp, pro.tensp);
                    if (res.ResponseCode != 0)
                    {
                        rs.Returncode = ResponseCodeRes.Success.GetHashCode();
                        rs.ReturnMessage = "Thêm thành công";
                    }
                    else
                    {
                        rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                        rs.ReturnMessage = "Thêm thất bại vui lòng kiểm tra thông tin";
                    }
                }
                else
                {
                    rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                    rs.ReturnMessage = "danh mục này không tồn tại";
                }
            }
            else
            {
                rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                rs.ReturnMessage = "vui lòng nhập id danh mục";
            }
            return CONVERJS.convert(rs);
        }
        public string Update_Produder(Procuder pro)
        {
            ResponseResult rs = new ResponseResult();
            if (pro.emp_id != 0)
            {
                var resckeck = data.CkeckEmp_id_Category(pro.emp_id);
                if (resckeck.ResponseCode != 0)
                {
                    if (string.IsNullOrEmpty(pro.masp))
                    {
                        rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                        rs.ReturnMessage = "Vui lòng nhập mã sản phẩm";
                    }
                    else if (string.IsNullOrEmpty(pro.tensp))
                    {
                        rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                        rs.ReturnMessage = "Vui lòng nhập tên sản phẩm";
                    }
                    var res = data.UpdateProcuder(pro);
                    if (res.ResponseCode != 0)
                    {
                        rs.Returncode = ResponseCodeRes.Success.GetHashCode();
                        rs.ReturnMessage = "Sửa thành công";
                    }
                    else
                    {
                        rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                        rs.ReturnMessage = "thất bại vui lòng kiểm tra thông tin";
                    }
                }
                else
                {
                    rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                    rs.ReturnMessage = "danh mục này không tồn tại";
                }
            }
            else
            {
                rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                rs.ReturnMessage = "vui lòng nhập id danh mục";
            }
            return CONVERJS.convert(rs);
        }
        public string Delete_Produder(int id)
        {
            ResponseResult rs = new ResponseResult();
            var res = data.DeleteProcuder(id);
            if (res.ResponseCode != 0)
            {
                rs.Returncode = ResponseCodeRes.Success.GetHashCode();
                rs.ReturnMessage = "Xóa thành công";
            }
            else
            {
                rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                rs.ReturnMessage = "Xóa thất bại vui lòng kiểm tra thông tin";
            }
            return CONVERJS.convert(rs);
        }
        public string Update_Catory(Certory cr)
        {
            ResponseResult rs = new ResponseResult();
            if (string.IsNullOrEmpty(cr.masp))
            {
                rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                rs.ReturnMessage = "mã sản phẩm không được để trống";
            }
            else if (string.IsNullOrEmpty(cr.tensp))
            {
                rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                rs.ReturnMessage = "Vui lòng nhập ten sản phẩm";
            }
            else
            {
                var res = data.UpdateCertory(cr.id, cr.masp, cr.tensp);
                if (res.ResponseCode != 0)
                {
                    rs.Returncode = ResponseCodeRes.Success.GetHashCode();
                    rs.ReturnMessage = "Update sản phẩm thành công";
                }
                else
                {
                    rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                    rs.ReturnMessage = "Update sản phẩm thất bại";
                }
            }
            return CONVERJS.convert(rs);
        }
        public string Insert_Catory(Certory cr)
        {
            ResponseResult rs = new ResponseResult();
            if (string.IsNullOrEmpty(cr.masp))
            {
                rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                rs.ReturnMessage = "mã sản phẩm không được để trống";
            }
            else if (string.IsNullOrEmpty(cr.tensp))
            {
                rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                rs.ReturnMessage = "Vui lòng nhập ten sản phẩm";
            }
            else
            {
                var res = data.InsertCertory(cr.masp, cr.tensp);
                if (res.ResponseCode != 0)
                {
                    rs.Returncode = ResponseCodeRes.Success.GetHashCode();
                    rs.ReturnMessage = "thêm sản phẩm thành công";
                }
                else
                {
                    rs.Returncode = ResponseCodeRes.Failed.GetHashCode();
                    rs.ReturnMessage = "thêm sản phẩm thất bại";
                }
            }
            return CONVERJS.convert(rs);
        }
    }
}
