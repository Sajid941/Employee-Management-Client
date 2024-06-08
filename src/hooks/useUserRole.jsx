
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
const useUserRole = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: userRole } = useQuery({
        queryKey: ['userRole'],
        enabled : !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure(`/users/checkRole/${user?.email}`)
            return res.data.role
        }
    })
    return { userRole }
};

export default useUserRole;