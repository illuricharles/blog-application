import { CredentialsSignin } from "next-auth";

export type SigInInErrorCodeType = "InvalidCredentials" | "VerifyEmail";

export class VerifyEmail extends CredentialsSignin {
  code: SigInInErrorCodeType = "VerifyEmail";
}

export class InvalidCredentials extends CredentialsSignin {
  code: SigInInErrorCodeType = "InvalidCredentials";
}
