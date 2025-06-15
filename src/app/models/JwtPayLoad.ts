export interface JwtPayLoad {
    // Include other fields that are part of the JWT payload
    exp: number;   // The expiration timestamp of the token
    iat: number;   // The issued at timestamp of the token
    role: string;  // Add the 'role' property to match the role in the payload
  }
  