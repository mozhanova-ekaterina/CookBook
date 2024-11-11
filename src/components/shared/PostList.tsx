import { useEffect, useState } from "react";
import { COLLECTION_POSTS_ID, DB } from "../../lib/appwrite";
import Post from "./Post";
import { TPost } from "../../types";
import Button from "../ui/button";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState<TPost[]>([]);
  const navigate = useNavigate();
  const getCollection = async () => {
    try {
      const data = await DB.listDocuments(
        "673097830009ff0321dd",
        COLLECTION_POSTS_ID
      );
      setPosts(data.documents as unknown as TPost[]);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);
  return (
    <div className="flex flex-col justify-between">
      <div className="grid grid-cols-2 gap-x-2 gap-y-3 mb-[100px]">
        {posts.map((post, i) => (
          <Post
            key={i}
            title={post.title}
            text={post.text}
            imageUrl={post.imageUrl}
          />
        ))}
      </div>
      <div className="pb-4 z-10 absolute bottom-0 right-0 left-0 text-center text-3xl">
        <Button
          className="rounded-full"
          variant="primary"
          icon={<HiPlus />}
          onClick={() => navigate("/create-post")}
        />
      </div>
    </div>
  );
};

export default PostList;
