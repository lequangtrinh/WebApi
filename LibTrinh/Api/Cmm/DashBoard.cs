using AutoMapper;
using LibTrinh.Common;
using LibTrinh.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Data;

namespace LibTrinh.Api.Cmm
{
    public class DashBoard : BusinessService, IDashBoard
    {
        public DashBoard(IBaseDbContext pContext, IMapper pMapper, IHttpContextAccessor pHttpContext) : base(pContext, pMapper, pHttpContext)
        {
        }

        /// <summary>
        /// LoadDataHeardDashBoard
        /// </summary>
        public async Task<string> LoadDataHeardDashBoard()
        {
            try
            {
                using (var uow = await _context.CreateAsync())
                {
                    var LoadDataHeard = await uow.ExecuteDataTable("[yyy_sp_CountHeardDashBoard]", CommandType.StoredProcedure);
                    uow.Commit();
                    return JsonConvert.SerializeObject(LoadDataHeard);
                };
            }
            catch (Exception ex)
            {
                _fileLogger.Error(ex.Message);
                return null;
            }
        }

        public async Task<string> LoadDataMenu()
        {
            try
            {
                using (var uow = await _context.CreateAsync())
                {
                    List<CFaMenuDTO> cFaMenuDTO = new List<CFaMenuDTO>();
                    List<CFaListSubMenuDTO> lstSubMenuDTO = new List<CFaListSubMenuDTO>();
                    var LoadDataMenu = await uow.ExecuteDataTable("[YYY_sp_LoadMenu]", CommandType.StoredProcedure);
                    var LoadLstSubMenu = await uow.ExecuteDataTable("[YYY_sp_LoadSubMenu]", CommandType.StoredProcedure);
                    List<string> lstChild = new List<string>();
                    foreach (DataRow dr in LoadLstSubMenu.Rows)
                    {
                        lstSubMenuDTO.Add(new CFaListSubMenuDTO
                        {
                            id = Convert.ToInt32(dr["id"]),
                            Name = dr["Name"].ToString(),
                            Url = dr["Url"].ToString(),
                            ParentID = Convert.ToInt32(dr["ParentID"]),
                            ChildID = Convert.ToInt32(dr["ChildID"]),
                            Level = Convert.ToInt32(dr["Level"])
                        });
                    };
                    // var xx = JsonConvert.DeserializeObject(LoadDataSubMenu);
                    string Id = null;
                    foreach (DataRow row in LoadDataMenu.Rows)
                    {
                        Id = row["MenuID"].ToString();
                        cFaMenuDTO.Add(new CFaMenuDTO {
                            Name = row["ParentName"].ToString(),
                            Img = row["Images"].ToString(),
                            Childs = ExeSubMenu(row["MenuName"].ToString()
                                                , lstSubMenuDTO, Id)
                        });
                    }
                    //foreach (var item in lstChild)
                    //{
                    //    string[] lst = item.Split(',');
                    //    lstSubMenu.Add(new CFaSubMenuDTO
                    //    {
                    //        Name = item,
                    //        Url=item,
                    //    }) ;
                    // };

                    uow.Commit();
                    return JsonConvert.SerializeObject(cFaMenuDTO);
                };
            }
            catch (Exception ex)
            {
                _fileLogger.Error(ex.Message);
                return null;
            }
        }
        public List<CFaSubMenuDTO> ExeSubMenu(string value, List<CFaListSubMenuDTO> lstSubMenuDTO, string id)
        {
            List<CFaSubMenuDTO> lstSubMenu = new List<CFaSubMenuDTO>();
            List<CFaSubMenuDTO> lstSubMenuChild;
            if (value.Length > 0)
            {
                string[] lst = value.Split(',');
                string[] lstId = id.Split(',');
                int i = 0;
                foreach (var lstItem in lst)
                {
                    var xx = lstId[i];
                        lstSubMenuChild = LoadSubMenu(lstId[i], lstSubMenuDTO);
                    
                    //foreach (string idChild in lstId)
                    //{
                    //    lstSubMenuChild=LoadSubMenu(idChild, lstSubMenuDTO);
                    //    //int key = Convert.ToInt32(idChild);
                    //    //var xx = lstSubMenuDTO.Where(x => ((x.ParentID == key || x.ChildID == key)
                    //    //                             && x.Level != 0));
                    //    //if (xx.Count() > 0)
                    //    //{
                    //    //    lstSubMenuChild = new List<CFaSubMenuDTO>();
                    //    //    foreach (var item in xx)
                    //    //    {
                    //    //        lstSubMenuChild.Add(new CFaSubMenuDTO
                    //    //        {
                    //    //            Name = item.Name,
                    //    //            Url = item.Url,
                    //    //            ChildNode = null
                    //    //        });
                    //    //    }

                    //    //}

                    //}
                    
                    lstSubMenu.Add(new CFaSubMenuDTO
                    {
                        Name = lstItem.Substring(0, lstItem.IndexOf(":")),
                        Url = lstItem.Substring(lstItem.IndexOf(":") + 1),
                        ChildNode = lstSubMenuChild
                    });
                    i++;
                }
            }
            return lstSubMenu;
        }

        public List<CFaSubMenuDTO> LoadSubMenu(string idChild, List<CFaListSubMenuDTO> lstSubMenuDTO)
        {
            List<CFaSubMenuDTO> lstSubMenuChild;
            int key = Convert.ToInt32(idChild);
            var xx = lstSubMenuDTO.Where(x => ((x.ParentID == key || x.ChildID == key)
                                         && x.Level != 0));
            lstSubMenuChild = new List<CFaSubMenuDTO>();
            if (xx.Count() > 0)
            {
                foreach (var item in xx)
                {
                    lstSubMenuChild.Add(new CFaSubMenuDTO
                    {
                        Name = item.Name,
                        Url = item.Url,
                        ChildNode = LoadSubMenu(item.id.ToString(), lstSubMenuDTO)
                });
                }

            }
            return lstSubMenuChild;
        }
    }
}
