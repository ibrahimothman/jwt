# jwt
Simple Auth API
* Simple register endpoint
    * Validat request using @hapi/joi
    * Hasing password using bcrypt
* Simple login
    * Create and assign a token using jsonwebtoken after successful login
    * Verifying the token send with the request using jsonwebtoken

