BEGIN

INSERT INTO [dbo].[Users](
     [UserAccountId]
     ,[FirstName]
     ,[LastName]
     ,[DateOfBirth]
     ,[Address]
     ,[City]
     ,[State]
     ,[DateCreated]
)

VALUES (
     @userAccountId
     ,@firstName
     ,@lastName
     ,@dateOfBirth
     ,@address
     ,@city
     ,@state
     ,@dateCreated
)

END


