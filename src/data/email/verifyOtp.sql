BEGIN

UPDATE [dbo].[Otps]
SET [Status] = 'Verified'
   ,[IsVerified] = 1
WHERE [Otp] = @Otp AND [IsVerified] = 0


END
