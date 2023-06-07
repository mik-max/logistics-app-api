BEGIN

UPDATE [dbo].[DebitTransactions]
     SET [Status] = 'Transaction Completed'
     ,[DateModified] = @dateModified
     WHERE [Id] = @Id
END