import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { appwriteConfig, DB } from "../lib/appwrite/config";
import { TPost } from "../types";

const FullPost = () => {
  const params = useParams();
  const [post, setPost] = useState<TPost>();
  const getPost = async () => {
    if (!params.id) return;

    const res = await DB.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.collectionPostsId,
      params.id
    );
    setPost({
      title: res.title,
      text: res.text,
      postImg: res.imageUrl,
      tags: res.tags,
      $id: res.$id,
      createdAt: res.createdAt,
      creator: res.creator,
    });
  };
  useEffect(() => {
    getPost();
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold border-b-2 pb-2 border-primary">
        {post?.title}
      </h1>
      {post?.postImg && (
        <img
          className="mt-2 rounded-lg"
          src={post?.postImg}
          alt="Картинка не загрузилась("
        />
      )}
      <p className="py-2">{post?.text}</p>
      <p>{post?.creator.name}</p>
    </>
  );
};

export default FullPost;
