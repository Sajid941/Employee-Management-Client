import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../layout/Home";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import SignUp from "../pages/auth/SignUp";
import SignIn from "../pages/auth/SignIn";
import Dashboard from "../layout/Dashboard";
import WorkSheet from "../pages/dashboard/WorkSheet";

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
    },
    {
        path:'/signIn',
        element:<SignIn/>
    },
    {
        path:'dashboard',
        element: <Dashboard/>,
        errorElement:<ErrorPage/>,
        children:[
            {
                path:'workSheet',
                element:<WorkSheet/>
            }
        ]
    }

])
export default router;