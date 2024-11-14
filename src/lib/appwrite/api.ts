import { ID } from "appwrite";
import { TNewUser } from "../../types";
import { account, appwriteConfig, DB, storage } from "./config";

export async function appwriteCreateAccount(user: TNewUser) {
  try {
    const newUser = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    )
      .then((newAccount) => {
        return appwriteCreateDocument(newAccount, appwriteConfig.collectionUsersId)
      })

    return newUser
  } catch (error) {
    console.warn(error);
    return error
  }
}

export async function appwriteLogin(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session
  } catch (error) {
    console.warn(error);
    return error
  }
}

export async function appwriteLogout() {
  try {
    const res = await account.deleteSession("current");
    return res
  } catch (error) {
    console.warn(error);
    return error
  }
}

export async function appwriteGetMe() {
  try {
    const user = account.get();
    return user
  } catch (error) {
    console.warn(error);
    return error
  }
}

export async function appwriteUploadFile(file: File) {
  try {
    const newFile = await storage.createFile(
      appwriteConfig.storageId, ID.unique(), file
    ).then(res => {
      return storage.getFilePreview(appwriteConfig.storageId, res.$id)
    })
    return newFile
  } catch (error) {
    console.warn(error);
    return error
  }
}

export async function appwriteCreateDocument(document: {}, collectionId: string) {
  try {
    const newDocument = await DB.createDocument(
      appwriteConfig.databaseId,
      collectionId,
      ID.unique(),
      document)
    return newDocument
  } catch (error) {
    console.warn(error);
    return error
  }
}

export async function appwriteGetCollection(collectionId: string) {
  try {
    const data = DB.listDocuments(appwriteConfig.databaseId, collectionId);
    return data
  } catch (error) {
    console.warn(error);
    return error
  }
}

export async function appwriteDeleteDocument(documentId: string, collectionId: string) {
  try {
    if (window.confirm("Удалить рецепт?")) {
      await DB.deleteDocument(appwriteConfig.databaseId, collectionId, documentId);
    }
  } catch (error) {
    console.warn(error);
    return error
  }
}