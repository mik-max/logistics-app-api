BEGIN

UPDATE [dbo].[UserAccounts]
   SET [UserId] = <UserId, int,>
      ,[IsLoggedinBefore] = 0
      ,[LoginDate] = @loginDate
      ,[DateModified] = @dateModified
 WHERE [Id] = @id

END