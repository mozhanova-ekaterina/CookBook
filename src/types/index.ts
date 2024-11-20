export type TUser = {
  accountId: string
  email: string;
  name: string;
  posts: TPost[]
  liked: TPost[]
}

export type TNewUser = {
  $id: string;
  name: string;
  email: string;
  password: string;
}

export type TPost = {
  title: string;
  text: string;
  creator: TUser;
  imageUrl: string;
  tags?: string[];
  $id: string;
  createdAt: string
  likes?: TUser[]
}

export type TNewPost = {
  title: string;
  text: string;
  tags?: string[];
  imageUrl: string;
  creator: TUser;
}
