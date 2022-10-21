BEGIN
INSERT INTO [dbo].[Otps](
      [Otp]
     ,[EmailAddress]
     ,[DateCreated]
     ,[ExpiresAt]   
)
VALUES (
     @otp,
     @emailAddress,
     @dateCreated,
     @expiresAt
);
END