import { useParams } from "react-router-dom";
import Header from "../components/shared/Header";
import { useEffect, useState } from "react";
import {  appwriteConfig, DB } from "../lib/appwrite/config";
import { TPost } from "../types";

const FullPost = () => {
  const params = useParams();
  const [post, setPost] = useState<TPost>();
  const getPost = async () => {
    if (!params.id) return;

    const res = await DB.getDocument(appwriteConfig.databaseId, appwriteConfig.collectionPostsId , params.id);
    setPost({
      title: res.title,
      text: res.text,
      userEmail: res.userEmail,
      imageUrl: res.imageUrl,
      tags: res.tags,
      $id: res.$id,
    });
  };
  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="page">
      <Header />
      <div className="container grow">
        <h1 className="text-xl font-bold border-b-2 pb-2 border-primary">
          {post?.title}
        </h1>
        {post?.imageUrl && (
          <img
            className="mt-2 rounded-lg"
            src={post?.imageUrl}
            alt="Картинка не загрузилась("
          />
        )}
        <p className="py-2">{post?.text}</p>
      </div>
    </div>
  );
};

export default FullPost;
