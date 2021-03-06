USE [DBApi]
GO
/****** Object:  UserDefinedFunction [dbo].[SplitString]    Script Date: 15/01/2022 21:35:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[SplitString]
(
 @String NVARCHAR (max)
)
 
RETURNS @table TABLE ( id VARCHAR(50),value_ID int )
AS
 
BEGIN
DECLARE @id_list VARCHAR(MAX) = @String

DECLARE @loc INT = 0
DECLARE @first INT = 0
DECLARE @next INT = 0
declare @count int=0 ;
SET @loc = LEN(@id_list) - LEN(REPLACE(@id_list, ',', '')) + 1 

WHILE @loc > 0
    BEGIN
	set @count =@count +1
        SET @next = CASE WHEN CHARINDEX(',', @id_list, @first + 1) = 0
                              THEN LEN(@id_list) + 1
                              ELSE CHARINDEX(',', @id_list, @first + 1)
                         END
        INSERT  INTO @table
        VALUES  ( SUBSTRING(@id_list, @first + 1, (@next - @first) - 1),@count)
        SET @first = CHARINDEX(',', @id_list, @first + 1)
        SET @loc = @loc - 1
    END
 return 
END
GO
/****** Object:  Table [dbo].[Category]    Script Date: 15/01/2022 21:35:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Category](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[masp] [nvarchar](500) NULL,
	[tensp] [nvarchar](500) NULL,
	[ngaytao] [date] NULL,
	[ngaysua] [date] NULL,
	[state] [int] NULL,
 CONSTRAINT [PK_Category] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Login]    Script Date: 15/01/2022 21:35:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Login](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](500) NULL,
	[Password] [nvarchar](500) NULL,
	[ngaytao] [date] NULL,
	[ngaysua] [date] NULL,
	[State] [int] NULL,
 CONSTRAINT [PK_Login] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Product]    Script Date: 15/01/2022 21:35:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Product](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[emp_id] [int] NULL,
	[masp] [nvarchar](500) NULL,
	[tensp] [nvarchar](500) NULL,
	[ngaytao] [date] NULL,
	[ngaysua] [date] NULL,
	[state] [int] NULL,
 CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TestStore]    Script Date: 15/01/2022 21:35:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TestStore](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[value_id] [nchar](10) NULL
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[CategoryExecute]    Script Date: 15/01/2022 21:35:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CategoryExecute] 
 @id int,
 @masp nvarchar(500),
 @tensp nvarchar(500),
 @StatementType NVARCHAR(10)
AS
BEGIN
   declare @res int
   declare @erron int
	if @StatementType ='insert'
		BEGIN
		set @res=(select count(*) from Category where masp=@masp and state=1)
				if (@res !=1)
				begin
					INSERT INTO Category(masp,tensp,ngaytao,state)VALUES(@masp,@tensp,GETDATE(),1)
					set @erron=1
				end
				else
					BEGIN
						set @erron=0
					END
				select @erron as ResponseCode
        END
	if @StatementType ='update'
		BEGIN
			set @res=(select count(*) from Category where id=@id and State=1)
				if (@res =1)
				begin
					update Category set masp=@masp,tensp=@tensp,ngaysua=GETDATE() where id=@id
					set @erron=1
				end
				else
				BEGIN
					set @erron=0
				END
				select @erron as ResponseCode
        END
	else if @StatementType ='delete'
		BEGIN
			set @res=(select count(*) from Category where id=@id and State=1)
			if (@res =1)
				begin
					update Category set ngaysua=GETDATE(),state=0 where id=@id
					set @erron=1
				end
			else
				begin
					set @erron=0
				end
				select @erron as ResponseCode
        END
END
GO
/****** Object:  StoredProcedure [dbo].[CategoryLoad]    Script Date: 15/01/2022 21:35:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[CategoryLoad]
 @id int,
@key nvarchar(500)
AS
BEGIN
declare @erron int
	if @key='97D28170-5DA7-43B4-BC0D-AD011A9FAFC8'
	begin
	if @id != 0
		BEGIN
		 select * from Category where id=@id and State=1
		END
	else
		BEGIN
			select * from Category where State=1
		END
	set @erron=1
	end
	else
	BEGIN 
	set @erron=0
	END
	select @erron as ResponseCode
END
GO
/****** Object:  StoredProcedure [dbo].[LoginDO]    Script Date: 15/01/2022 21:35:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LoginDO]
@username nvarchar(500),
@pass nvarchar(500)
AS
BEGIN
declare @res int
declare @erron int
	set @res=(select count(*) from Login where UserName=@username and Password=CONVERT(nvarchar(32),HASHBYTES('MD5',@pass),2)and State=1)
	if @res != 0
	BEGIN
	 set @erron=1
	END
	else
	BEGIN
	 set @erron=0
	END
	select @erron as ResponseCode
END
GO
/****** Object:  StoredProcedure [dbo].[LoginExecute]    Script Date: 15/01/2022 21:35:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LoginExecute]
@id int,
@username nvarchar(500),
@pass nvarchar(500),
@type nvarchar(10)
AS
BEGIN
declare @res int
declare @erron int
	if @type='insert'
	BEGIN
		set @res=(select count(*)from Login where UserName=@username and State=1)
		if @res!=1
			BEGIN
			Insert into Login(UserName,Password,ngaytao,State) values(@username,CONVERT(NVARCHAR(32), HashBytes('MD5', @pass), 2),GETDATE(),1)
			set @erron=1
			END
		else
			BEGIN
			set @erron=0
			END
			select @erron as ResponseCode
	END
	if @type='update'
	BEGIN
			set @res=(select count(*) from Login where id=@id and State=1)
				if (@res =1)
				begin
					update Login set UserName=@username,Password=CONVERT(NVARCHAR(32), HashBytes('MD5', @pass), 2),ngaysua=GETDATE() where id=@id
					set @erron=1
				end
				else
				BEGIN
					set @erron=0
				END
				select @erron as ResponseCode
        END
	else if @type='delete'
	BEGIN
			set @res=(select count(*) from Login where id=@id and State=1)
			if (@res =1)
				begin
					update Login set ngaysua=getdate(),state=0 where id=@id
					set @erron=1
				end
			else
				begin
					set @erron=0
				end
				select @erron as ResponseCode
        END
END
GO
/****** Object:  StoredProcedure [dbo].[LoginLoad]    Script Date: 15/01/2022 21:35:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[LoginLoad]
@id int,
@key nvarchar(500)
AS
BEGIN
declare @erron int
if @key= '97D28170-5DA7-43B4-BC0D-AD011A9FAFC8'
	BEGIN
	set @erron =1
	if @id != 0
		BEGIN
		 select * from Login where id=@id and State=1
		END
		else
		BEGIN
		 select * from Login where State=1
		END
	END
else
	BEGIN
	set @erron =0
	END
	select @erron as ResponseCode
END
GO
/****** Object:  StoredProcedure [dbo].[ProcductLoad]    Script Date: 15/01/2022 21:35:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ProcductLoad] 
@id int,
@key nvarchar(500)
AS
BEGIN
declare @erron int
if @key= '97D28170-5DA7-43B4-BC0D-AD011A9FAFC8'
	BEGIN
	set @erron =1
	if @id != 0
		BEGIN
		 select * from Product where id=@id and State=1
		END
		else
		BEGIN
		 select * from Product where State=1
		END
	END
else
	BEGIN
	set @erron =0
	END
	select @erron as ResponseCode
END
GO
/****** Object:  StoredProcedure [dbo].[ProductCkeckempidCatetory]    Script Date: 15/01/2022 21:35:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ProductCkeckempidCatetory]
@EMP_ID INT
AS
BEGIN
DECLARE @eron int
DECLARE @res int
 set @res=(select count(*) from Category where id=@EMP_ID and state=1)
 if @res !=0
 BEGIN
  SET @eron =1
 END
 ELSE
 BEGIN
 SET @eron=0
 END
 SELECT @eron as ResponseCode
END
GO
/****** Object:  StoredProcedure [dbo].[PRODUCTExecute]    Script Date: 15/01/2022 21:35:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[PRODUCTExecute]
@id int,
@emp_id int,
@masp nvarchar(500),
@tensp nvarchar(500),
@type nchar(10)
AS
BEGIN
declare @erron int
declare @res int
	if(@type='insert')
	BEGIN
		set @res=(select count(*) from Product where masp=@masp and state=1)
		if(@res !=1)
			BEGIN 
				insert into Product(emp_id,masp,tensp,ngaytao,state)values(@emp_id,@masp,@tensp,GETDATE(),1)
				set @erron=1
			END
		else
			BEGIN
				set @erron=0
			END
	select @erron as ResponseCode
	END
	if(@type='update')
	BEGIN
		set @res=(select count(*) from Product where id=@id and state=1)
		if(@res =1)
			BEGIN 
			update Product set emp_id=@emp_id,masp=@masp,tensp=@tensp,ngaysua=GETDATE() where id=@id and state=1
				set @erron=1
			END
		else
			BEGIN
				set @erron=0
			END
	select @erron as ResponseCode
	END
	else if(@type='delete')
	BEGIN
		set @res=(select count(*) from Product where id=@id and state=1)
		if(@res =1)
			BEGIN 
				update Product set ngaysua=GETDATE(),state=0 where id=@id 
				set @erron=1
			END
		else
			BEGIN
				set @erron=0
			END
	select @erron as ResponseCode
	END
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateLoginPass]    Script Date: 15/01/2022 21:35:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UpdateLoginPass] 
@id int
AS
BEGIN
declare @res int
declare @erron int
		set @res=(select count(*) from Login where id=@id and State=1)
			if (@res =1)
			begin
				update Login set Password=CONVERT(NVARCHAR(32), HashBytes('MD5',N'123456'), 2),ngaysua=GETDATE() where id=@id
				set @erron=1
			end
			else
			BEGIN
				set @erron=0
			END
			select @erron as ResponseCode
END
GO
/****** Object:  StoredProcedure [dbo].[YYY_sp_Doc_Page_Read_LoadElemets]    Script Date: 15/01/2022 21:35:02 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[YYY_sp_Doc_Page_Read_LoadElemets]
@elements nvarchar(MAX) = '5134,39,40,41,42,43,20,'
AS
BEGIN
	CREATE TABLE #TEMP(
		ID INT
		,Name NVARCHAR(200)
		,Text NVARCHAR(MAX)
		,[Order] INT 
		,Html_Tag NVARCHAR(50)
		,Link NVARCHAR(MAX)
		,Tag NVARCHAR(200)
		,Type INT
		, Priority INT
		, Created DATETIME
	)
	
	declare @len int, @loc int = 1,@count int=0
	declare @res nvarchar(500)
    While @loc <= len(@elements) 
    Begin
	set @count=@count+1
        Set @len = CHARINDEX(',', @elements, @loc) - @loc
        If @Len < 0 Set @Len = len(@elements)
		set @res=(select id from dbo.SplitString(@elements) where id !='' and value_ID=@count)
        Insert Into #TEMP(ID,Name,Text,[Order],Html_Tag,Link,Tag,Type,Priority,Created)
		values((select id from dbo.SplitString(@elements) where id !='' and value_ID=@count),'','',0,'','','',0,0,GETDATE())
        Set @loc = @loc + @len + 1
    End
	SELECT T.id , T.value_id
	FROM TestStore as T JOIN #TEMP AS E on T.value_id=E.ID 
END
GO
