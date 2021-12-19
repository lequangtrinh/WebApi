using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;

namespace LIB.CONNECT
{
    public class CONNECT
    {
        public static DataSet ExecDataSetSP(string storeName, List<SqlParameter> pParams)
        {
            DataSet ds = new DataSet();
            try
            {
                SqlConnection conn = new SqlConnection(@"Data Source=LAPTOP-43DCQSCT\SQLEXPRESS;Initial Catalog=DBApi;Integrated Security=True");
                SqlCommand cmd = new SqlCommand(storeName, conn);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataAdapter da = new SqlDataAdapter();
                da.SelectCommand = cmd;

                //add parameters
                if (pParams != null)
                {
                    foreach (SqlParameter param in pParams)
                    {
                        cmd.Parameters.Add(param);
                    }
                }
                try
                {
                    if (cmd.Connection.State == ConnectionState.Open)
                    {
                        cmd.Connection.Close();
                    }
                    cmd.Connection.Open();
                    da.Fill(ds);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (cmd.Connection.State == ConnectionState.Open)
                    {
                        cmd.Connection.Close();
                    }
                    cmd.Dispose();
                    da.Dispose();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return ds;
        }
        protected static T getObjectMSSql<T>(DataRow row, List<string> columnsName) where T : new()
        {
            T obj = new T();
            try
            {
                string columnname = "";
                string value = "";
                PropertyInfo[] Properties;
                Properties = typeof(T).GetProperties();
                foreach (PropertyInfo objProperty in Properties)
                {
                    columnname = columnsName.Find(name => name.ToLower() == objProperty.Name.ToLower());
                    if (!string.IsNullOrEmpty(columnname))
                    {
                        if (objProperty.PropertyType.Name == "Guid")
                        {
                            value = new Guid(row[columnname].ToString()).ToString();
                        }
                        else
                        {
                            value = row[columnname].ToString();
                        }
                        if (!string.IsNullOrEmpty(value))
                        {
                            if (Nullable.GetUnderlyingType(objProperty.PropertyType) != null)
                            {
                                if (objProperty.PropertyType.Name == "Guid")
                                {
                                    value = new Guid(row[columnname].ToString()).ToString().Replace("$", "").Replace(",", "");
                                    objProperty.SetValue(obj, new Guid(row[columnname].ToString()), null);
                                }
                                else
                                {
                                    value = row[columnname].ToString().Replace("$", "").Replace(",", "");
                                    objProperty.SetValue(obj, Convert.ChangeType(value, Type.GetType(Nullable.GetUnderlyingType(objProperty.PropertyType).ToString())), null);
                                }
                            }
                            else
                            {
                                if (objProperty.PropertyType.Name == "Guid")
                                {
                                    value = new Guid(row[columnname].ToString()).ToString().Replace("%", "");
                                    objProperty.SetValue(obj, new Guid(row[columnname].ToString()), null);
                                }
                                else
                                {
                                    value = row[columnname].ToString().Replace("%", "");
                                    objProperty.SetValue(obj, Convert.ChangeType(value, Type.GetType(objProperty.PropertyType.ToString())), null);
                                }
                            }
                        }
                    }
                }
                return obj;
            }
            catch
            {
                return obj;
            }
        }
        public static List<T> ExecuteSPList<T>(string pSPName, List<SqlParameter> pParameters) where T : new()// khi
        {
            try
            {
                DataTable datatable;
                DataSet ds = ExecDataSetSP(pSPName, pParameters);
                if (ds.Tables.Count > 0)
                    datatable = ds.Tables[0];
                else
                    datatable = new DataTable();

                List<T> Temp = new List<T>();
                try
                {
                    List<string> columnsNames = new List<string>();
                    foreach (DataColumn DataColumn in datatable.Columns)
                        columnsNames.Add(DataColumn.ColumnName);
                    Temp = datatable.AsEnumerable().ToList().ConvertAll<T>(row => getObjectMSSql<T>(row, columnsNames));
                    return Temp;
                }
                catch
                {
                    return Temp;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public static T ExecuteSP<T>(string pSPName, List<SqlParameter> pParameters) where T : new()
        {
            try
            {
                DataTable datatable;
                DataSet ds = ExecDataSetSP(pSPName, pParameters);
                if (ds.Tables.Count > 0)
                    datatable = ds.Tables[0];
                else
                    datatable = new DataTable();

                T Temp = new T();
                try
                {
                    List<string> columnsNames = new List<string>();
                    foreach (DataColumn DataColumn in datatable.Columns)
                        columnsNames.Add(DataColumn.ColumnName);
                    Temp = datatable.AsEnumerable().ToList().ConvertAll<T>(row => getObjectMSSql<T>(row, columnsNames)).FirstOrDefault();
                    return Temp;
                }
                catch
                {
                    return Temp;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
