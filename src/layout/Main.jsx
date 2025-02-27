import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { Toaster } from 'react-hot-toast';
import Footer from "../components/Footer/Footer";

const Main = () => {
    const loadedTheme = localStorage.getItem("theme") === "true"
    const [theme, setTheme] = useState(loadedTheme)
    useEffect(() => {
        localStorage.setItem('theme', theme)
    }, [theme])
    return (
        <div className={`${theme ? "dark" : ""} text-[#151515] dark:text-white dark:bg-[#1d232a]`}>
            <div className="h-16">
                <Navbar theme={theme} setTheme={setTheme} />
            </div>
            <Outlet />
            <Footer/>
            <Toaster />
        </div>
    );
};

export default Main;