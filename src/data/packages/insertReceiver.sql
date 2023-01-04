BEGIN

USE [LogisticsApp]
GO

INSERT INTO [dbo].[Receivers]
           ([Name]
           ,[PhoneNumber]
           ,[State]
           ,[LGA]
           ,[Address]
           ,[DateCreated])
     VALUES
           (@name
           ,@phoneNumber
           ,@state
           ,@lga
           ,@address
           ,@dateCreated)
GO

END