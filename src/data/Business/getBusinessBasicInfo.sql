BEGIN

SELECT 
      [UserAccountId]
      ,[Name]
      ,[Address]
      ,[City]
      ,[State]
      ,[InceptionDate]
  FROM [dbo].[Business]
  WHERE [Id] = @id AND [IsDeleted] = 0

END


