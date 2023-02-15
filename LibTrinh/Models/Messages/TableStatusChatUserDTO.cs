namespace LibTrinh.Models
{
    /// <summary>
    /// CFaTableStatusChatUserDTO
    /// </summary>
    public partial class CFaTableStatusChatUserDTO
    {
        public string UserID { get; set; }
        public int Status { get; set; }
        public string TimeOnline { get; set; }
        public int FlagsDiv { get; set; }
        public string CreateDate { get; set; }
        public string UpdateDate { get; set; }
    }
}
