import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['all employee'],
        queryFn: async () => {
            const res = await axiosSecure('/allUsers')
            return res.data
        }
    })
    return {users,refetch}
};

export default useAllUsers;