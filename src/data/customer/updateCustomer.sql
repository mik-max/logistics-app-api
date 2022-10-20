BEGIN
UPDATE [dbo].[CustomerAccounts]
   SET [UserId] = @userId
      ,[Email] = @email
      ,[Password] = @password
      ,[PhoneNumber] = @phoneNumber
      ,[IsEmailConfirmed] = @isEmailConfirmed
      ,[IsPhoneNumberConfirmed] = @isPhoneNumberConfirmed
      ,[IsLockedOut] = @isLockedOut
      ,[LockedOutCount] = @lockedOutCount
      ,[LockedOutDate] = @lockedOutDate
      ,[DateCreated] = @dateCreated
      ,[DateModified] = @dateModified
      ,[IsDeleted] = @isDeleted
      ,[DateDeleted] = @dateDeleted
 WHERE [Id] = @Id AND [IsDeleted] = 0

SELECT [Id]
      ,[UserId]
      ,[Email]
      ,[Password]
      ,[PhoneNumber]
      ,[IsEmailConfirmed]
      ,[IsPhoneNumberConfirmed]
      ,[IsLockedOut]
      ,[LockedOutCount]
      ,[LockedOutDate]
      ,[DateCreated]
      ,[DateModified]
      ,[IsDeleted]
      ,[DateDeleted]
  FROM [dbo].[UserAccounts]
WHERE [Id] = @Id AND [IsDeleted] = 0
END