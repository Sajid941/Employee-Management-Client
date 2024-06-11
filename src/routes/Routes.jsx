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
import Payment from "../pages/dashboard/Payment";
import PaymentHistory from "../pages/dashboard/PaymentHistory";
import Details from "../pages/dashboard/Details";
import Progress from "../pages/dashboard/Progress";
import AllEmployeeList from "../pages/dashboard/AllEmployeeList";
import ContactUs from "../pages/ContactUs";
import ContactMessage from "../pages/dashboard/ContactMessage";
import EmployeeRoute from "./EmployeeRoute";
import HrRoute from "./HrRoute";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/contactUs',
                element: <ContactUs />
            }

        ]
    },
    {
        path: '/signUp',
        element: <SignUp />
    },
    {
        path: '/signIn',
        element: <SignIn />
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            //employee route
            {
                path: 'workSheet',
                element: <EmployeeRoute><WorkSheet /></EmployeeRoute>
            },
            {
                path: 'paymentsHistory',
                element: <EmployeeRoute><PaymentHistory /></EmployeeRoute>
            },

            //HR route
            {
                path: 'employeeList',
                element: <HrRoute><EmployeeList /></HrRoute>
            },
            {
                path: 'payment/:email',
                element: <HrRoute><Payment /></HrRoute>
            },
            {
                path: 'details/:email',
                element: <HrRoute><Details /></HrRoute>,
                loader: ({ params }) => fetch(`https://employee-management-server-phi.vercel.app/payments/${params.email}`)
            },
            {
                path: 'progress',
                element: <HrRoute><Progress /></HrRoute>
            },

            //Admin route
            {
                path: 'allEmployeeList',
                element: <AdminRoute> <AllEmployeeList /></AdminRoute>
            },
            {
                path: 'contactMessage',
                element: <AdminRoute><ContactMessage /></AdminRoute>
            }
        ]
    }

])
export default router;