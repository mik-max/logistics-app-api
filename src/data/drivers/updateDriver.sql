BEGIN
UPDATE [dbo].[DriverAccounts]
   SET [DriverLisence] = @driverLisence
     ,[VehicleId] = @vehicleId
     ,[IsPlyingInterState] = @isPlyingInterState
     ,[Rating] = @rating
     ,[DateModified] = @dateModified

WHERE [Id] = @id AND [IsDeleted] = 0

-- UPDATE [dbo].[DriverStates]
--    SET [DriverAccountId] = <DriverAccountId, int,>
--       ,[StateId] = <StateId, int,>
--  WHERE <Search Conditions,,>
-- GO

SELECT TOP (1000) [Id]
      ,[UserId]
      ,[DriverLisence]
      ,[VehicleId]
      ,[IsPlyingInterState]
      ,[Rating]
      ,[DateCreated]
      ,[DateModified]
      ,[IsDeleted]
      ,[DateDeleted]
  FROM [LogisticsApp].[dbo].[DriverAccounts]
WHERE [Id] = @id AND [IsDeleted] = 0

END