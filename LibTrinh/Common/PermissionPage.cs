using Microsoft.AspNetCore.Http;
using System.Data;
using System.Linq;
using System;

namespace LibTrinh.Common
{
    public static class PermissionPage
    {
        public static bool CheckPermissionPageByMenu(HttpContext httpContext, string pageAbsoulte)
        {
            try
            {
                return true;
                //if (CheckMenuIsHideFromServer(pageAbsoulte))
                //{
                //    if (CheckCurrentPageIsPageWithoutPermission(pageAbsoulte))
                //    {
                //        var per = Session.Session.GetUserSession(httpContext);
                //        DataRow[] foundRows = per.sys_PermissionMenu.Select("MenuURL='" + pageAbsoulte + "' OR CodeURL='" + pageAbsoulte + "'");
                //        if (foundRows.Count() != 0) return false; // do duoc
                //        return true; // Khong do duoc
                //    }
                //    else
                //    {
                //        return false;
                //    }
                //}
                //else
                //{
                //    return true; // Khong do duoc
                //}
            }
            catch (Exception)
            {
                return true; // Khong do duoc
            }

        }
        //private static bool CheckCurrentPageIsPageWithoutPermission(string pageAbsoulte)
        //{
        //    try
        //    {
        //        DataRow[] foundRows = Global.sys_PermissionTableMenu_Table.Select("MenuURL='" + pageAbsoulte + "' OR CodeURL='" + pageAbsoulte + "'");
        //        if (foundRows.Count() != 0) return true; // trang phan quyen
        //        return false; // trang khong duoc phan quyen

        //    }
        //    catch (Exception)
        //    {
        //        return false; // trang khong duoc phan quyen
        //    }
        //}

        //private static bool CheckMenuIsHideFromServer(string pageAbsoulte)
        //{
        //    try
        //    {
        //        DataRow[] foundRows = Global.sys_PermissionMenuMustHide_Table.Select("LinkUrlWhenClick='" + pageAbsoulte + "'");
        //        if (foundRows.Count() != 0) return false; // trang nay thuoc ve menu bi cam tren server
        //        return true; // trang nay khong bi cam

        //    }
        //    catch (Exception)
        //    {
        //        return true; // trang nay khong bi cam
        //    }
        //}


    }
}
