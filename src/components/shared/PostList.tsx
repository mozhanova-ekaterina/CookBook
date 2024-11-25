import { useEffect, useState } from "react";
import { appwriteConfig } from "../../lib/appwrite/config";
import Post from "./Post";
import { TPost } from "../../types";
import Button from "../ui/Button";
import { HiPlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { TbMoodEmpty } from "react-icons/tb";
import {
  appwriteDeleteDocument,
  appwriteGetCollection,
} from "../../lib/appwrite/api";

const PostList = () => {
  const [posts, setPosts] = useState<TPost[]>([]);
  const navigate = useNavigate();

  const getPosts = async () => {
    const data = (await appwriteGetCollection(
      appwriteConfig.collectionPostsId
    )) as TPost[];
    if (data) setPosts(data);
  };

  const deletePost = async (postId: string) => {
    await appwriteDeleteDocument(postId, appwriteConfig.collectionPostsId).then(
      () => {
        const filteredPosts = posts.filter((post) => post.$id !== postId);
        setPosts(filteredPosts);
      }
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="flex flex-col justify-between pb-3 grow">
      {posts.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-2 gap-y-3">
          {posts.map((post, i) => (
            <Post
              key={i}
              title={post.title}
              postImg={post.postImg}
              creator={post.creator}
              $id={post.$id}
              onClick={() => navigate(`/full-post/${post.$id}`)}
              onDel={deletePost}
            />
          ))}
        </div>
      ) : (
        <p className="font-bold p-4">
          Рецептов нет <TbMoodEmpty size={"30px"} />
        </p>
      )}
      <div className="py-4 z-10 absolute bottom-0 right-0 left-0 text-center text-3xl">
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
