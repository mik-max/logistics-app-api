BEGIN
DECLARE @userId INT

INSERT INTO [dbo].[Users](
     [FirstName]
     ,[LastName]
     ,[RoleId]
     ,[Email]
     ,[DateCreated]
)

VALUES(
     @firstName,
     @lastName,
     @roleId,
     @email,
     @dateCreated
);
SET @userId = @@IDENTITY
INSERT INTO [dbo].[UserAccounts](
     [UserId]
      ,[Email]
      ,[Password]
      ,[DateCreated]
)
VALUES(
      @userId,
      @email,
      @password,
      @dateCreated
)

END