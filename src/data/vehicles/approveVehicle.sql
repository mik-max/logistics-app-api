BEGIN

UPDATE [dbo].[Vehicles]
SET [Status] = 'Approved'
    ,[DateModified] =  @dateModified
        
WHERE [Id] = @Id AND [IsDeleted] = 0

SELECT TOP (1000) [Id]
            ,[VehicleTypeId]
           ,[Manufacturer] 
           ,[Color]
           ,[LisencePlate] 
           ,[Status] 
           ,[DateCreated] 
FROM [LogisticsApp].[dbo].[Vehicles]
WHERE [Id] = @Id AND [IsDeleted] = 0

END