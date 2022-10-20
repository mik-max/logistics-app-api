BEGIN

INSERT INTO [dbo].[vehicles]
            ([VehicleTypeId]
           ,[Manufacturer]
           ,[Color]
           ,[LisencePlate]
           ,[Status]
           ,[DateCreated])
           
    VALUES(
        @vehicleTypeId,
        @manufacturer,
        @color,
        @lisencePlate,
        @status,
        @dateCreated
    ) 

    SELECT TOP (1000) [Id]
            ,[VehicleTypeId]
           ,[Manufacturer]
           ,[Color]
           ,[LisencePlate]
           ,[Status]
           ,[DateCreated]
FROM [LogisticsApp].[dbo].[DriverAccounts]
WHERE [Status] = @Status AND [IsDeleted] = 0

END