import { Helmet } from "react-helmet";
import Banner from "../components/Banner/Banner";
import OurServices from "../components/OurServices/OurServices";
import Newsletter from "../components/Newsletter/Newsletter";
import Footer from "../components/Footer/Footer";
import FAQs from "../components/FAQs/FAQs";
import Testimonial from "../components/Testimonial/Testimonial";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title> Home | LogiLink Labs </title>
            </Helmet>
            <Banner />
            <OurServices/>
            <Testimonial/>
            <FAQs/>
            <Newsletter/>
            <Footer/>
        </div>
    );
};

export default Home;