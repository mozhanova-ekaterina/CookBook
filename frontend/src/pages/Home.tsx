import Header from "../components/shared/Header";
import PostList from "../components/shared/PostList";

type Props = {};

const Home = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <PostList />
      </div>
    </div>
  );
};

export default Home;
