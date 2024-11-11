import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth";
import ToastsList from "./components/toasts/ToastsList";
import CreatePost from "./pages/CreatePost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: 'create-post',
    element: <CreatePost />
  }
]);

createRoot(document.getElementById("root")!).render(
  <>
    <RouterProvider router={router} fallbackElement={<Home />} />
    <ToastsList />
  </>
);
