BEGIN

USE [LogisticsApp]


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

END