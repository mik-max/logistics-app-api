BEGIN


INSERT INTO [dbo].[Vehicles]
           ([VehicleTypeId]
           ,[Manufacturer]
           ,[Color]
           ,[Model]
           ,[ManufactureYear]
           ,[LisencePlate]
           ,[UserAccountId]
           ,[Status]
           ,[DateCreated]
)
           
VALUES(
        @vehicleTypeId,
        @manufacturer,
        @color,
        @model,
        @manufactureYear
        @lisencePlate,
        @userAccountId,
        @status,
        @dateCreated
) 

SELECT [Id]
      ,[VehicleTypeId]
      ,[Manufacturer]
      ,[Color]
      ,[Model]
      ,[ManufactureYear]
      ,[LisencePlate]
      ,[UserAccountId]
      ,[Status]
      ,[DateCreated]
      ,[dateModified]
      ,[IsDeleted]
      ,[DateDeleted]
  FROM [dbo].[Vehicles]
WHERE [Status] = @status AND [IsDeleted] = 0

END