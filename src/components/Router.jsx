import {
    createBrowserRouter,
  } from "react-router-dom";
import Introduction from "../pages/Introduction";
import Dashboard from "../pages/Dashboard";

const Router = createBrowserRouter([
    {
      path: "/",
      element: <Introduction/>,
    },
    {
      path: "/app",
      element: <Dashboard/>,
    },
]);

export default Router;  