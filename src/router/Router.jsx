import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import NewListing from "../pages/newListing/NewListing";
const router = createBrowserRouter([
    {
      path: "https://tornikeept.github.io/rdbr/",
      element: <Main />,
      children:[
        {
            path:"/",
            element: <Home/>
        },
        {
          path:'/new-listing',
          element: <NewListing/>
        }
      ]
    },
  ]);
export default router;