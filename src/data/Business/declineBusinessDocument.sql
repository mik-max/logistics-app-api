BEGIN
UPDATE [dbo].[BusinessDocuments]
   SET 
      [IsDeclined] = 1
      ,[VerificationStatus] = 'Declined'
 WHERE [Id] = @Id AND [IsVerified] = 0
 END