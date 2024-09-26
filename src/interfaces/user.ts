export interface IUser {
  _id: string;
  username: string;
  password: string;
  fullname: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuthData {
  message: string;
  token: string;
  user: {
    id: string;
    username: string;
  };
  timestamp: number;
}
