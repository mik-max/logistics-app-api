BEGIN

UPDATE [dbo].[DebitTransactions]
     SET [Status] = 'Transaction Pending'
     ,[DateModified] = @dateModified
     ,[ExternalReference] = @externalReference

     WHERE [Id] = @Id
END