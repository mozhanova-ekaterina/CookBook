import { createRoot } from "react-dom/client";
import "./index.css";
import Home from "./pages/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth";
import CreatePost from "./pages/CreatePost";
import FullPost from "./pages/FullPost";
import PageLayout from "./layout/PageLayout";
import Error from "./pages/Error";
import { QueryProvider } from "./lib/react-query/QueryProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Auth />,
      },
      {
        path: "create-post",
        element: <CreatePost />,
      },
      {
        path: "full-post/:id",
        element: <FullPost />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <RouterProvider router={router} fallbackElement={<Home />} />
  </QueryProvider>
);
