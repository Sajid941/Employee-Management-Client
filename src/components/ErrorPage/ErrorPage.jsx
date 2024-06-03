import Lottie from "lottie-react";
import errorAnimation from "../../assets/Animation - 1717408766658.json";

const ErrorPage = () => {
    return (
        <div className="">
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <Lottie animationData={errorAnimation}/>
                        <p className="mb-4 text-3xl tracking-tight font-bold text-[#68bdff] md:text-4xl mt-5">Something,s missing.</p>
                        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can,t find that page. You,ll find lots to explore on the home page. </p>
                        <a href="/" className="inline-flex text-white bg-[#fe9ffe] font-medium rounded-lg text-sm px-5 py-2.5 text-center  my-4">Back to Homepage</a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ErrorPage;