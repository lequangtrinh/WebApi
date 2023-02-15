/// <summary>
/// LoginDTO
/// </summary>


namespace TrinhTest.Models
{
    /// <summary>
    /// LoginDTO 
    /// </summary>
    public class CFaUserDTO
    {
        public string menu { get; set; }
        public string IDMenu { get; set; }
        public string flags { get; set; }
        public string userID { get; set; }
        public string PassWord { get; set; }
    }

    public class CFaUserInfoDTO
    {
        public string menu { get; set; }
        public string IDMenu { get; set; }
        public string flags { get; set; }
        public string userID { get; set; }
        public string PassWord { get; set; }
        public string PassWordNew { get; set; }
    }
}
