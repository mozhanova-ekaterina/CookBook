import { useEffect } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../../lib/appwrite";
import { useUserStore } from "../../store/user.store";

const Header = () => {
  const { user, clearUser, setUser } = useUserStore();
  const navigate = useNavigate();

  const getMe = async () => {
    try {
      const res = await account.get();
      res &&
        setUser({
          name: res.name,
          email: res.email,
        }); 
    } catch (error) {
      console.warn(error);
    }
  };
  const logout = async () => {
    try {
      const res = await account.deleteSession("current");
      res && clearUser();
      navigate("/login");
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <div className="border-t-4 border-t-primary sticky top-0 left-0 right-0">
      <div className="container relative">
        <Link to="/">
          <h1 className="text-2xl text-center p-1 mb-4 font-bold ">
            C<span className="text-primary">oo</span>k B
            <span className="text-primary">oo</span>k
          </h1>
        </Link>
        <div className="absolute top-2 right-3">
          {user && <RiLogoutCircleRLine onClick={logout} size={"30px"} />}
        </div>
      </div>
    </div>
  );
};

export default Header;
