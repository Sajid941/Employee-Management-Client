import axios from "axios";
import { useEffect } from "react";
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
    baseURL: 'https://employee-management-server-phi.vercel.app',
    withCredentials: true
})
const useAxiosSecure = () => {
    const { logOut } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, (error) => {
            console.log(error.response.status);
            if (error.response.status === 401 || error.response.status === 403) {
                logOut()
                .then(()=>{
                    navigate('/signIn')
                })
            }
            return Promise.reject(error);
        })
    }, [logOut,navigate])
    return axiosSecure;
};

export default useAxiosSecure;