using Microsoft.Extensions.Configuration;

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
            Global.sys_DB_SOURCE = "HCM-PC-034\\MSSQLSERVER01";
          // Global.sys_DB_SOURCE = "DESKTOP-TD50OL3";
            //Global.sys_DB_SOURCE = Encrypt.DecryptString(_config.GetValue<string>("DBStringConn:RSOURCE").ToString(), Global.ROOTCODE);
            Global.sys_DB_Name = Encrypt.DecryptString(_config.GetValue<string>("DBStringConn:RNAME").ToString(), Global.ROOTCODE);
            Global.sys_DB_User = Encrypt.DecryptString(_config.GetValue<string>("DBStringConn:RUSER").ToString(), Global.ROOTCODE);
            Global.sys_DB_Pass = Encrypt.DecryptString(_config.GetValue<string>("DBStringConn:RPASSWORD").ToString(), Global.ROOTCODE);
            //var task_startclient = client.StartClient(keycode);
        }
        #endregion
    }
}
