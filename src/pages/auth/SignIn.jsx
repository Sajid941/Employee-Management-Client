import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import SocialSignIn from "../../components/SocialSignIn/SocialSignIn";

const SignIn = () => {
    const location =useLocation()
    const navigate= useNavigate()
    console.log(location);
    const {logIn} = useAuth()
    const { register, handleSubmit } = useForm()
    const onSubmit = (data) => {
        logIn(data.email,data.password)
        .then(result=>{
            if(result.user){
                toast.success('Logged in successfully')
                navigate(location?.state ? location.state : "/")
            }
        })
        .catch(error=>{
            console.error(error);
            if(error.message === "Firebase: Error (auth/invalid-credential)."){
                toast.error("Incorrect Email/Password")
            }
        })
    }
    return (
        <div className="flex justify-center items-center w-full h-screen">
            <div className="flex w-full max-w-sm max-h-screen  mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
                <div className="hidden bg-cover lg:block lg:w-1/2" style={{ backgroundImage: "url('https://i.ibb.co/RT1s4nn/Login-pana.png')" }}></div>
                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                    <div className="flex justify-center mx-auto">
                        <img className="w-auto h-7 sm:h-8" src="https://i.ibb.co/WvXWVNq/create-a-logo-logilink-labs-the-logo-have-no-backg-CBs-M2r-W9-QNWAZm-Eyc84-RA-UC0-GZ1v1-QPm-wj2-CAAv.jpg" alt="" />
                    </div>
                    <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">Welcome back!</p>
                    <SocialSignIn/>
                    <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
                        <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or login with email</a>
                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                    </div>
                    <form onClick={handleSubmit(onSubmit)}>
                        <div className="mt-4">
                            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">Email Address</label>
                            <input
                                {...register("email", { required: true })}
                                id="LoggingEmailAddress"
                                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                                type="email" />
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="loggingPassword">Password</label>
                                <a className="text-xs text-gray-500 dark:text-gray-300 hover:underline hover:cursor-pointer">Forget Password?</a>
                            </div>
                            <input
                                {...register('password', { required: true })}
                                id="loggingPassword"
                                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                                type="password" />
                        </div>
                        <div className="mt-6">
                            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                Sign In
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center justify-center mt-4">
                        <p className="text-xs text-gray-500  dark:text-gray-400 ">
                            Do not have account? <Link to="/signUp" className="text-blue-600 hover:underline">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </div>
            <Toaster/>
        </div>
    );
};

export default SignIn;