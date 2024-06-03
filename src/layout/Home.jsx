import { Helmet } from "react-helmet";
import Banner from "../components/Banner/Banner";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title> Home | LogiLink Labs </title>
            </Helmet>
            <Banner />
        </div>
    );
};

export default Home;