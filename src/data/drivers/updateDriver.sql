BEGIN
UPDATE [dbo].[DriverAccounts]
   SET [RoleId] = @roleId
      ,[VehicleId] = @vehicleId
      ,[Email] = @email
      ,[Password] = @password
      ,[BankName] = @bankName
      ,[BankAccountName] = @bankAccountName
      ,[BankAccountNumber] = @bankAccountNumber
      ,[DateCreated] = @dateCreated
      ,[DateModified] = @dateModified
      ,[IsDeleted] = @dateModified
      ,[DateDeleted] = @dateDeleted
 WHERE [Id] = @Id AND [IsDeleted] = 0

SELECT TOP (1000) [Id]
      ,[UserId]
      ,[RoleId]
      ,[VehicleId]
      ,[Email]
      ,[Password]
      ,[BankName]
      ,[BankAccountName] 
      ,[BankAccountNumber]
      ,[DateCreated]
      ,[DateModified]
      ,[IsDeleted]
      ,[DateDeleted]
FROM [LogisticsApp].[dbo].[DriverAccounts]
WHERE [Id] = @Id AND [IsDeleted] = 0

END