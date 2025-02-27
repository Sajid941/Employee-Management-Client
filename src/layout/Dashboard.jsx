import { NavLink, Outlet } from "react-router-dom";
import "./dashboard.css"
import useAuth from "../hooks/useAuth";
import { RiMenu2Line } from "react-icons/ri";
import { FaSheetPlastic } from "react-icons/fa6";
import { MdWorkHistory } from "react-icons/md";
import { MdConnectWithoutContact } from "react-icons/md";
import { MdHomeFilled } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { RiProgress3Fill } from "react-icons/ri";
import { Toaster } from "react-hot-toast";
import 'sweetalert2/src/sweetalert2.scss'
import useUserRole from "../hooks/useUserRole";
import { Helmet } from "react-helmet";
import { FaMessage } from "react-icons/fa6";

const Dashboard = () => {
    const theme = localStorage.getItem('theme')
    const { user } = useAuth()
    const { userRole } = useUserRole()

    return (
        <div className={`${theme === "true" ? "dark" : ""} text-[#151515] dark:text-white  lg:flex bg-[#f7f8fa] dark:bg-[#1d232a] min-h-screen`}>
            <Helmet>
                <title>Dashboard | LogiLink Labs</title>
            </Helmet>
            <div>
                <div className="drawer lg:drawer-open lg:m-7  rounded-lg ">
                    <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content flex flex-col m-3 lg:m-0">
                        {/* Page content here */}
                        <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
                            <RiMenu2Line size={30} />
                        </label>

                    </div>
                    <div className="drawer-side lg:rounded-lg z-50 lg:border dark:border-[#737373] lg:h-fit lg:shadow-lg">
                        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className=" p-4 w-80 h-full lg:h-auto bg-white dark:bg-[#1d232a]  space-y-4">
                            {/* Sidebar content here */}
                            <div className="flex flex-col items-center gap-3">
                                {/* user */}
                                <img src={user?.photoURL} className="w-24 rounded-md" alt="" />
                                <h4 className="text-2xl text-[#151515] dark:text-white">Hello, {user?.displayName}</h4>
                            </div>

                            <hr className="dark:border-[#737373]" />
                            {/* Links */}
                            {
                                userRole === 'employee' &&
                                <>
                                    <li><NavLink to="/dashboard/workSheet"><FaSheetPlastic size={20} /> Work Sheet</NavLink></li>
                                    <li><NavLink to="/dashboard/paymentsHistory"><MdWorkHistory size={20} />Payment History</NavLink></li>
                                </>
                            }
                            {
                                userRole === 'hr' &&
                                <>
                                    <li><NavLink to="/dashboard/employeeList"><FaUsers size={20} />Employee List</NavLink></li>
                                    <li><NavLink to="/dashboard/progress"><RiProgress3Fill size={20} />Progress</NavLink></li>
                                </>
                            }
                            {
                                userRole === 'admin' &&
                                <>
                                    <li><NavLink to="/dashboard/allEmployeeList"><FaUsers size={20} />All Employee List</NavLink></li>
                                    <li><NavLink to="/dashboard/contactMessage"><FaMessage size={20} />Contact Message</NavLink></li>
                                </>
                            }

                            <hr className="dark:border-[#737373]" />

                            <li><NavLink to="/"><MdHomeFilled size={20} />Home</NavLink></li>
                            <li><NavLink to="/contactUs"><MdConnectWithoutContact size={20} />Contact Us</NavLink></li>

                        </ul>

                    </div>
                </div>
            </div>
            <div className="lg:flex-1 flex justify-center my-10  lg:border-l">
                <Outlet />
            </div>
            <Toaster />
        </div>
    );
};

export default Dashboard;