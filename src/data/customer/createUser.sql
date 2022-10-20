BEGIN

INSERT INTO [dbo].[UserAccounts]
           ([UserId]
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
           ,[DateDeleted])

     VALUES(
            @userId,
           @email,
           @password,
           @isEmailConfirmed,
           @isPhoneNumberConfirmed,
           @isLockedOut,
           @lockedOutCount,
           @lockedOutDate,
           @dateCreated,
           @dateModified,
           @isDeleted,
           @dateDeleted
        )
END