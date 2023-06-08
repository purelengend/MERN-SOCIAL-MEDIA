export interface Post {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  location: string;
  description: string;
  picturePath: string;
  userPicturePath: string;
  likes: Map<string, boolean>;
  comments: string[];
  createdAt: Date;
  updatedAt: Date;
}