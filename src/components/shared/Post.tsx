import React from "react";
import { useUserStore } from "../../store/user.store";
import { RiDeleteBin7Line } from "react-icons/ri";
import { COLLECTION_POSTS_ID, DB, DB_ID } from "../../lib/appwrite";
import Button from "../ui/Button";

type Props = {
  title: string;
  imageUrl: string;
  authorEmail: string;
  $id: string;
  onClick?: () => void;
};

const Post: React.FC<Props> = ({
  title,
  imageUrl,
  onClick,
  authorEmail,
  $id,
}) => {
  const { user } = useUserStore();
  const deletePost = async () => {
    if (window.confirm("Удалить рецепт?")) {
      await DB.deleteDocument(DB_ID, COLLECTION_POSTS_ID, $id);
      
    }
  };
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure onClick={onClick} className="max-h-[200px]">
        <img src={imageUrl} alt="PostImg" />
      </figure>
      <div className="card-body py-3 px-2">
        <h2 className="card-title">{title}</h2>
      </div>
      {authorEmail === user?.email && (
        <div className="absolute bottom-0 right-0 p-2">
          <Button
            className="rounded-full"
            size={2}
            icon={<RiDeleteBin7Line size={"15px"} />}
            onClick={deletePost}
          />
        </div>
      )}
    </div>
  );
};

export default Post;
