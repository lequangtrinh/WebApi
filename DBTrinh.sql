USE [master]
GO
/****** Object:  Database [DBTrinh]    Script Date: 16/5/2023 17:23:12 ******/
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
/****** Object:  Table [dbo].[Logs]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Logs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Raised] [datetime] NOT NULL,
	[Level] [nvarchar](50) NOT NULL,
	[CorrelationId] [uniqueidentifier] NOT NULL,
	[Message] [nvarchar](max) NULL,
	[Container] [nvarchar](max) NULL,
	[Exception] [nvarchar](max) NULL,
	[Module] [nvarchar](255) NULL,
	[Instance] [nvarchar](255) NULL,
	[Environment] [nvarchar](255) NULL,
	[EnvironmentInstance] [nvarchar](255) NULL,
	[MetaData] [nvarchar](max) NULL,
 CONSTRAINT [PK_Logs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Appointment]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Appointment](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Doctor_id] [nchar](20) NOT NULL,
	[Patient_id] [nchar](20) NOT NULL,
	[Flag] [int] NULL,
	[CreateDate] [nchar](20) NULL,
	[UpdateDate] [nchar](20) NULL,
 CONSTRAINT [PK_T_Appointment] PRIMARY KEY CLUSTERED 
(
	[id] ASC,
	[Doctor_id] ASC,
	[Patient_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Bed]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Bed](
	[Bed_Id] [int] IDENTITY(1,1) NOT NULL,
	[Bed_Number] [nvarchar](50) NULL,
	[Type] [nvarchar](50) NULL,
	[Status] [int] NULL,
	[Description] [nvarchar](max) NULL,
	[Flag] [int] NULL,
	[CreateDate] [nvarchar](20) NULL,
	[UpdateDate] [nvarchar](20) NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Bed_Alotment]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Bed_Alotment](
	[Bed_Allotment_Id] [int] IDENTITY(1,1) NOT NULL,
	[Bed_Id] [int] NOT NULL,
	[Patient_Id] [int] NOT NULL,
	[Allotment_Timestamp] [nvarchar](20) NULL,
	[Discharge_Timestamp] [nvarchar](20) NULL,
	[Flag] [int] NULL,
	[CreateDate] [nvarchar](20) NULL,
	[UpdateDate] [nvarchar](20) NULL,
 CONSTRAINT [PK_T_Bed_Alotment] PRIMARY KEY CLUSTERED 
(
	[Bed_Allotment_Id] ASC,
	[Bed_Id] ASC,
	[Patient_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Blood_Bank]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Blood_Bank](
	[Blood_Group_Id] [int] IDENTITY(1,1) NOT NULL,
	[Blood_Group] [nvarchar](20) NULL,
	[Status] [nvarchar](20) NULL,
	[Flag] [int] NULL,
	[CreateDate] [nvarchar](20) NULL,
	[UpdateDate] [nvarchar](20) NULL,
 CONSTRAINT [PK_T_Blood_Bank] PRIMARY KEY CLUSTERED 
(
	[Blood_Group_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Blood_Donor]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Blood_Donor](
	[Blood_Donor_Id] [int] IDENTITY(1,1) NOT NULL,
	[Blood_Group] [nvarchar](20) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[Sex] [nvarchar](20) NULL,
	[Age] [nvarchar](20) NULL,
	[Phone] [nvarchar](20) NULL,
	[Email] [nvarchar](200) NULL,
	[Address] [nvarchar](20) NULL,
	[Last_Donation_Timestamp] [nvarchar](20) NULL,
	[Flag] [int] NULL,
	[CreateDate] [nvarchar](20) NULL,
	[UpdateDate] [nvarchar](20) NULL,
 CONSTRAINT [PK_T_Blood_Donor] PRIMARY KEY CLUSTERED 
(
	[Blood_Donor_Id] ASC,
	[Blood_Group] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_ChildPriceServices]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_ChildPriceServices](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[CodeServicesDetail] [nvarchar](20) NOT NULL,
	[CodeServices] [nvarchar](20) NOT NULL,
	[ServicesName] [nvarchar](500) NULL,
	[NumberUsers] [int] NULL,
	[CreateDate] [nchar](20) NULL,
	[UpdateDate] [nchar](20) NULL,
	[Flag] [int] NULL,
	[Price] [float] NULL,
 CONSTRAINT [PK_T_ChildPriceServices] PRIMARY KEY CLUSTERED 
(
	[CodeServicesDetail] ASC,
	[CodeServices] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Department]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Department](
	[Department_Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
	[Flag] [int] NULL,
	[CreateDate] [nvarchar](20) NULL,
	[UpdateDate] [nvarchar](20) NULL,
 CONSTRAINT [PK_T_Department] PRIMARY KEY CLUSTERED 
(
	[Department_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Diagnosis_Report]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Diagnosis_Report](
	[Diagnosis_Report_Id] [int] IDENTITY(1,1) NOT NULL,
	[Laboratorist_Id] [int] NOT NULL,
	[Prescription_Id] [int] NOT NULL,
	[Report_Type] [nvarchar](200) NULL,
	[Document_Type] [nvarchar](200) NULL,
	[File_Name] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
	[Timestamp] [nvarchar](20) NULL,
	[Flag] [int] NULL,
	[CreateDate] [nvarchar](20) NULL,
	[UpdateDate] [nvarchar](20) NULL,
 CONSTRAINT [PK_T_Diagnosis_Report] PRIMARY KEY CLUSTERED 
(
	[Diagnosis_Report_Id] ASC,
	[Laboratorist_Id] ASC,
	[Prescription_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Doctor]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Doctor](
	[Doctor_Id] [int] IDENTITY(1,1) NOT NULL,
	[Department_id] [int] NOT NULL,
	[Name] [nvarchar](max) NULL,
	[Email] [nvarchar](200) NULL,
	[Password] [nvarchar](max) NULL,
	[Address] [nvarchar](200) NULL,
	[Phone] [nvarchar](20) NULL,
	[Profile] [nvarchar](max) NULL,
	[Flag] [int] NULL,
	[CreateDate] [nvarchar](20) NULL,
	[UpdateDate] [nvarchar](20) NULL,
 CONSTRAINT [PK_T_Doctor] PRIMARY KEY CLUSTERED 
(
	[Doctor_Id] ASC,
	[Department_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Email_Template]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Email_Template](
	[Email_Template_Id] [int] IDENTITY(1,1) NOT NULL,
	[Task] [nvarchar](500) NULL,
	[Subject] [nvarchar](max) NULL,
	[Body] [nvarchar](max) NULL,
	[CreateDate] [nvarchar](20) NULL,
	[UpdateDate] [nvarchar](20) NULL,
 CONSTRAINT [PK_T_Email_Template] PRIMARY KEY CLUSTERED 
(
	[Email_Template_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Invoice]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Invoice](
	[Invoice_Id] [int] NOT NULL,
	[Patient_Id] [int] NOT NULL,
	[Title] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
	[Amount] [nvarchar](20) NULL,
	[Creation_Timestamp] [nvarchar](100) NULL,
	[Status] [nchar](10) NULL,
	[Flag] [int] NULL,
	[CreateDate] [nvarchar](20) NULL,
	[UpdateDate] [nvarchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[Invoice_Id] ASC,
	[Patient_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Laboratorist]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Laboratorist](
	[Lboratorist_Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[Email] [nvarchar](200) NULL,
	[Password] [nvarchar](max) NULL,
	[Address] [nvarchar](200) NULL,
	[Phone] [nvarchar](20) NULL,
	[Flag] [int] NULL,
	[CreateDate] [nvarchar](20) NULL,
	[UpdateDate] [nvarchar](20) NULL,
 CONSTRAINT [PK_T_Laboratorist] PRIMARY KEY CLUSTERED 
(
	[Lboratorist_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Medicine]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Medicine](
	[Medicine_Id] [int] IDENTITY(1,1) NOT NULL,
	[Medicine_Category_Id] [int] NOT NULL,
	[Name] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
	[Price] [bigint] NULL,
	[Manufacturing_Company] [nvarchar](max) NULL,
	[Status] [nchar](10) NULL,
	[Flag] [int] NULL,
	[CreateDate] [nvarchar](20) NULL,
	[UpdateDate] [nvarchar](20) NULL,
 CONSTRAINT [PK_T_Medicine] PRIMARY KEY CLUSTERED 
(
	[Medicine_Id] ASC,
	[Medicine_Category_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Medicine_Category]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Medicine_Category](
	[Medicine_Category_Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NULL,
	[Description] [nvarchar](max) NULL,
	[Flag] [int] NULL,
	[CreateDate] [nvarchar](20) NULL,
	[UpdateDate] [nvarchar](20) NULL,
 CONSTRAINT [PK_T_Medicine_Category] PRIMARY KEY CLUSTERED 
(
	[Medicine_Category_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Noticeboard]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Noticeboard](
	[Notice_id] [int] IDENTITY(1,1) NOT NULL,
	[Notice_title] [nvarchar](max) NULL,
	[Notice] [nvarchar](max) NULL,
	[CreateDate] [nvarchar](20) NULL,
	[UpdateDate] [nvarchar](20) NULL,
 CONSTRAINT [PK_T_Noticeboard] PRIMARY KEY CLUSTERED 
(
	[Notice_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Nurse]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Nurse](
	[Nurse_Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](200) NULL,
	[Email] [nvarchar](200) NULL,
	[Password] [nvarchar](max) NULL,
	[Address] [nvarchar](200) NULL,
	[Phone] [nvarchar](20) NULL,
	[Flag] [int] NULL,
	[CreateDate] [nvarchar](20) NULL,
	[UpdateDate] [nvarchar](20) NULL,
 CONSTRAINT [PK_T_Nurse] PRIMARY KEY CLUSTERED 
(
	[Nurse_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Patient]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Patient](
	[Patient_Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NULL,
	[Email] [nvarchar](200) NULL,
	[Password] [nvarchar](500) NULL,
	[Address] [nvarchar](200) NULL,
	[Phone] [nvarchar](20) NULL,
	[Sex] [nvarchar](20) NULL,
	[Birth_Date] [nvarchar](20) NULL,
	[Age] [int] NULL,
	[Blood_Group] [nvarchar](20) NULL,
	[Flag] [int] NULL,
	[CreateDate] [nvarchar](20) NULL,
	[UpdateDate] [nvarchar](20) NULL,
 CONSTRAINT [PK_T_Patient] PRIMARY KEY CLUSTERED 
(
	[Patient_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Payment]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Payment](
	[Payment_Id] [int] IDENTITY(1,1) NOT NULL,
	[Transaction_Id] [int] NOT NULL,
	[Invoice_Id] [int] NOT NULL,
	[Patient_Id] [int] NOT NULL,
	[Payment_Type] [nvarchar](20) NULL,
	[Method] [nvarchar](200) NULL,
	[Description] [nvarchar](200) NULL,
	[Amount] [bigint] NULL,
	[Timestamp] [nvarchar](20) NULL,
 CONSTRAINT [PK_T_Payment] PRIMARY KEY CLUSTERED 
(
	[Payment_Id] ASC,
	[Transaction_Id] ASC,
	[Invoice_Id] ASC,
	[Patient_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Pharmacist]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Pharmacist](
	[Pharmacist_Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](200) NULL,
	[Email] [nvarchar](200) NULL,
	[Password] [nvarchar](max) NULL,
	[Address] [nvarchar](200) NULL,
	[Phone] [nvarchar](20) NULL,
	[Flag] [int] NULL,
	[CreateDate] [nvarchar](20) NULL,
	[UpdateDate] [nvarchar](20) NULL,
 CONSTRAINT [PK_T_Pharmacist] PRIMARY KEY CLUSTERED 
(
	[Pharmacist_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Prescription]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Prescription](
	[Prescription_Id] [int] IDENTITY(1,1) NOT NULL,
	[Doctor_Id] [int] NOT NULL,
	[Patient_Id] [int] NOT NULL,
	[Case_History] [nvarchar](500) NULL,
	[Medication] [nvarchar](500) NULL,
	[Medication_From_Pharmacist] [nvarchar](500) NULL,
	[Description] [nvarchar](500) NULL,
	[Flag] [int] NULL,
	[CreateDate] [nvarchar](20) NULL,
	[UpdateDate] [nvarchar](20) NULL,
 CONSTRAINT [PK_T_Prescription] PRIMARY KEY CLUSTERED 
(
	[Prescription_Id] ASC,
	[Doctor_Id] ASC,
	[Patient_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_PriceServices]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_PriceServices](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[CodeServices] [nchar](10) NULL,
	[Name] [nvarchar](500) NULL,
	[Price] [float] NULL,
	[Images] [nchar](100) NULL,
	[CreateDate] [nchar](50) NULL,
	[UpdateDate] [nchar](50) NULL,
	[Flags] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Report]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Report](
	[Report_Id] [int] IDENTITY(1,1) NOT NULL,
	[Patient_Id] [int] NOT NULL,
	[Doctor_Id] [int] NOT NULL,
	[Type] [nvarchar](20) NULL,
	[Description] [nvarchar](max) NULL,
	[CreateDate] [nvarchar](20) NULL,
 CONSTRAINT [PK_T_Report] PRIMARY KEY CLUSTERED 
(
	[Report_Id] ASC,
	[Patient_Id] ASC,
	[Doctor_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_Settings]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_Settings](
	[Settings_Id] [int] IDENTITY(1,1) NOT NULL,
	[Type] [nvarchar](20) NULL,
	[Description] [nvarchar](200) NULL,
	[CreateDate] [nvarchar](20) NULL,
	[UpdateDate] [nvarchar](20) NULL,
 CONSTRAINT [PK_T_Settings] PRIMARY KEY CLUSTERED 
(
	[Settings_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TabelMenu]    Script Date: 16/5/2023 17:23:12 ******/
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
/****** Object:  Table [dbo].[TableChat]    Script Date: 16/5/2023 17:23:12 ******/
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
/****** Object:  Table [dbo].[TableChatFriend]    Script Date: 16/5/2023 17:23:12 ******/
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
/****** Object:  Table [dbo].[TableStatusChatUser]    Script Date: 16/5/2023 17:23:12 ******/
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
/****** Object:  Table [dbo].[T-Admin]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T-Admin](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Admin_id] [nvarchar](50) NOT NULL,
	[Name] [nvarchar](200) NULL,
	[Email] [nvarchar](200) NULL,
	[Password] [nvarchar](max) NULL,
	[Address] [nvarchar](max) NULL,
	[Flag] [int] NULL,
	[CreateDate] [nchar](20) NULL,
	[UpdateDate] [nchar](20) NULL,
 CONSTRAINT [PK_T-Admin] PRIMARY KEY CLUSTERED 
(
	[id] ASC,
	[Admin_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserLogin]    Script Date: 16/5/2023 17:23:12 ******/
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
/****** Object:  StoredProcedure [dbo].[YYY_sp_CheckLoginUser]    Script Date: 16/5/2023 17:23:12 ******/
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
/****** Object:  StoredProcedure [dbo].[yyy_sp_CountHeardDashBoard]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[yyy_sp_CountHeardDashBoard]
AS
BEGIN
  DECLARE @APPOINTMENT_COUNT	INT ,
		  @DOCTOR_COUNT			INT,
		  @PATIENT_COUNT		INT ,
		  @PRESCRIPTION_COUNT	INT
	SET NOCOUNT ON
	SET @DOCTOR_COUNT		=	(SELECT COUNT(*) 
								 FROM	T_Doctor 
								 WHERE	Flag	=	0);
	SET @PATIENT_COUNT		=	(SELECT COUNT(*) 
								 FROM	T_Patient
								 WHERE	Flag	=	0);
	SET @APPOINTMENT_COUNT	=	(SELECT COUNT(*) 
								 FROM	T_Appointment
								 WHERE	Flag	=	0);
	SET @PRESCRIPTION_COUNT	=	(SELECT COUNT(*) 
								 FROM	T_Prescription 
								 WHERE	Flag	=	0);
	SELECT @APPOINTMENT_COUNT	AS	APPOINTMENT_COUNT
		  ,@DOCTOR_COUNT		AS	DOCTOR_COUNT
		  ,@PATIENT_COUNT		AS	PATIENT_COUNT
		  ,@PRESCRIPTION_COUNT	AS	PRESCRIPTION_COUNT

END;	  
GO
/****** Object:  StoredProcedure [dbo].[YYY_sp_InsertUser]    Script Date: 16/5/2023 17:23:12 ******/
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
/****** Object:  StoredProcedure [dbo].[YYY_sp_InstUpMessagesUser]    Script Date: 16/5/2023 17:23:12 ******/
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
/****** Object:  StoredProcedure [dbo].[YYY_sp_Load_PriceServicesId]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[YYY_sp_Load_PriceServicesId]
@CodeServices Nvarchar(12)
AS
BEGIN
SET NOCOUNT ON
SELECT *
FROM T_PriceServices
WHERE	Flags=1
  And	CodeServices=@CodeServices
END
GO
/****** Object:  StoredProcedure [dbo].[YYY_sp_Load_T_PriceServices]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[YYY_sp_Load_T_PriceServices]
@PAGINATION INT,
@COUNT INT OUTPUT
AS
BEGIN
SELECT CodeServices
		,Name     
		,Price	 
		,Images	 
		,CreateDate
FROM T_PriceServices
WHERE Flags=1
ORDER BY id
OFFSET @PAGINATION ROWS 
FETCH NEXT 6 ROWS ONLY;
SELECT @COUNT = (SELECT count(*) 
				 FROM T_PriceServices 
				 WHERE Flags=1);
END
GO
/****** Object:  StoredProcedure [dbo].[YYY_sp_LoadDashboard]    Script Date: 16/5/2023 17:23:12 ******/
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
/****** Object:  StoredProcedure [dbo].[yyy_sp_LoadData_Medicine]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[yyy_sp_LoadData_Medicine]
AS
BEGIN
SET NOCOUNT ON
	SELECT	T_Medicine .*
			,T_Medicine_Category.Name
  FROM	T_Medicine
  LEFT JOIN	T_Medicine_Category
	ON	T_Medicine.Medicine_Category_Id	=	T_Medicine_Category.Medicine_Category_Id
  WHERE	T_Medicine.Flag	=	0;
END;	  
GO
/****** Object:  StoredProcedure [dbo].[yyy_sp_LoadData_Medicine_Category]    Script Date: 16/5/2023 17:23:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[yyy_sp_LoadData_Medicine_Category]
AS
BEGIN
SET NOCOUNT ON
	SELECT *
	FROM [T_Medicine_Category] 
	WHERE Flag=0;
END;	  
GO
/****** Object:  StoredProcedure [dbo].[YYY_sp_LoadDataChatUsers]    Script Date: 16/5/2023 17:23:12 ******/
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
/****** Object:  StoredProcedure [dbo].[YYY_sp_LoadDataFriendChat]    Script Date: 16/5/2023 17:23:12 ******/
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
/****** Object:  StoredProcedure [dbo].[YYY_sp_UpdateInfoUser]    Script Date: 16/5/2023 17:23:12 ******/
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
/****** Object:  StoredProcedure [dbo].[YYY_sp_UpdateInfoUserLgoinFailed]    Script Date: 16/5/2023 17:23:12 ******/
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
