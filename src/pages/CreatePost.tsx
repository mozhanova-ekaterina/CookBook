import { PiUploadSimpleLight } from "react-icons/pi";
import Header from "../components/shared/Header";
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

const CreatePost = () => {
  const { user } = useUserStore();
  const [postImg, setPostImg] = useState(import.meta.env.VITE_DEFAULT_POST_IMG);
  const [post, setPost] = useState<TNewPost>({
    title: "",
    text: "",
    tags: [],
    imageUrl: postImg,
    creator: user,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const uploadFile = async (file: File) => {
    setLoading(true);
    const newFile = (await appwriteUploadFile(file)) as URL;
    if (newFile instanceof Error) return;
    setPostImg(newFile.href);
    setLoading(false);
  };
  const createPost = async () => {
    const newPost = (await appwriteCreateDocument(
      post,
      appwriteConfig.collectionPostsId
    )) as TPost;
    if (newPost instanceof Error) return;
    navigate(`/full-post/${newPost.$id}`);
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
            onChange={(e) => e.target.files && uploadFile(e.target.files[0])}
          />
        </div>
        <div>
          <img className="rounded-lg" src={postImg} alt="" />
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
    </div>
  );
};

export default CreatePost;
