import Header from "../components/shared/Header";
import PostList from "../components/shared/PostList";

type Props = {};

const Home = () => {
  return (
    <div>
      <Header />
      <div className="container mx-auto px-4">
        <PostList />
      </div>
    </div>
  );
};

export default Home;
