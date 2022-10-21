BEGIN
UPDATE [dbo].[Otps]
SET [Status] = 'Expired'
   ,[HasExpired] = 1
   
WHERE [Otp] = @Otp AND [Status] = 'Active' AND [HasExpired] = 0
END