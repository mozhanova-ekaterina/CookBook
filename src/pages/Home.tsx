import { useNavigate } from "react-router-dom";
import PostList from "../components/shared/PostList";
import { useUserStore } from "../store/user.store";
import { useEffect } from "react";
import { appwriteGetCurrentUser } from "../lib/appwrite/api";
import { TUser } from "../types";

const Home = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  const getMe = async () => {
    const user = await appwriteGetCurrentUser() as TUser;
    setUser(user);
    if (!user.$id) navigate("/login");
  };

  useEffect(() => {
    getMe()
  }, []);

  return (
    <>
      <p>Hello, {user.name}</p>
      <PostList />
    </>
  );
};

export default Home;
