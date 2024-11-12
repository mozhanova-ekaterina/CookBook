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
import Loader from "../components/ui/Loader";
import Button from "../components/ui/button";

const CreatePost = () => {
  const [postImg, setPostImg] = useState("");
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const userEmail = useUserStore((state) => state.user?.email);

  const fileUpload = async (file: File) => {
    setPostImg("");
    setLoading(true);
    await storage
      .createFile(STORAGE_ID, ID.unique(), file)
      .then((res) => storage.getFilePreview(STORAGE_ID, res.$id))
      .then((res) => {
        setPostImg(res.href);
        setLoading(false);
      })
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
    <div className="page">
      <Header />
      <div className="container flex flex-col gap-4 grow pb-4">
        <div>
          <label
            htmlFor="postImg"
            className="flex gap-2 items-center cursor-pointer"
          >
            {postImg ? <p>Выбрать другое фото</p> : <p>Загрузить фото</p>}
            {loading ? (
              <Loader />
            ) : (
              <div className="p-2 rounded-full border-primary border">
                <PiUploadSimpleLight size={"30px"} className="" />
              </div>
            )}
          </label>
          <input
            type="file"
            id="postImg"
            className="hidden"
            onChange={(e) => e.target.files && fileUpload(e.target.files[0])}
          />
        </div>
        <div>
          <img className="rounded-lg" src={postImg} alt="" />
        </div>
        <div>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Что готовим?"
          />
        </div>
        <div className="grow flex">
          <textarea
            className="textarea textarea-primary w-full font-bold p-2 caret-primary"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Рецептик сюда..."
            rows={15}
          />
        </div>
        <div className="text-right sticky bottom-0 right-0 p-2">
          <Button variant="primary" onClick={createPost} text="Загрузить" />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
