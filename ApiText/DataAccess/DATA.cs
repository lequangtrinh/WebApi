using ApiText.Models;
using LIB.CONNECT;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using static ApiText.Models.Login;
using static ApiText.Models.Procuder;

namespace ApiText.DataAccess
{
    public class DATA
    {

        public List<Login> GetLoginLoad(int id,string key)
        {
            try
            {
                var lp = new List<SqlParameter>
                    {
                        new SqlParameter("@id",id),
                         new SqlParameter("@key",key),
                    };
                return LIB.CONNECT.CONNECT.ExecuteSPList<Login>("LoginLoad", lp);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public ResponseResult InsertLogGin(string username,string pass)
        {
            try
            {
                var lp = new List<SqlParameter>
                {
                    new SqlParameter("@id","0"),
                    new SqlParameter("@username",username),
                    new SqlParameter("@pass",pass),
                    new SqlParameter("@type","insert"),
                };
                return LIB.CONNECT.CONNECT.ExecuteSP<ResponseResult>("LoginExecute", lp);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
         public ResponseResult CkeckEmp_id_Category(int id)
        {
            try
            {
                var lp = new List<SqlParameter>
                {
                    new SqlParameter("@EMP_ID",id),
                };
                return LIB.CONNECT.CONNECT.ExecuteSP<ResponseResult>("ProductCkeckempidCatetory", lp);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public DOLOGIN DoLogin(string username, string password)
        {
            var lp = new List<SqlParameter>
                {
                    new SqlParameter("@username",username),
                    new SqlParameter("@pass",password),
                };
            return LIB.CONNECT.CONNECT.ExecuteSP<DOLOGIN>("LoginDO", lp);
        }
        public ResponseResult UpdateLogin(int id,string uname, string pass)
        {
            try
            {
                var lp = new List<SqlParameter>
                {
                    new SqlParameter("@id",id),
                    new SqlParameter("@username",uname),
                    new SqlParameter("@pass",pass),
                    new SqlParameter("@type","update"),
                };
                return LIB.CONNECT.CONNECT.ExecuteSP<ResponseResult>("LoginExecute", lp);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public ResponseResult UpdateLoginPassNew(int id)
        {
            try
            {
                var lp = new List<SqlParameter>
                {
                    new SqlParameter("@id",id),
                };
                return LIB.CONNECT.CONNECT.ExecuteSP<ResponseResult>("UpdateLoginPass", lp);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public ResponseResult DeleteLogin(int id)
        {
            try
            {
                var lp = new List<SqlParameter>
                {
                    new SqlParameter("@id",id),
                    new SqlParameter("@username",""),
                    new SqlParameter("@pass",""),
                    new SqlParameter("@type","delete"),
                };
                return LIB.CONNECT.CONNECT.ExecuteSP<ResponseResult>("LoginExecute", lp);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<Certory> GetCertoryLoad(int id,string key)
        {
            try
            {
                var lp = new List<SqlParameter>
                    {
                        new SqlParameter("@id",id),
                        new SqlParameter("@key",key)
                    };
                return LIB.CONNECT.CONNECT.ExecuteSPList<Certory>("CategoryLoad", lp);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public ResponseResult DeleteCertory(int id)
        {
            try
            {
                var lp = new List<SqlParameter>
                {
                    new SqlParameter("@id",id),
                    new SqlParameter("@masp","null"),
                    new SqlParameter("@tensp","null"),
                    new SqlParameter("@StatementType","delete"),
                };
                return LIB.CONNECT.CONNECT.ExecuteSP<ResponseResult>("CategoryExecute", lp);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public ResponseResult InsertCertory(string masp,string tensp)
        {
            try
            {
                var lp = new List<SqlParameter>
                {
                    new SqlParameter("@id","0"),
                    new SqlParameter("@masp",masp),
                    new SqlParameter("@tensp",tensp),
                    new SqlParameter("@StatementType","insert"),
                };
                return LIB.CONNECT.CONNECT.ExecuteSP<ResponseResult>("CategoryExecute", lp);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public ResponseResult UpdateCertory(int id,string masp, string tensp)
        {
            try
            {
                var lp = new List<SqlParameter>
                {
                    new SqlParameter("@id",id),
                    new SqlParameter("@masp",masp),
                    new SqlParameter("@tensp",tensp),
                    new SqlParameter("@StatementType","update"),
                };
                return LIB.CONNECT.CONNECT.ExecuteSP<ResponseResult>("CategoryExecute", lp);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<Procuder> GetProcLoad(int id, string key)
        {
            try
            {
                var lp = new List<SqlParameter>
                    {
                        new SqlParameter("@id",id),
                         new SqlParameter("@key",key),
                    };
                return LIB.CONNECT.CONNECT.ExecuteSPList<Procuder>("ProcductLoad", lp);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public ResponseResult InsertProcuder(int emp_id, string masp, string tensp)
        {
            try
            {
                var lp = new List<SqlParameter>
                {
                    new SqlParameter("@id","0"),
                    new SqlParameter("@emp_id",emp_id),
                    new SqlParameter("@masp",masp),
                    new SqlParameter("@tensp",tensp),
                    new SqlParameter("@type","insert"),
                };
                return LIB.CONNECT.CONNECT.ExecuteSP<ResponseResult>("PRODUCTExecute", lp);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public ResponseResult UpdateProcuder(Procuder pro)
        {
            try
            {
                var lp = new List<SqlParameter>
                {
                    new SqlParameter("@id",pro.id),
                    new SqlParameter("@emp_id",pro.emp_id),
                    new SqlParameter("@masp",pro.masp),
                    new SqlParameter("@tensp",pro.tensp),
                    new SqlParameter("@type","update"),
                };
                return LIB.CONNECT.CONNECT.ExecuteSP<ResponseResult>("PRODUCTExecute", lp);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public ResponseResult DeleteProcuder(int id)
        {
            try
            {
                var lp = new List<SqlParameter>
                {
                    new SqlParameter("@id",id),
                    new SqlParameter("@emp_id","0"),
                    new SqlParameter("@masp","null"),
                    new SqlParameter("@tensp","null"),
                    new SqlParameter("@type","delete"),
                };
                return LIB.CONNECT.CONNECT.ExecuteSP<ResponseResult>("PRODUCTExecute", lp);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
