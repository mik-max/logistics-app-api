select
	[FirstName]
      ,[LastName]
      ,[RoleId]
      ,[dbo].[Users].[Email] 
	  ,[UserId]
	  ,[Name] as Role
 FROM [LogisticsApp].[dbo].[Users]
 inner join [LogisticsApp].[dbo].[UserAccounts] on [dbo].[Users].[Id] = [dbo].[UserAccounts].[UserId]
 inner join [LogisticsApp].[dbo].[Roles] on  .[dbo].[Roles].[Id] = [dbo].[Users].[RoleId]
 Where [dbo].[UserAccounts].[Email] = @email AND [dbo].[UserAccounts].[Password] = @password AND [dbo].[UserAccounts].[IsDeleted] = 0