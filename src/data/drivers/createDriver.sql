BEGIN

INSERT INTO [dbo].[DriverAccounts](
      [UserId]
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
)
 
VALUES(
      @userId,
      @roleId,
      @vehicleId,
      @email,
      @password,
      @bankName,
      @bankAccountName,
      @bankAccountNumber,
      @dateCreated,
      @dateModified,
      @isDeleted,
      @dateDeleted
)

INSERT INTO [dbo].[Users]
           ([FirstName]
            ,[LastName]
            ,[RoleId]
            ,[Email]
            ,[DateOfBirth]
            ,[PhoneNumber]
            ,[Address]
            ,[City]
            ,[State]
            ,[DateCreated])

     VALUES(
            @firstName,
           @lastName,
           @roleId,
           @email,
           @dateOfBirth,
           @phoneNumber,
           @address,
           @city,
           @state,
           @dateCreated
        )
END