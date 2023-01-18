BEGIN

INSERT INTO [dbo].[BusinessDocuments]
           ([BusinessId]
           ,[Value]
           ,[DocumentTypeId])
     VALUES
           (
               @businessId,
               @value,
               @documentTypeId,
           )

END