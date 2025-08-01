export type UserAuthInfo = {
  email: string;
  expiresIn: string;
  idToken: string;
  localId: string;
  refreshToken: string;
};

export type Payload = {
  email: string;
  password: string;
};

export enum OPERATION_TYPE {
  SIGNIN = "signInWithPassword",
  SIGNUP = "signUp",
}
