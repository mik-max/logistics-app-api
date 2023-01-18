BEGIN

SELECT 
      [UserAccountId]
      ,[FirstName]
      ,[LastName]
      ,[DateOfBirth]
      ,[Address]
      ,[City]
      ,[State]
  FROM [dbo].[Users]
  WHERE [Id] = @id AND [IsDeleted] = 0
  
END