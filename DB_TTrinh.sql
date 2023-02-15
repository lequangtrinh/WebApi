USE [master]
GO
/****** Object:  Database [DBTrinh]    Script Date: 11/1/2023 11:39:48 ******/
CREATE DATABASE [DBTrinh]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'DBTrinh', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER01\MSSQL\DATA\DBTrinh.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'DBTrinh_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER01\MSSQL\DATA\DBTrinh_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [DBTrinh] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DBTrinh].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DBTrinh] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DBTrinh] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DBTrinh] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DBTrinh] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DBTrinh] SET ARITHABORT OFF 
GO
ALTER DATABASE [DBTrinh] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DBTrinh] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DBTrinh] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DBTrinh] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DBTrinh] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DBTrinh] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DBTrinh] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DBTrinh] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DBTrinh] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DBTrinh] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DBTrinh] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DBTrinh] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DBTrinh] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DBTrinh] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DBTrinh] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DBTrinh] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DBTrinh] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DBTrinh] SET RECOVERY FULL 
GO
ALTER DATABASE [DBTrinh] SET  MULTI_USER 
GO
ALTER DATABASE [DBTrinh] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DBTrinh] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DBTrinh] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DBTrinh] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DBTrinh] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [DBTrinh] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'DBTrinh', N'ON'
GO
ALTER DATABASE [DBTrinh] SET QUERY_STORE = OFF
GO
USE [DBTrinh]
GO
/****** Object:  Table [dbo].[TabelMenu]    Script Date: 11/1/2023 11:39:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TabelMenu](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[menu] [nvarchar](100) NOT NULL,
	[IDMenu] [nvarchar](100) NULL,
	[flags] [int] NULL,
	[userID] [nvarchar](100) NULL,
	[ChildMenu] [nvarchar](100) NULL,
 CONSTRAINT [PK_TabelMenu] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TableChat]    Script Date: 11/1/2023 11:39:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TableChat](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [nchar](20) NOT NULL,
	[UserIDTo] [nchar](20) NOT NULL,
	[ValueMess] [nvarchar](max) NULL,
	[CreateDate] [nchar](20) NULL,
	[UpdateDate] [nchar](20) NULL,
	[FlagsDiv] [int] NULL,
 CONSTRAINT [PK_TableChat] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TableChatFriend]    Script Date: 11/1/2023 11:39:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TableChatFriend](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [nchar](20) NULL,
	[IDFriend] [nchar](20) NULL,
	[Status] [int] NULL,
	[CreateDate] [nvarchar](10) NULL,
	[UpdateDate] [nvarchar](10) NULL,
 CONSTRAINT [PK_TableChatFriend] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TableStatusChatUser]    Script Date: 11/1/2023 11:39:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TableStatusChatUser](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [nchar](20) NULL,
	[Status] [int] NULL,
	[TimeOnline] [nchar](10) NULL,
	[FlagsDiv] [int] NULL,
	[CreateDate] [nchar](10) NULL,
	[UpdateDate] [nchar](10) NULL,
 CONSTRAINT [PK_TableStatusChatUser] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserLogin]    Script Date: 11/1/2023 11:39:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserLogin](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[UserID] [char](5) NOT NULL,
	[UserName] [nvarchar](20) NULL,
	[Password] [char](60) NULL,
	[Image] [nvarchar](100) NULL,
	[LoginFailTimes] [int] NULL,
	[PassReissueKey] [char](60) NULL,
	[DeleteDiv] [int] NULL,
	[Email] [nvarchar](100) NULL,
	[Role] [nvarchar](50) NULL,
 CONSTRAINT [PK_MstStaff] PRIMARY KEY CLUSTERED 
(
	[id] ASC,
	[UserID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = ON, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, FILLFACTOR = 80, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Index [IX_TabelMenu]    Script Date: 11/1/2023 11:39:48 ******/
