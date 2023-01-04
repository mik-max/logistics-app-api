BEGIN

USE [LogisticsApp]
GO

INSERT INTO [dbo].[Senders]
           ([UserId]
           ,[Name]
           ,[PhoneNumber]
           ,[State]
           ,[LGA]
           ,[Address]
           ,[DateCreated])
     VALUES
           (@userId
           ,@name
           ,@phoneNumber
           ,@state
           ,@lga
           ,@address
           ,@dateCreated)
GO

END