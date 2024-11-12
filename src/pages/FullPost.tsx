import { useParams } from "react-router-dom";
import Header from "../components/shared/Header";
import { useEffect, useState } from "react";
import { COLLECTION_POSTS_ID, DB, DB_ID } from "../lib/appwrite";
import { TPost } from "../types";

const FullPost = () => {
  const params = useParams();
  const [post, setPost] = useState<TPost>();
  const getPost = async () => {
    if (!params.id) return;

    const res = await DB.getDocument(DB_ID, COLLECTION_POSTS_ID, params.id);
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
          <img className="mt-2 rounded-lg" src={post?.imageUrl} alt="Картинка не загрузилась(" />
        )}
        <p className="py-2">{post?.text}</p>
      </div>
    </div>
  );
};

export default FullPost;
