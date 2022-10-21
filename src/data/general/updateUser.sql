BEGIN

UPDATE [dbo].[Users]
SET   [FirstName] = @firstName
    ,[LastName] = @lastName
    ,[RoleId] = @roleId
    ,[Email] =  @email
    ,[DateOfBirth] = @dateOfBirth
    ,[PhoneNumber] = @phoneNumber
    ,[Address] = @address
    ,[City] =  @city
    ,[State] =  @state
    ,[DateCreated] = @dateCreated
WHERE [Id] = @Id AND [IsDeleted] = 0
END