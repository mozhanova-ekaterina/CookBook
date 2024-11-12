import Header from "../components/shared/Header";
import PostList from "../components/shared/PostList";
import { useUserStore } from "../store/user.store";

const Home = () => {
  const user = useUserStore((state) => state.user);
  
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
