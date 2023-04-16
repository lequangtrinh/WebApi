namespace LibTrinh.Constant
{
    /// <summary>
    /// Constant
    /// </summary>
    public class Constant
    {
        public const string ForderToken = "Token";
        public const int Token_Required_Time = 60;
        public const string PRIVATEKEY = "privateKey";
        public const string PUBLICKEY = "publicKey";
        #region google

        public static string ApplicationName = "Google Api DotNetCore Web Client";

        public static string ClientId = "35503573231-sphrsn731ur1d0b3hq9bi5ee7q7g715b.apps.googleusercontent.com";

        public static string ClientSecret = "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";

        public static string RedirectUri = "https://localhost:7127/DashBoards";

        public static string OauthUri = "https://accounts.google.com/o/oauth2/auth?";

        public static string TokenUri = "https://accounts.google.com/o/oauth2/token";

        public static string Scopes = "https://www.googleapis.com/auth/userinfo.email";
        #endregion
        #region faceBook
        public static string AppId = "35503573231-sphrsn731ur1d0b3hq9bi5ee7q7g715b.apps.googleusercontent.com";

        public static string AppSecret = "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";
        #endregion
    }
}
