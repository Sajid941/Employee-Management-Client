import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Link, useLocation } from "react-router-dom";
import CheckoutFrom from "../../components/CheckoutFrom/CheckoutFrom";
import useUser from "../../hooks/useUser";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const Payment = () => {
    const { pathname } = useLocation()
    const email = pathname.split('/')[3]
    const {users}=useUser()
    const currentUser = users?.filter(user => user.email === email)[0]
    const salary = parseInt(currentUser?.salary)
    return (
        <div className="flex justify-center items-center w-full">
            <div className="modal-box space-y-4 w-full h-full">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <Link to="/dashboard/employeeList" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
                </form>
                <h3 className="font-bold text-lg">Pay <span className="text-mainColor"> {email}</span> </h3>
                <Elements stripe={stripePromise}>
                    <CheckoutFrom email={email} salary={salary}/>
                </Elements>
            </div>
        </div>

    );
};

export default Payment;