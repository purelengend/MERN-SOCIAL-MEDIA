import { UserType } from "../User";

export type UserDTO = UserType & {
  picture: File;
}