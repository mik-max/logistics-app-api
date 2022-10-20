BEGIN

INSERT INTO [dbo].[Users]
           ([FirstName]
            ,[LastName]
            ,[RoleId]
            ,[Email]  
            ,[DateCreated])

     VALUES(
            @firstName,
           @lastName,
           @roleId,
           @email,
           @dateCreated
        )
END