import SectionTitle from "../SectionTitle/SectionTitle";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const OurServices = () => {
    const { data: services = [] } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const res = await axios('services.json')
            return res.data
        }
    })
    return (
        <div className="mt-10 bg-[url('https://i.ibb.co/CzBXWgR/Curve-Line-2.png')] dark:bg-[url('https://i.ibb.co/K7DpG0X/Curve-Line-1.png')] bg-cover bg-no-repeat py-10 px-5 md:px-10 lg:px-20">
            <SectionTitle subHeading="services" heading="Services We Provide" />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-10">
                {
                    services.map((service, idx) =>
                        <div key={idx} className="card shadow-xl bg-white/5 bg-opacity-25 backdrop-blur-sm border">
                            <figure className="px-10 pt-10">
                                <img src={service.image} alt="Shoes" className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center space-y-5">
                                <h2 className="card-title ">{service.title}</h2>
                                <p>{service.description.slice(0, 101)} ...</p>
                                <div className="card-actions">
                                    <button className="py-1 px-7 rounded-full bg-mainColor text-white">More</button>
                                </div>
                            </div>
                        </div>)
                }
            </div>
            <div className="flex justify-center mt-5">
                <button className="bg-[#3d3d3d] text-white p-3 rounded-md  dark:bg-white dark:text-black">More Services</button>
            </div>
        </div>
    );
};

export default OurServices;