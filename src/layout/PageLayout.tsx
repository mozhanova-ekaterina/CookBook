import Header from "../components/shared/Header";
import { Outlet } from "react-router-dom";

const PageLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container grow">
        <Outlet />
      </div>
    </div>
  );
};

export default PageLayout;
