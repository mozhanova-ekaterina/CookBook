import { PiUploadSimpleLight } from "react-icons/pi";
import Input from "../components/ui/Input";
import { useState } from "react";
import Loader from "../components/ui/Loader";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import {
  appwriteCreateDocument,
  appwriteUploadFile,
} from "../lib/appwrite/api";
import { TNewPost, TPost } from "../types";
import { useUserStore } from "../store/user.store";
import { appwriteConfig } from "../lib/appwrite/config";
import { useToasterStore } from "../store/toaster.store";

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { setToast } = useToasterStore();
  const [loading, setLoading] = useState<boolean>(false);
  // const [file, setFile] = useState<File>();
  const [post, setPost] = useState<TNewPost>({
    title: "",
    text: "",
    tags: [],
    creator: user.$id,
    postImg: import.meta.env.VITE_DEFAULT_POST_IMG,
  });

  const uploadFile = async (file: File) => {
    setLoading(true);
    const newFile = (await appwriteUploadFile(file)) as URL;
    if (newFile instanceof Error) {
      setToast("Не удалось загрузить фото", "error");
      return;
    }
    setPost({ ...post, postImg: newFile.href });
    setLoading(false);
  };

  const createPost = async () => {
    const newPost = (await appwriteCreateDocument(
      post,
      appwriteConfig.collectionPostsId
    )) as TPost;
    if (newPost instanceof Error) {
      setToast("Не удалось создать пост", "error");
      return;
    }
    setToast("Пост успешно создан", "success");
    navigate('/');
  };

  return (
    <div className="flex flex-col gap-4 pb-4">
      <div>
        <label
          htmlFor="postImg"
          className="flex gap-2 items-center cursor-pointer"
        >
          {post.postImg ? <p>Выбрать другое фото</p> : <p>Загрузить фото</p>}
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
          onChange={(e) => e.target.files && uploadFile(e.target.files[0])}
        />
      </div>
      <div>
        <img className="rounded-lg" src={post.postImg} alt="" />
      </div>
      <div>
        <Input
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          placeholder="Что готовим?"
        />
      </div>
      <div className="grow flex">
        <textarea
          className="textarea textarea-primary w-full font-bold p-2 caret-primary"
          value={post.text}
          onChange={(e) => setPost({ ...post, text: e.target.value })}
          placeholder="Рецептик сюда..."
          rows={15}
        />
      </div>
      <div className="text-right sticky bottom-0 right-0 p-2">
        <Button variant="primary" onClick={createPost} text="Загрузить" />
      </div>
    </div>
  );
};

export default CreatePost;
