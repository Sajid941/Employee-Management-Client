import { Helmet } from "react-helmet";
import Banner from "../components/Banner/Banner";
import OurServices from "../components/OurServices/OurServices";
import Testimonial from "../components/Testimonial";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title> Home | LogiLink Labs </title>
            </Helmet>
            <Banner />
            <OurServices/>
            <Testimonial/>
        </div>
    );
};

export default Home;