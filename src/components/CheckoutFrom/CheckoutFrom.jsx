import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from 'react';
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from './../../hooks/useAuth';
import PropTypes from 'prop-types'
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CheckoutFrom = ({ email, salary }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [errorMessage, setErrorMessage] = useState("");
  const stripe = useStripe()
  const { user } = useAuth()
  const elements = useElements()
  const axiosSecure = useAxiosSecure()
  const [clintSecret, setClintSecret] = useState("")
  useEffect(() => {
    if (salary > 0) {
      axiosSecure.post('/create-payment-intent', { salary })
        .then(res => {
          setClintSecret(res.data.clientSecret)
        })
    }
  }, [axiosSecure, salary])
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement)
    if (card === null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })
    if (error) {
      console.log("[Error]", error);
      setErrorMessage(error.message)
    } else {
      console.log("[paymentMethod]", paymentMethod);
      setErrorMessage("")
    }

    const { paymentIntent, error: err } = await stripe.confirmCardPayment(clintSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user.displayName,
          email: user.email
        }
      }
    })
    if (err) {
      console.error(err);
    }
    else {
      if (paymentIntent.status === "succeeded") {
        toast.success('payment success')
        if (salary > 0) {
          const payment = {
            email,
            salary,
            date: e.target.date.value,
            transitionId: paymentIntent.id,
          }
          const res = await axiosSecure.post('/payments', payment)
          console.log(res.data);
        }
      }
      else {
        toast.error('payment unsuccess')
      }
    }

  }

  return (
    <form onSubmit={handleSubmit}>

      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <p className="text-xs text-red-500 mt-4">{errorMessage}</p>

      <div className="mt-7">
        <label className="block mb-2 text-sm font-medium text-gray-600 " htmlFor="LoggingEmailAddress">Date</label>
        <DatePicker
          name="date"
          maxDate={new Date()}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showMonthYearPicker
          dateFormat="MM/yyyy"
          className="block  w-full px-4 py-2 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <button
        className="bg-[#374151] btn text-white mt-7 w-full"
        type="submit"
        disabled={!stripe || !clintSecret}>
        Pay Now
      </button>
    </form>
  );
};

export default CheckoutFrom;
CheckoutFrom.propTypes = {
  email: PropTypes.string,
  salary: PropTypes.number
}