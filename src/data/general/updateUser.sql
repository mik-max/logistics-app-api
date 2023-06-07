BEGIN

UPDATE [dbo].[Users]
SET [DateOfBirth] = @dateOfBirth
    ,[PhoneNumber] = @phoneNumber
    ,[Address] = @address
    ,[City] =  @city
    ,[State] =  @state
    ,[DateModified] = @dateModified
WHERE [Id] = @Id AND [IsDeleted] = 0
END