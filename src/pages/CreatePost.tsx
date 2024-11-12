import { PiUploadSimpleLight } from "react-icons/pi";
import Header from "../components/shared/Header";
import Input from "../components/ui/Input";
import { useState } from "react";
import {
  COLLECTION_POSTS_ID,
  DB,
  DB_ID,
  ID,
  storage,
  STORAGE_ID,
} from "../lib/appwrite";
import { useUserStore } from "../store/user.store";

const CreatePost = () => {
  const [postImg, setPostImg] = useState("");
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const userEmail = useUserStore((state) => state.user?.email);

  const fileUpload = async (file: File) => {
    await storage
      .createFile(STORAGE_ID, ID.unique(), file)
      .then((res) => storage.getFilePreview(STORAGE_ID, res.$id))
      .then((res) => setPostImg(res.href))
      .catch((error) => console.warn(error));
  };
  const createPost = async () => {
    const res = await DB.createDocument(
      DB_ID,
      COLLECTION_POSTS_ID,
      ID.unique(),
      { title, text, userEmail, imageUrl: postImg }
    );
  };
  return (
    <div>
      <Header />
      <div className="container">
        <div>
          <label
            htmlFor="postImg"
            className="flex gap-2 items-center cursor-pointer"
          >
            <p>Загрузить фото</p>
            <div className="p-2 rounded-full border-primary border">
              <PiUploadSimpleLight size={"30px"} className="" />
            </div>
          </label>
          <input
            type="file"
            id="postImg"
            className="hidden"
            onChange={(e) => e.target.files && fileUpload(e.target.files[0])}
          />
          <img src={postImg} alt="" />
        </div>
        <div>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Заголовок"
          />
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Текст"
          />
        </div>
        <button onClick={createPost}>Загрузить</button>
      </div>
    </div>
  );
};

export default CreatePost;
