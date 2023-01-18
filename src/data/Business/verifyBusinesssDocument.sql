BEGIN
UPDATE [dbo].[BusinessDocuments]
   SET 
      [IsVerified] = 1
      ,[VerificationStatus] = 'Verified'
 WHERE [Id] = @Id AND [IsDeclined] = 0
 END