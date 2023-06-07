BEGIN
DECLARE @userAccountId INT


INSERT INTO [dbo].[UserAccounts](
      [Email]
      ,[Password]
      ,[WishToDrive]
      ,[DateCreated]
)
VALUES(
      @email,
      @password,
      @wishToDrive,
      @dateCreated
)
SET @userAccountId = @@IDENTITY
INSERT INTO [dbo].[UserRoles](
     [UserAccountId]
     ,[RoleId]
     ,[DateCreated]
)

VALUES(
     @userAccountId,
     @roleId,
     @dateCreated
);


END