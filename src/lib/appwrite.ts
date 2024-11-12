import { Client, Account, Databases, Storage } from "appwrite";

export const client = new Client();
export const account = new Account(client);
export { ID } from "appwrite";
export const DB = new Databases(client);
export const storage = new Storage(client);
export const COLLECTION_POSTS_ID = '6730979100128f80b44e'
export const STORAGE_ID = '67309ab5002b053129d5'
export const DB_ID = '673097830009ff0321dd'
export const PROJECT_ID = '672ca8b30033f5188130'

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);