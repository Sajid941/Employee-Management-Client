import { useLoaderData, useLocation } from "react-router-dom";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, } from 'recharts';
import useUser from "../../hooks/useUser";

const Details = () => {
    const data = useLoaderData()
    const { pathname } = useLocation()
    const email = pathname.split('/')[3]
    const { users } = useUser()
    const currentUser = users?.filter(user => user.email === email)[0]
    return (
        <div className="w-full ">
            <div className="flex justify-center">
                <div className="flex flex-col items-center  shadow-md rounded-md p-4 space-y-1">
                    <img src={currentUser?.photo} alt="employee photo" className="w-20 h-20 object-cover rounded-full" />
                    <h4 className="text-2xl font-semibold">{currentUser?.name}, <span className="text-[#737373] text-xl">{currentUser?.designation}</span></h4>
                </div>
            </div>
            {
                data.length ?
                    <ResponsiveContainer width="100%" height={400} className="lg:p-10 mt-10 lg:mt-0">
                        <BarChart data={data}>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Tooltip />
                            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                            <Bar dataKey="salary" fill="#3b82f6" />
                        </BarChart>
                    </ResponsiveContainer>:
                    <div className="mt-10">
                        <h1 className="text-center text-2xl lg:text-4xl text-warning font-bold ">The Employee do not have payment history</h1>
                    </div>
            }

        </div>


    );
};

export default Details;