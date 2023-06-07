BEGIN
INSERT INTO [dbo].[Charges](
     [ChargeTypeId]
     ,[Value]
     ,[DebitTransactionId]
     ,[DateCreated]
)
VALUES(
     @chargeTypeId,
     @value,
     @debitTransactionId,
     @dateCreated
)
END