CREATE NONCLUSTERED INDEX [IX_TabelMenu] ON [dbo].[TabelMenu]
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [FK_TableChat_X1]    Script Date: 11/1/2023 11:39:48 ******/
CREATE NONCLUSTERED INDEX [FK_TableChat_X1] ON [dbo].[TableChat]
(
	[UserID] ASC,
	[UserIDTo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [index_UserName_IX]    Script Date: 11/1/2023 11:39:48 ******/
CREATE UNIQUE NONCLUSTERED INDEX [index_UserName_IX] ON [dbo].[UserLogin]
(
	[UserName] ASC,
	[Email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[YYY_sp_CheckLoginUser]    Script Date: 11/1/2023 11:39:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[YYY_sp_CheckLoginUser]
@UserID NVARCHAR(20)
AS
BEGIN
DECLARE @SetLogin INT;
SET @SetLogin =(SELECT COUNT(*) FROM UserLogin
WHERE	UserID			=	@UserID 
  AND	LoginFailTimes	<=	10);
	IF @SetLogin = 0
		BEGIN
		UPDATE UserLogin 
		SET LoginFailTimes=(CAST((SELECT LoginFailTimes 
								FROM	UserLogin
								WHERE	UserID			=	@UserID ) AS INT)+1)
		WHERE	UserID			=	@UserID 
		END
	ELSE
		BEGIN
		SELECT * 
		FROM UserLogin
		 WHERE	UserID			=	@UserID 
		END 
END

GO
/****** Object:  StoredProcedure [dbo].[YYY_sp_InsertUser]    Script Date: 11/1/2023 11:39:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[YYY_sp_InsertUser]
@UserID NVARCHAR(20),
@UserName NVARCHAR(20)
,@Password NVARCHAR(MAX)
,@Image NVARCHAR(200)
,@PassReissueKey NVARCHAR(20)
,@Email NVARCHAR(100)
,@Role NVARCHAR(20)
AS
BEGIN
INSERT INTO UserLogin ([UserID]
					   ,[UserName]
					   ,[Password]
					   ,[Image]
					   ,[LoginFailTimes]
					   ,[PassReissueKey]
					   ,[DeleteDiv]
					   ,[Email]
					   ,[Role])
VALUES (@UserID
,@UserName
,@Password
,@Image
,0
,@PassReissueKey
,0
,@Email
,@Role);
END
GO
/****** Object:  StoredProcedure [dbo].[YYY_sp_InstUpMessagesUser]    Script Date: 11/1/2023 11:39:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[YYY_sp_InstUpMessagesUser]
  @UserID       NVARCHAR(20),
  @UserIDTo		NVARCHAR(20),
  @ValueMess	NVARCHAR(300),
  @CreateDate	NVARCHAR(20),
  @UpdateDate	NVARCHAR(20)
AS
BEGIN
DECLARE @CountUser INT
SET @CountUser=(SELECT IIF((SELECT COUNT(*) 
FROM TableChat
WHERE UserID	=	@UserID
AND UserIDTo	=	@UserIDTo
AND FlagsDiv	=	0)<>0,1,IIF((SELECT COUNT(*) 
							FROM TableChat
							WHERE UserID	=	@UserIDTo
							AND UserIDTo	=	@UserID
							AND FlagsDiv	=	0)<>0,1,0)));
IF @CountUser=0
	BEGIN
		INSERT INTO TableChat ([UserID]
								,[UserIDTo]
								,[ValueMess]
								,[CreateDate]
								,[UpdateDate]
								,[FlagsDiv])
		VALUES (@UserID
		,@UserIDTo
		,@ValueMess
		,@CreateDate
		,@UpdateDate
		,0);
		INSERT INTO TableChat ([UserID]
								,[UserIDTo]
								,[ValueMess]
								,[CreateDate]
								,[UpdateDate]
								,[FlagsDiv])
		VALUES (@UserIDTo
		,@UserID
		,@ValueMess
		,@CreateDate
		,@UpdateDate
		,0);
	END 
ELSE
	BEGIN
		UPDATE TableChat
		SET UpdateDate	=	@UpdateDate
			,ValueMess	=	@ValueMess
		WHERE UserID	=	@UserID
		AND UserIDTo	=	@UserIDTo
		AND FlagsDiv	=	0 

		UPDATE TableChat
		SET UpdateDate	=	@UpdateDate
			,ValueMess	=	@ValueMess
		WHERE UserID	=	@UserIDTo
		AND UserIDTo	=	@UserID
		AND FlagsDiv	=	0 
	END
END

GO
/****** Object:  StoredProcedure [dbo].[YYY_sp_LoadDashboard]    Script Date: 11/1/2023 11:39:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[YYY_sp_LoadDashboard]
@UserID NVARCHAR(20)
AS
BEGIN
SELECT * FROM TabelMenu
WHERE userID=@UserID
END
GO
/****** Object:  StoredProcedure [dbo].[YYY_sp_LoadDataChatUsers]    Script Date: 11/1/2023 11:39:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[YYY_sp_LoadDataChatUsers]
@UserID NVARCHAR(20),
@UserIDTo NVARCHAR(20)
AS
BEGIN
SELECT Top(1)*
FROM TableChat
WHERE UserID	=	TRIM(@UserID)
  AND UserIDTo	=	TRIM(@UserIDTo)
  AND FlagsDiv	=	0
ORDER BY CreateDate
END
GO
/****** Object:  StoredProcedure [dbo].[YYY_sp_LoadDataFriendChat]    Script Date: 11/1/2023 11:39:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[YYY_sp_LoadDataFriendChat]
@UserID NVARCHAR(20)
AS
BEGIN
SELECT *
FROM TableChatFriend		AS	ChatFriend
jOIN TableStatusChatUser	AS	ChatUser
  ON ChatUser.UserID		=	@UserID
 AND  ChatUser.[Status]		=	0
JOIN  UserLogin
  ON  UserLogin.UserID		=	ChatFriend.IDFriend
 AND  DeleteDiv				=	0
WHERE ChatFriend.UserID		=	@UserID
  AND ChatFriend.[Status]	=	0;
END
GO
/****** Object:  StoredProcedure [dbo].[YYY_sp_UpdateInfoUser]    Script Date: 11/1/2023 11:39:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[YYY_sp_UpdateInfoUser]
@UserID NVARCHAR(20),
@UserName NVARCHAR(20)
,@Password NVARCHAR(MAX)
,@Image NVARCHAR(200)
,@Email NVARCHAR(100)
,@Role NVARCHAR(20)
AS
BEGIN
UPDATE UserLogin 
SET						[UserName]=@UserName
					   ,[Password]=@Password
					   ,[Image]=@Image
					   ,[Email]=@Email
					   ,[Role]=@Role
WHERE UserID=@UserID
AND DeleteDiv=0;
END
GO
/****** Object:  StoredProcedure [dbo].[YYY_sp_UpdateInfoUserLgoinFailed]    Script Date: 11/1/2023 11:39:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[YYY_sp_UpdateInfoUserLgoinFailed]
@UserID NVARCHAR(20)
AS
BEGIN
UPDATE UserLogin 
SET						LoginFailTimes=(CAST((SELECT COUNT(*)
						FROM UserLogin
						WHERE UserID=@UserID
						AND DeleteDiv=0)AS INT) +1)
WHERE UserID=@UserID
AND DeleteDiv=0;
END
GO
USE [master]
GO
ALTER DATABASE [DBTrinh] SET  READ_WRITE 
GO
