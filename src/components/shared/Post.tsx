import React from "react";
import { useUserStore } from "../../store/user.store";
import { RiDeleteBin7Line } from "react-icons/ri";
import Button from "../ui/Button";
import { TUser } from "../../types";

type Props = {
  title: string;
  $id: string;
  creator: TUser;
  postImg: string;
  onClick: () => void;
  onDel: (id: string) => void;
};

const Post: React.FC<Props> = ({
  title,
  postImg,
  onClick,
  onDel,
  creator,
  $id,
}) => {
  const { user } = useUserStore();
  
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure onClick={onClick} className="max-h-[200px]">
        <img src={postImg} alt="PostImg" />
      </figure>
      <div className="card-body py-3 px-2">
        <h2 className="card-title">{title}</h2>
      </div>
      {creator.$id === user?.$id && (
        <div className="absolute bottom-0 right-0 p-2">
          <Button
            className="rounded-full p-2 h-auto min-h-2"
            icon={<RiDeleteBin7Line size={"15px"} />}
            onClick={() => onDel($id)}
          />
        </div>
      )}
    </div>
  );
};

export default Post;
