BEGIN
DECLARE @userId INT

INSERT INTO [dbo].[Users](
     [BusinessName]
     ,[RoleId]
     ,[Email]
     ,[DateCreated]
)

VALUES(
     @businessName,
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