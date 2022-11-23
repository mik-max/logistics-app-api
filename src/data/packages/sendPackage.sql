BEGIN

-- DECLARE @recieverId INT

INSERT INTO [dbo].[Senders]
           ([UserId]
           ,[Name]
           ,[PhoneNumber]
           ,[State]
           ,[LGA]
           ,[Address]
           ,[DateCreated])
           
     VALUES
           (@userId
           ,@name
           ,@phoneNumber
           ,@state
           ,@lga
           ,@address
           ,@dateCreated)
-- OUTPUT INSERTED.[SenderId]
-- INTO [dbo].[Packages] ([SenderId])


-- INSERT INTO [dbo].[Receivers]
--            ([Name]
--            ,[PhoneNumber]
--            ,[State]
--            ,[LGA]
--            ,[Address]
--           ,[DateCreated])

--      VALUES
--            (@name
--            ,@phoneNumber
--            ,@state
--            ,@lga
--            ,@address
--            ,@dateCreated)


-- SET @recieverId = @@IDENTITY 
-- INSERT INTO [dbo].[Packages]
           ([Name] AS PackageName
           ,[Category]
           ,[Weight]
           ,[Quantity]
           ,[Value]
           ,[Description]
           ,[Image]
           ,[VehicleTypeId]
           ,[SenderId]
           ,[RecieverId]
           ,[DriverId]
          ,[DateCreated])
     VALUES
           (@name
           ,@category
           ,@weight
           ,@quantity
           ,@value
           ,@description
           ,@image
           ,@vehicleTypeId
           ,@senderId
           ,@recieverId
           ,@driverId
           ,@dateCreated)
END