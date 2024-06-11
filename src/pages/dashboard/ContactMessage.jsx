import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const ContactMessage = () => {
    const axiosSecure = useAxiosSecure()
    const { data: contactMessages = [] } = useQuery({
        queryKey: ['contact message'],
        queryFn: async () => {
            const res = await axiosSecure('/contactMessage')
            return res.data
        }
    })
    return (
        <div className="mx-5 lg:mx-10">
            <SectionTitle heading="Contact Messages" />
            <div className="grid grid-cols-1 md:grid-cols-2 mt-10 gap-5">
                {
                    contactMessages.map(message => (
                        <div
                        className="border-2 p-5 rounded-lg hover:border-[#63ece5] bg-[#f9fafb] hover:bg-[#f7f8fa] space-y-2"
                            key={message._id}
                        >
                            <div className="flex gap-2  items-center">
                                <img className="w-12 h-12 rounded-full object-cover" src={message.photo} alt="Sender" />
                                <div>
                                    <p className="text-[13px">{message.name?message.name: message.email.split('@')[0]}</p>
                                    <p className="text-xs hover:text-mainColor">{message.email}</p>
                                </div>
                            </div>
                            <h4 className="font-bold">{message?.subject}</h4>
                            <p className="text-[#737373]">{message?.description}</p>

                        </div>
                    ))
                }
            </div>

        </div>
    );
};

export default ContactMessage;