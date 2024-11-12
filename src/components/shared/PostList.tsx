import { useEffect, useState } from "react";
import { COLLECTION_POSTS_ID, DB, DB_ID } from "../../lib/appwrite";
import Post from "./Post";
import { TPost } from "../../types";
import Button from "../ui/Button";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { TbMoodEmpty } from "react-icons/tb";

const PostList = () => {
  const [posts, setPosts] = useState<TPost[]>([]);
  const navigate = useNavigate();
  const getCollection = async () => {
    try {
      const data = await DB.listDocuments(DB_ID, COLLECTION_POSTS_ID);
      setPosts(data.documents as unknown as TPost[]);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return (
    <div className="flex flex-col justify-between pb-3 grow">
      {posts.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-2 gap-y-3">
          {posts.map((post, i) => (
            <Post
              key={i}
              title={post.title}
              imageUrl={post.imageUrl}
              authorEmail={post.userEmail}
              $id={post.$id}
              onClick={() => navigate(`/full-post/${post.$id}`)}
            />
          ))}
        </div>
      ) : (
        <p className="font-bold p-4">
          Рецептов нет <TbMoodEmpty size={"30px"} />
        </p>
      )}
      <div className="py-4 z-10 sticky bottom-0 right-0 left-0 text-center text-3xl">
        <Button
          className="rounded-full"
          variant="primary"
          icon={<HiPlus />}
          onClick={() => navigate("/create-post")}
          size={3}
        />
      </div>
    </div>
  );
};

export default PostList;
