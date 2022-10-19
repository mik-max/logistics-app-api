BEGIN
UPDATE [dbo].[Otps]
SET [Status] = 'Expired'
   ,[HasExpired] = 1
   
WHERE [Otp] = @Otp AND [Status] = 'Created' AND [HasExpired] = 0
END