BEGIN
INSERT INTO [dbo].[Otps](
      [Otp]
     ,[EmailAddress]
     ,[DateCreated]
     ,[ExpiresAt]
     ,[Reference]   
)
VALUES (
     @otp,
     @emailAddress,
     @dateCreated,
     @expiresAt,
     @reference
);
END