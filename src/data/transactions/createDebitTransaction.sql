BEGIN
INSERT INTO [dbo].[DebitTransactions](
     [PaymentMethodId]
      ,[BeneficiaryUserId]
      ,[SenderUserId]
      ,[Amount]
      ,[TransactionReference]
      ,[Charges]
      ,[CurrencyId]
      ,[Status]
      ,[DateCreated]
)
VALUES(
     @paymentMethodId,
     @beneficiaryUserId,
     @senderUserId,
     @amount,
     @transactionReference,
     @charges,
     @currencyId,
     'Transaction Created',
     @DateCreated
)

SELECT [Id]
      ,[DateCreated]
FROM [dbo].[DebitTransactions] 
WHERE [Id] = @@IDENTITY

END