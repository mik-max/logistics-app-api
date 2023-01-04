BEGIN

INSERT INTO [dbo].[BusinessAccount]
           ([UserId]
           ,[TaxIdentificationNumber]
           ,[ProofOfAddress]
           ,[IncorporationDocument])
     VALUES
           (
               @UserId,
               @taxIdentificationNumber,
               @proofOfAddress,
               @incorporationDocument
           )

END