export interface RegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  occupation: string;
  picture: File;
}

export interface LoginUser {
  email: string;
  password: string;

}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  occupation: string;
  picturePath: string;
  viewedProfile: number;
  impressions: number;
  friends: User[];
}