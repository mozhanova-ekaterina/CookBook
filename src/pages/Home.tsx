import Header from "../components/shared/Header";
import PostList from "../components/shared/PostList";

const Home = () => {  
  return (
    <div className="page ">
      <Header />
      <div className="container grow flex flex-col">
        <PostList />
      </div>
    </div>
  );
};

export default Home;
