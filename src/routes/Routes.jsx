import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../layout/Home";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import SignUp from "../pages/auth/SignUp";
import SignIn from "../pages/auth/SignIn";
import Dashboard from "../layout/Dashboard";
import WorkSheet from "../pages/dashboard/WorkSheet";
import PrivateRoute from "./PrivateRoute";
import EmployeeList from "../pages/dashboard/EmployeeList";
import Payment from "../pages/Payment";

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
        element: <PrivateRoute><Dashboard/></PrivateRoute>,
        errorElement:<ErrorPage/>,
        children:[
            //employee route
            {
                path:'workSheet',
                element:<WorkSheet/>
            },

            //HR route
            {
                path:'employeeList',
                element:<EmployeeList/>
            },
            {
                path:'payment/:id',
                element:<Payment/>
            }
        ]
    }

])
export default router;