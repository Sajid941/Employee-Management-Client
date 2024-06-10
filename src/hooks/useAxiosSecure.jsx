import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
})
const useAxiosSecure = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        axiosSecure.interceptors.response.use((res) => {
            return res;
        }, async (error) => {
            console.log(error.response.status);
            const status = error.response.status
            if (status === 401 || status === 403) {
                await logout()
                navigate('/login')
            }
        })
    }, [logout, navigate])
    return axiosSecure;
};

export default useAxiosSecure;