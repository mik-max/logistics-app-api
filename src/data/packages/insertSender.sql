BEGIN

INSERT INTO [dbo].[Senders]
           ([UserAccountId]
           ,[Name]
           ,[PhoneNumber]
           ,[State]
           ,[LGA]
           ,[Address]
           ,[DateCreated])
     VALUES
           (@userAccountId
           ,@name
           ,@phoneNumber
           ,@state
           ,@lga
           ,@address
           ,@dateCreated)

END