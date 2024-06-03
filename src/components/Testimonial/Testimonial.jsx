import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination,Autoplay } from 'swiper/modules';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import SectionTitle from '../SectionTitle/SectionTitle';

const Testimonial = () => {
    const { data: reviews = [] } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axios('reviews.json')
            return res.data
        }
    })
    return (
        <div className='px-5 md:px-10 lg:px-20 mt-10'>
            <div>
                <SectionTitle  subHeading="Testimonial"  heading="Our Clients Say"/>
            </div>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                }}
                autoplay={{
                    delay:5000,
                    disableOnInteraction:false
                }}
                modules={[Pagination,Autoplay]}
                className="mySwiper"
            >
                {
                    reviews.map((review, idx) => <SwiperSlide key={idx}>
                        <section className="bg-white dark:bg-[#1d232a]">
                            <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
                                <figure className="max-w-screen-md mx-auto">
                                    <svg className="h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor" />
                                    </svg>
                                    <blockquote>
                                        <p className="text-2xl font-medium text-gray-900 dark:text-white">{review.testimonial}</p>
                                    </blockquote>
                                    <figcaption className="flex items-center justify-center mt-6 space-x-3">
                                        <img className="w-6 h-6 rounded-full" src={review.photo} />
                                        <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
                                            <div className="pr-3 font-medium text-gray-900 dark:text-white">{review.name}</div>
                                            <div className="px-3 text-sm font-light text-gray-500 dark:text-gray-400">{review.position}</div>
                                            <div className="pl-3 text-sm font-light text-gray-500 dark:text-gray-400">
                                                <Rating style={{ maxWidth: 100 }} value={review.stars} disable/>
                                            </div>
                                        </div>
                                    </figcaption>
                                </figure>
                            </div>
                        </section>
                    </SwiperSlide>)
                }
            </Swiper>
        </div>
    );
};

export default Testimonial;