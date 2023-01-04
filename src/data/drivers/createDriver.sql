BEGIN
DECLARE @userId INT

INSERT INTO [dbo].[Users]
           ([FirstName]
          ,[LastName]
          ,[RoleId]
          ,[Email]
          ,[DateOfBirth]
          ,[DateCreated])

     VALUES(
            @firstName, 
           @lastName,
           @roleId,
           @email,
           @dateOfBirth,
           @dateCreated
)
SET @userId = @@IDENTITY
INSERT INTO [dbo].[UserAccounts](
     [UserId]
     ,[Email]
     ,[Password]
     ,[WishToDrive]
     ,[DateCreated]
)
VALUES(
      @userId,
      @email,
      @password,
      @wishToDrive,
      @dateCreated
)

END
