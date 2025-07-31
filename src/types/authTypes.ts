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
