import { useEffect, useState } from "react";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { account } from "../../lib/appwrite";
import { useUserStore } from "../../store/user.store";
import clsx from "clsx";

const Header = () => {
  const { user, clearUser, setUser } = useUserStore();
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

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

  window.onscroll = () => {
    setScrollY(window.scrollY);
  };

  return (
    <div
      className={clsx(
        "border-t-4 border-t-primary sticky z-50 top-0 left-0 right-0 pb-2 mb-2",
        {"border-b border-b-primary bg-base-100": scrollY}
      )}
    >
      <div className="container relative">
        <Link to="/">
          <h1 className="text-2xl text-center p-1 font-bold ">
            C<span className="text-primary">oo</span>kB
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
