import Header from "../components/shared/Header";
import { Outlet } from "react-router-dom";
import ToastsList from "../components/toasts/ToastsList";

const PageLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container grow">
        <Outlet />
        <ToastsList/>
      </div>
    </div>
  );
};

export default PageLayout;
