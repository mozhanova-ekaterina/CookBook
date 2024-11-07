import Post from "./Post";

type Props = {};

const PostList = (props: Props) => {
  return (
    <div className="grid gap-3">
      <Post />
      <Post />
    </div>
  );
};

export default PostList;
