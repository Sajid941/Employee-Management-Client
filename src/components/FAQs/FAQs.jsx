import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FAQs = () => {
    const { data:faqs = [] } = useQuery({
        queryKey: ['faqs'],
        queryFn: async () => {
            const res = await axios('faqs.json')
            return res.data
        }
    })
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-5 lg:px-20 mt-10 items-center">
            <div>
                <h1 className="text-4xl font-bold text-mainColor">FAQs</h1>
                <p className="text-[#737373]">Have questions? Here you will find the answers  most valued by <br /> our partners, along with access to step by step instructions and support</p>
            </div>
            <div>
                <div className="join join-vertical w-full">
                    {
                        faqs.map((faq, idx) => <div key={idx} className="collapse collapse-arrow join-item border border-base-300">
                            <input type="radio" name="my-accordion-4" defaultChecked />
                            <div className="collapse-title text-xl font-medium">
                                {faq.question}
                            </div>
                            <div className="collapse-content">
                                <p>{faq.answer}</p>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default FAQs;