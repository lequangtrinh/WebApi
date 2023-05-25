

namespace LibTrinh.Models
{
    public class CFaMenuDTO
    {
        public string Name { get; set; }
        public string Img { get; set; }
        public IEnumerable<CFaSubMenuDTO> Childs { get; set; }
    }
    public class CFaSubMenuDTO
    {
        public string Name { get; set; }
        public string Url { get; set; }
        public IEnumerable<CFaSubMenuDTO> ChildNode { get; set; }
    }

    public class CFaListSubMenuDTO
    {
        public int id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public int ParentID { get; set; }
        public int ChildID { get; set; }
        public int Level { get; set; }
    }
}
