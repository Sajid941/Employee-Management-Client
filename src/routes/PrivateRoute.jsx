import PropTypes from 'prop-types'
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader/Loader';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const {pathname} = useLocation()
    const { user, loading } = useAuth()
    if (loading) {
        return <Loader />
    }
    if (user) {
        return children;
    }
    return <Navigate to="/signIn" state={pathname} />
};

export default PrivateRoute;
PrivateRoute.propTypes = {
    children: PropTypes.node
}