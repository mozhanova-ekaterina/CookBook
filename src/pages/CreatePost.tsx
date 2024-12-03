import { PiUploadSimpleLight } from "react-icons/pi";
import Input from "../components/ui/Input";
import { useEffect, useState } from "react";
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
  const [file, setFile] = useState<File>();
  const [image, setImage] = useState<string>(
    import.meta.env.VITE_DEFAULT_POST_IMG
  );
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const onImageChange = (target: HTMLInputElement) => {
    if (target.files) {
      const file = target.files[0];
      setFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  // const uploadFile = async (file: File) => {
  //   return appwriteUploadFile(file)
  //     .then((file) => file.href)
  //     .catch((error) => {
  //       setToast("Не удалось загрузить фото", "error");
  //       throw error;
  //     });
  // };

  const createPost = async () => {
    if (file)
      appwriteUploadFile(file).then((file) =>
        appwriteCreateDocument(
          {
            title,
            text,
            tags,
            creator: user.$id,
            postImg: file.href,
          },
          appwriteConfig.collectionPostsId
        )
      )
      .then(() => {
        navigate("/");
      });
  };

  return (
    <div className="flex flex-col gap-4 pb-4">
      <div>
        <label
          htmlFor="postImg"
          className="flex gap-2 items-center cursor-pointer"
        >
          <p>Выбрать другое фото</p>
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
          onChange={(e) => onImageChange(e.target)}
        />
      </div>
      <div>
        <img className="rounded-lg" src={image} alt="" />
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
  );
};

export default CreatePost;

//!!!:
//В TypeScript постфикс ! удаляет null и undefined из типа выражения.
//Это полезно, когда вы знаете, что переменная, которая «могла бы» быть
//null или undefined, на самом деле не является ими.

//TODO:
//дописать функцию createPost, на случай если файл не выбран
