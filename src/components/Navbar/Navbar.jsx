import { NavLink } from "react-router-dom";
import "./Navbar.css"
import PropTypes from 'prop-types'
import { useEffect, useState } from "react";

const Navbar = ({theme,setTheme}) => {
    const [showNavbar , setShowNavbar]=useState(true)
    const [lastScrollY, setLastScrollY]=useState(0)
    useEffect(()=>{
        const handleScroll = () =>{
            if(window.scrollY > lastScrollY){
                setShowNavbar(false)
            }else{
                setShowNavbar(true)
            }
            setLastScrollY(window.scrollY)
        }
        window.addEventListener('scroll',handleScroll)
        return ()=>{
            window.removeEventListener('scroll',handleScroll)
        }
    },[lastScrollY])
    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/contactUs">Contact Us</NavLink></li>
    </>
    return (
        <div className={`navbar  md:px-5  text-black dark:text-white fixed z-10 bg-white/5 bg-opacity-25 backdrop-blur-md transition-transform duration-300 ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}                    </ul>
                </div>
                <div className="text-xl font-bold leading-3">LogiLink <br /> <p className="text-xs tracking-[4px] float-end">Labs</p></div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="flex gap-5 px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end flex gap-4">
                <label className="cursor-pointer grid place-items-center">
                    <input  onChange={()=>setTheme(!theme)} checked={theme}  type="checkbox" value={theme?'dark':'light'}className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />
                    <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                    <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </label>
                <a className=" bg-mainColor text-white py-1 px-4 rounded-md hover:bg-[#ff800a]">Login</a>
            </div>
        </div>
    );
};

export default Navbar;
Navbar.propTypes={
    theme:PropTypes.bool,
    setTheme:PropTypes.func
}