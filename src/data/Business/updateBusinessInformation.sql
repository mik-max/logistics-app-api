BEGIN
INSERT INTO [dbo].[Business]
           ([UserAccountId]
           ,[Name]
           ,[Address]
           ,[City]
           ,[State]
           ,[InceptionDate]
           ,[DateCreated])
     VALUES
           (@userAccountId
           ,@name
           ,@address
           ,@city
           ,@state
           ,@inceptionDate
           ,@dateCreated
           )
END