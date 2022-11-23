BEGIN

INSERT INTO [dbo].[Vehicles]
            ([VehicleTypeId]
           ,[Manufacturer]
           ,[Color]
           ,[LisencePlate]
           ,[AddedByUserId]
           ,[Status]
           ,[DateCreated])
           
    VALUES(
        @vehicleTypeId,
        @manufacturer,
        @color,
        @lisencePlate,
        @addedByUserId,
        @status,
        @dateCreated
    ) 

SELECT [Id]
      ,[VehicleTypeId]
      ,[Manufacturer]
      ,[Color]
      ,[LisencePlate]
      ,[AddedByUserId]
      ,[Status]
      ,[DateCreated]
      ,[dateModified]
      ,[IsDeleted]
      ,[DateDeleted]
  FROM [dbo].[Vehicles]
WHERE [Status] = @status AND [IsDeleted] = 0

END