namespace LibTrinh.Models
{
    /// <summary>
    /// MessagesDTO
    /// </summary>
    public class CFaLoadMessagesFriendsDTO : CFaTableChatFriendDTO
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Image { get; set; }
        public string TimeOnline { get; set; }

    }
    /// <summary>
    /// CFaRegisMessagesUserDTO
    /// </summary>
    public class CFaRegisMessagesUserDTO: CFaLoadMessagesDTO
    {
        public object DataMess { get; set; }
    }

    /// <summary>
    /// CFaRegisMessagesUserDTO
    /// </summary>
    public class CFaLoadMessagesDTO
    {
        public string UserID { get; set; }
        public string UserIDTo { get; set; }
    }
}
