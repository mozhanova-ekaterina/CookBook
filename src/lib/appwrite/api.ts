import { ID, Query } from "appwrite";
import { TNewUser } from "../../types";
import { account, appwriteConfig, avatars, DB, storage } from "./config";

export async function appwriteCreateAccount(user: TNewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(user.name);
    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      avatarUrl: avatarUrl,
    });
    return newUser;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  avatarUrl: URL;
}) {
  try {
    const newUser = await DB.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collectionUsersId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function appwriteCreateSession(user: {
  email: string;
  password: string;
}) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );

    return session;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function appwriteGetCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await DB.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.collectionUsersId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function appwriteLogout() {
  try {
    const res = await account.deleteSession("current");
    return res;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function appwriteUploadFile(file: File) {
  try {
    const newFile = await storage
      .createFile(appwriteConfig.storageId, ID.unique(), file)
      .then((file) => appwriteGetPreview(file.$id));

    return newFile;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function appwriteGetPreview(fileId: string) {
  try {
    return storage.getFilePreview(appwriteConfig.storageId, fileId, 300, 200);
  } catch (error) {
    console.error(error);
    await appwriteDeleteFile(fileId);
    throw error;
  }
}

export async function appwriteDeleteFile(fileId: string) {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function appwriteCreateDocument(
  document: {},
  collectionId: string
) {
  try {
    const newDocument = await DB.createDocument(
      appwriteConfig.databaseId,
      collectionId,
      ID.unique(),
      document
    );
    return newDocument;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function appwriteGetCollection(collectionId: string) {
  try {
    const data = await DB.listDocuments(
      appwriteConfig.databaseId,
      collectionId
    );
    return data.documents;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function appwriteDeleteDocument(
  documentId: string,
  collectionId: string
) {
  try {
    if (window.confirm("Удалить рецепт?")) {
      await DB.deleteDocument(
        appwriteConfig.databaseId,
        collectionId,
        documentId
      );
    }
  } catch (error) {
    console.error(error);
    return error;
  }
} 
