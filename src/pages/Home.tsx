import PostList from "../components/shared/PostList";
import { useUserStore } from "../store/user.store";

const Home = () => {
  const { user } = useUserStore();
  console.log('store user',user);
  
  return (
    <>
      <p>Hello, {user.accountId}</p>
      <PostList />
    </>
  );
};

export default Home;
