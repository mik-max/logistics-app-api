BEGIN

SELECT [dbo].[Users].[Id]
      ,[DriverAccountId]
      ,[StateId]
      ,[Rating]
      ,[FirstName]
      ,[LastName]
      ,[dbo].[Users].[Email] 
      ,[dbo].[UserAccounts].[PhoneNumber]
      ,[Address]
      ,[City]
      ,[State]
      ,[LisencePlate]
       ,[dbo].[VehicleTypes].[Name]

  FROM [LogisticsApp].[dbo].[DriverStateRoutes]
  inner join  [LogisticsApp].[dbo].[DriverAccounts] on [dbo].[DriverAccounts].[Id] = [dbo].[DriverStateRoutes].[DriverAccountId]
  inner join [LogisticsApp].[dbo].[Users] on [dbo].[Users].[Id] = [dbo].[DriverAccounts].[UserId]
  inner join [LogisticsApp].[dbo].[UserAccounts] on [dbo].[Users].[Id] = [dbo].[UserAccounts].[UserId]
  inner join [LogisticsApp].[dbo].[Vehicles] on [dbo].[Users].[Id] = [dbo].[Vehicles].[AddedByUserId]
  inner join [LogisticsApp].[dbo].[VehicleTypes] on  [dbo].[VehicleTypes].[Id] = [dbo].[Vehicles].[VehicleTypeId]
  WHERE [dbo].[DriverStateRoutes].[StateId] = @stateId AND [dbo].[UserAccounts].[IsDeleted] = 0


END