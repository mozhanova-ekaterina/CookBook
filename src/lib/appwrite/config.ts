import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  databaseId: import.meta.env.VITE_APPWRITE_DB_ID,
  collectionPostsId: import.meta.env.VITE_APPWRITE_COLLECTION_POSTS_ID,
  collectionSavesId: import.meta.env.VITE_APPWRITE_COLLECTION_SAVES_ID,
  collectionUsersId: import.meta.env.VITE_APPWRITE_COLLECTION_USERS_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
}

export const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const DB = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

