using Microsoft.Extensions.Configuration;
using System.Data;
using System.Reflection;

namespace LibTrinh.Common
{
    /// <summary>
    /// GlobalBase
    /// </summary>
    public class GlobalBase
    {
        #region Global custrustor
        public class Global
        {
            #region // Root
            public static string ROOTCODE;
            #endregion

            #region // Option
            public static int sys_DB_ID;
            public static string sys_DB_SOURCE;
            public static string sys_DB_Name;
            public static string sys_DB_User;
            public static string sys_DB_Pass;
            public static int sys_DB_AllowPermission;
            #endregion

        }
        #endregion

        #region
        public static async Task System_Start(string keycode, IConfiguration _config)
        {
            Global.ROOTCODE = _config.GetValue<string>("DATA:ROOTCODE").ToString();
            //Global.sys_DB_SOURCE = "HCM-PC-034\\MSSQLSERVER01";
         Global.sys_DB_SOURCE = "DESKTOP-TD50OL3";
            //Global.sys_DB_SOURCE = Encrypt.DecryptString(_config.GetValue<string>("DBStringConn:RSOURCE").ToString(), Global.ROOTCODE);
            Global.sys_DB_Name = Encrypt.DecryptString(_config.GetValue<string>("DBStringConn:RNAME").ToString(), Global.ROOTCODE);
            Global.sys_DB_User = Encrypt.DecryptString(_config.GetValue<string>("DBStringConn:RUSER").ToString(), Global.ROOTCODE);
            Global.sys_DB_Pass = Encrypt.DecryptString(_config.GetValue<string>("DBStringConn:RPASSWORD").ToString(), Global.ROOTCODE);
            //var task_startclient = client.StartClient(keycode);
        }
        public static List<T> ConvertDataTable<T>(DataTable dt)
        {
            List<T> data = new List<T>();
            foreach (DataRow row in dt.Rows)
            {
                T item = GetItem<T>(row);
                data.Add(item);
            }
            return data;
        }
        public static T GetItem<T>(DataRow dr)
        {
            Type temp = typeof(T);
            T obj = Activator.CreateInstance<T>();

            foreach (DataColumn column in dr.Table.Columns)
            {
                foreach (PropertyInfo pro in temp.GetProperties())
                {
                    if (pro.Name == column.ColumnName)
                        pro.SetValue(obj, dr[column.ColumnName], null);
                    else
                        continue;
                }
            }
            return obj;
        }
        #endregion
    }
}
