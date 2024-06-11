import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Loader/Loader";
import PropTypes from 'prop-types'
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AdminRoute = ({ children }) => {
    const { user, loading, logOut } = useAuth()
    const { pathname } = useLocation()
    const axiosSecure = useAxiosSecure()
    const { data: role = [], isPending } = useQuery({
        queryKey: ['user role', user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/users/checkRole/${user?.email}`)
            return res.data
        }
    })
    if (loading || isPending) {
        return <Loader />
    }
    if (user && role?.role === "admin") {
        return children;
    }
    return <>
        {/* {logOut()} */}
        <Navigate to="/signIn" state={pathname} />
    </>
};

export default AdminRoute;
AdminRoute.propTypes = {
    children: PropTypes.node
}