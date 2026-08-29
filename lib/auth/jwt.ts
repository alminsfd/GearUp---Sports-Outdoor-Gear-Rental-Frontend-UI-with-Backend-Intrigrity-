import jwt, { JwtPayload } from "jsonwebtoken";

interface VerifyTokenResult {
     success: boolean;
     data?: string | JwtPayload;
     error?: string;
}

const verifyToken = (token: string, secret: string): VerifyTokenResult => {
     try {
          const verifiedToken = jwt.verify(token, secret);
          return {
               success: true,
               data: verifiedToken,
          };
     } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : "Token verification failed";
          console.log("Token verification failed:", errorMessage);
          return {
               success: false,
               error: errorMessage,
          };
     }
};

export const jwtUtils = {
     verifyToken,
};