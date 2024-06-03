import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import SectionTitle from './SectionTitle/SectionTitle';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Testimonial = () => {
    const {}= useQuery({
        queryKey:['reviews'],
        queryFn:async()=>{
            const res = await axios('reviews.json')
            return res.data
        }
    })
    return (
        <div className='px-5 md:px-10 lg:px-20'>
            <div>
                <SectionTitle heading="Testimonial"/>
            </div>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Testimonial;