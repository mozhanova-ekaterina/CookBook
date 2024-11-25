export type TUser = {
  $id: string;
  accountId: string;
  email: string;
  name: string;
  posts?: TPost[];
  liked?: TPost[];
  avatarUrl?: URL;
};

export type TNewUser = {
  $id: string;
  name: string;
  email: string;
  password: string;
};

export type TPost = {
  $id: string;
  title: string;
  text: string;
  creator: TUser;
  createdAt: string;
  postImg: string;
  tags?: string[];
  likes?: TUser[];
};

export type TNewPost = {
  title: string;
  text: string;
  creator: string;
  tags?: string[];
  postImg: string;
};

