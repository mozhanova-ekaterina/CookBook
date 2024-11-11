import React from "react";

type Props = {
  title: string;
  text: string;
  imageUrl: string;
};

const Post: React.FC<Props> = ({ title, text, imageUrl }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure className="max-h-[200px]">
        <img
          src={imageUrl}
          alt="PostImg"
        />
      </figure>
      <div className="card-body py-3 px-2">
        <h2 className="card-title">{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Post;
