BEGIN

INSERT INTO [dbo].[DriverStateRoutes]
           ([DriverAccountId]
           ,[StateId]
           ,[DateCreated])

VALUES(
     @driverAccountId
     ,@stateId
     ,@dateCreated
     )

END