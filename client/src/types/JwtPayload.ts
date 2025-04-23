export default interface IJwtPayload {
  data: {
    _id: string;
    username: string;
    email: string;
  };
  iat?: number;
  exp?: number;
}
