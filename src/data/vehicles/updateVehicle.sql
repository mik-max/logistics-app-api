BEGIN

UPDATE [dbo].[Vehicles]
    SET [VehicleTypeId] =  @vehicleTypeId
        ,[Manufacturer] = @manufacturer
        ,[Color] =  @color
        ,[Model] = @model
       ,[ManufactureYear] = @manufactureYear
        ,[LisencePlate] = @lisencePlate
        ,[UserAccountId] = @userAccountId
        ,[Status] =  @status
        ,[DateModified] =  @dateModified

    WHERE [Id] = @Id AND [IsDeleted] = 0


       SET [VehicleTypeId] = <VehicleTypeId, tinyint,>
      ,[Manufacturer] = <Manufacturer, varchar(30),>
      ,[Color] = <Color, varchar(10),>
      ,[Model] = <Model, varchar(20),>
      ,[ManufactureYear] = <ManufactureYear, varchar(4),>
      ,[LisencePlate] = <LisencePlate, varchar(10),>
      ,[UserAccountId] = <UserAccountId, int,>
      ,[Status] = <Status, varchar(10),>
      ,[DateCreated] = <DateCreated, datetime2(7),>
      ,[dateModified] = <dateModified, datetime2(7),>
      ,[IsDeleted] = <IsDeleted, bit,>
      ,[DateDeleted] = <DateDeleted, datetime2(7),>

    SELECT TOP (1000) [Id]
            ,[VehicleTypeId]
           ,[Manufacturer] 
           ,[Color]
           ,[Model]
          ,[ManufactureYear] 
           ,[LisencePlate] 
           ,[UserAccountId]
           ,[Status] 
           ,[DateCreated] 
FROM [LogisticsApp].[dbo].[Vehicles]
WHERE [Id] = @Id AND [IsDeleted] = 0

END