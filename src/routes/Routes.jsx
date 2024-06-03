import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../layout/Home";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import SignUp from "../pages/SignUp";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Main/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },

        ]
    },
    {
        path:'/signUp',
        element:<SignUp/>
    }

])
export default router;