BEGIN
SELECT [Otp]
      ,[EmailAddress]
      ,[Status]
      ,[HasExpired]
      ,[IsVerified]
      ,[ExpiresAt]
FROM [LogisticsApp].[dbo].[Otps]
WHERE [Otp] = @Otp AND [IsVerified] = 0
END