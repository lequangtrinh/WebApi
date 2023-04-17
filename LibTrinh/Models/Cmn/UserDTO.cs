
namespace LibTrinh.Models
{
    /// <summary>
    /// UserDTO
    /// </summary>
    public class UserDTO
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string IP { get; set; }
        public string Role { get; set; }
        public string UserID { get; set; } = string.Empty;
    }
    /// <summary>
    /// CFaAuthorValidateToken
    /// </summary>
    public class CFaAuthorValidateToken
    {
        public string UserID { get; set; }
        public string Token { get; set; }
        public string PublicKey { get; set; }

    }
}
