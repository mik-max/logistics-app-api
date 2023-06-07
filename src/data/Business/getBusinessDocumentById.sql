BEGIN
SELECT [Id]
      ,[BusinessId]
      ,[DocumentTypeId]
      ,[dbo].[DocumentTypes].[Name] as DocumentName
      ,[VerificationStatus]
  FROM [dbo].[BusinessDocuments]
  inner join [dbo].[DocumentTypes] on [dbo].[BusinessDocuments].[DocumentTypeId] = [dbo].[DocumentTypes].[Id]
  WHERE [dbo].[BusinessDocuments].[BusinessId] = @businessId
END