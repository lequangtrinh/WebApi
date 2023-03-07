using System.ComponentModel.DataAnnotations;

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
    /// AuthorResultModel
    /// </summary>
    public class AuthorResultModel
    {
        [Required]
        public string Session { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string PasswordEnCrypt { get; set; }

    }
}
