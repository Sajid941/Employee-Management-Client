import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../services/firebase.config";
import useAxiosPublic from './../hooks/useAxiosPublic';

export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading,setLoading]=useState(true)
   const axiosPublic = useAxiosPublic()
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const logIn = (email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const googleLogin = () =>{
        setLoading(true)
        return signInWithPopup(auth,googleProvider)
    }
    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            const userInfo = {email:currentUser?.email}

            if(currentUser){
                axiosPublic.post('/jwt',userInfo)

            }else{
                //remove token
                axiosPublic.delete('/jwt')
                .then(res=>{
                    console.log(res.data);
                })
            }

            setLoading(false)
            console.log(currentUser);
        })
        return () => {
            unsubscribe()
        }
    }, [axiosPublic])

    const authInfo = {
        auth,
        createUser,
        user,
        loading,
        logIn,
        googleLogin,
        logOut
    }
    return (
        <AuthContext.Provider value={authInfo} >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
AuthProvider.propTypes = {
    children: PropTypes.node
}