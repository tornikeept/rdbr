import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import NewListing from "../pages/newListing/NewListing";
const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children:[
        {
            path:"https://tornikeept.github.io/rdbr/",
            element: <Home/>
        },
        {
          path:'https://tornikeept.github.io/rdbr//new-listing',
          element: <NewListing/>
        }
      ]
    },
  ]);
export default router;