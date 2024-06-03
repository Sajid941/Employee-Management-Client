import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import  { Toaster } from 'react-hot-toast';

const Main = () => {
    const loadedTheme = localStorage.getItem("theme") === "true"
    const [theme, setTheme] = useState(loadedTheme)
    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])
    return (
        <div className={`${theme ? "dark" : ""} text-[#151515] dark:text-white dark:bg-[#1d232a]`}>
            <Navbar theme={theme} setTheme={setTheme} />
            <Outlet />
            <Toaster/>
        </div>
    );
};

export default Main;