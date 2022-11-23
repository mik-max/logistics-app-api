BEGIN
INSERT INTO [dbo].[EscrowTransactions](
     [DebitTransactionId]
     ,[Status]
      ,[DateCreated]
      ,[DateCompleted]
)
VALUES(
     @debitTransactionId,
     'Transaction Completed',
     @dateCreated,
     @dateCompleted
)
END