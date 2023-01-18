BEGIN
DECLARE @userAccountId INT

SELECT [Id]
      ,[Email]
      ,[PhoneNumber]
      ,[WishToDrive]
      ,[HasUploadedBasicInformation]
      ,[RoleId]
FROM [dbo].[UserAccounts]

INNER jOIN [LogisticsApp].[dbo].[UserRoles] on [dbo].[UserAccounts].[Id] = [dbo].[UserRoles].[UserAccountId]
WHERE [dbo].[UserAccounts].[Email] = @email AND [dbo].[UserAccounts].[Password] = @password AND [dbo].[UserAccounts].[IsDeleted] = 0

SET @userAccountId == @@IDENTITY

INSERT INTO [dbo].[UserLogins](
     [UserAccountId]
     ,[LoginTime]
)

VALUES(
     @userAccountId
     ,@loginTime
)
END