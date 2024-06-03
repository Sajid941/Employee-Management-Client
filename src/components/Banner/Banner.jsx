import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { Scrollbar,Autoplay } from 'swiper/modules';
import Slide from './Slide';

import celebrationImg from "../../assets/Banner/undraw_celebration_re_kc9k.svg"
import projectImg from "../../assets/Banner/undraw_project_completed_re_jr7u.svg"
import customerImg from "../../assets/Banner/undraw_survey_05s5.svg"
const Banner = () => {
    return (
        <div>
            <Swiper
                scrollbar={{
                    hide: true,
                }}
                autoplay={{
                    delay:5000,
                    disableOnInteraction:false
                }}
                modules={[Scrollbar,Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <Slide 
                    title="Celebrating 10 Years of Innovation and Excellence!"
                    description="Over the past decade, we have dedicated ourselves to pushing the boundaries of innovation and delivering unparalleled excellence in everything we do. From our humble beginnings, we have grown into a leader in the industry, known for our commitment to quality, creativity, and customer satisfaction."
                    image={celebrationImg}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide 
                    title="Completed 10000+ Successful Projects Globally!"
                    description="For over 2024/May, we have been at the forefront of delivering exceptional solutions to clients around the world. With dedication, expertise, and a commitment to excellence, we are proud to announce the completion of over 1000 successful projects across [industry/sector] on a global scale."
                    image={projectImg}
                    />
                    
                </SwiperSlide>
                <SwiperSlide>
                    <Slide 
                    title="Reached 100,000 Happy Customers Worldwide!"
                    description="We are thrilled to announce a significant milestone in our journey: the celebration of reaching 100,000 happy customers from every corner of the globe. This remarkable achievement is a testament to our unwavering commitment to customer satisfaction, quality service, and innovative solutions."
                    image={customerImg}
                    />
                    
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Banner;