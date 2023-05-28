/// <summary>
/// LoginDTO
/// </summary>

namespace LibTrinh.Models
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

    /// <summary>
    /// CFaUserInfoDTO
    /// </summary>
    public class CFaUserInfoDTO
    {
        public string flags { get; set; }
        public string userID { get; set; }
        public string PassWord { get; set; }
    }
    /// <summary>
    /// CFaTokenLoginDTO
    /// </summary>
    public class CFaTokenLoginDTO
    {
        public string token { get; set; }
        public string PublicKey { get; set; }
        public string Url { get; set; }
    }
    /// <summary>
    /// CFaUserLoginDTO
    /// </summary>
    public class CFaUserLoginDTO
    {
        public string UserID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Image { get; set; }
        public string PassReissueKey { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
    }
    /// <summary>
    /// CFaSerachUserDTO
    /// </summary>
    public class CFaSerachUserDTO
    {
        public string UserID { get; set; }
        //public string UserName { get; set; }
        //public string Email { get; set; }
        //public string Address { get; set; }
        //public string PhoneNumber { get; set; }
    }
    /// <summary>
    /// CFaUserLoginDTO
    /// </summary>
    public class CFaUserRegisDTO
    {
        //public string UserID { get; set; }
        //public string UserName { get; set; }
        //public string Password { get; set; }
        public string pathImage { get; set; }
        public string Image { get; set; }
        //public string PassReissueKey { get; set; }
        //public string Email { get; set; }
        //public string Role { get; set; }
    }
}
