import { useState } from "react";
import { useForm } from "react-hook-form"
import useAuth from './../hooks/useAuth';
import toast from "react-hot-toast";
import { Toaster } from 'react-hot-toast';
import axios from "axios";
import { updateProfile } from "firebase/auth";

const SignUp = () => {
    const { createUser } = useAuth()
    const [selectedAccount, setSelectedAccount] = useState('employee')
    const { register, handleSubmit, formState: { errors } } = useForm()
    const onSubmit = async (data) => {
        const imageFile = { image: data.photo[0] }
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API_KEY}`, imageFile,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        console.log(res.data.data.display_url);
        createUser(data.email, data.password)
            .then(result => {
                if (result.user) {
                    if (res.data.data.display_url) {
                        updateProfile(result.user, {
                            displayName: data.name,
                            photoURL: res.data.data.display_url
                        })
                    }
                    toast.success('Sign Up successfully')
                }
            })
        console.log(data);
    }
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="flex justify-center min-h-screen">
                <div className="hidden bg-cover lg:block lg:w-2/5" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')" }}>
                </div>

                <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                    <div className="w-full">
                        <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                            Sign Up Now
                        </h1>

                        <div className="mt-6">
                            <h1 className="text-gray-500 dark:text-gray-300">Select type of account</h1>

                            <div className="mt-3 md:flex md:items-center md:-mx-2">
                                <button onClick={() => setSelectedAccount('employee')} className={`flex justify-center w-full px-6 py-3 mt-4  ${selectedAccount === 'employee' ? 'bg-[#3b82f6] text-white' : 'text-blue-500 border border-blue-500'} rounded-lg md:mt-0 md:w-auto md:mx-2 dark:border-blue-400 dark:text-blue-400 focus:outline-none`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>

                                    <span className="mx-2">
                                        Employee
                                    </span>
                                </button>

                                <button onClick={() => setSelectedAccount('hr')} className={`flex justify-center w-full px-6 py-3 mt-4 ${selectedAccount === 'hr' ? 'bg-[#3b82f6] text-white' : 'text-blue-500 border border-blue-500'} rounded-lg md:mt-0 md:w-auto md:mx-2 dark:border-blue-400 dark:text-blue-400 focus:outline-none`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>

                                    <span className="mx-2">
                                        HR
                                    </span>
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Name</label>
                                    <input {...register('name', { required: true })} type="text" placeholder="John" className="block w-full mb-2 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    {errors.name?.type === 'required' && <span className="text-red-600">This field is required</span>}
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                                    <input {...register('email', { required: true })} type="email" placeholder="johnsnow@example.com" className="block w-full mb-2 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    {errors.email?.type === 'required' && <span className="text-red-600">This field is required</span>}
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Bank Account</label>
                                    <input {...register('bankAccount', { required: true })} type="number" minLength={8} placeholder="XXXX-XXXX-XXXX-XXXX" className="block w-full mb-2 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    {errors.bankAccount?.type === 'required' && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Salary</label>
                                    <input {...register('salary', { required: true })} type="number" minLength={8} placeholder="10,0000" className="block w-full mb-2 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    {errors.salary?.type === 'required' && <span className="text-red-600">This field is required</span>}
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Designation</label>
                                    <select {...register('designation', { required: true })} defaultValue="default" name="" id="" className="block w-full mb-2 px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40">
                                        <option defaultValue="Sales Assistant">Sales Assistant</option>
                                        <option value="Social Media executive">Social Media executive</option>
                                        <option value=" Digital Marketer"> Digital Marketer</option>
                                    </select>
                                    {errors.designation?.type === 'required' && <span className="text-red-600">This field is required</span>}
                                </div>


                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                                    <input {...register('password', {
                                        required: true,
                                        // minLength: 6,
                                        // pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/
                                    })}
                                        type="password" placeholder="Enter your password"
                                        className="block w-full mb-2 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    {errors.password?.type === 'required' && <span className="text-red-600">This field is required</span>}
                                    {/* {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be at least 6 characters long</span>}
                                    {errors.password?.type === 'pattern' && <span className="text-red-600">Password must contain at least one capital letter and at least one special character.</span>} */}
                                </div>
                                <div>
                                    <label htmlFor="dropzone-file" className="flex items-center px-3 py-3 w-full mx-auto text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-300 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                        </svg>

                                        <h2 className="mx-3 text-gray-400">Profile Photo</h2>

                                        <input {...register('photo', { required: true })} id="dropzone-file" type="file" className="hidden w-full" />
                                    </label>
                                    {errors.photo?.type === 'required' && <span className="text-red-600">This field is required</span>}
                                </div>
                            </div>

                            <button
                                className="flex items-center justify-between w-full mt-5 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                <span>Sign Up </span>

                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Toaster />
        </section>
    );
};

export default SignUp;