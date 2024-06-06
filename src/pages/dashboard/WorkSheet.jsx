import { useState } from "react";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form"
import { format } from "date-fns";

const WorkSheet = () => {
    const { register, handleSubmit,  } = useForm()
    const [selectedDate, setSelectedDate] = useState(new Date())
    const date = format(selectedDate, "MM/dd/yy")
    const onSubmit = (data) => {
        console.log(data, date);
    }
    return (
        <div className="space-y-4">
            <SectionTitle subHeading="submit now" heading="Work Sheet" />
            <div className="text-center">
                <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="task">Tasks</label>
                                <select
                                    {...register('task', { required: true })}
                                    id="task"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                >
                                    <option value="Sales">Sales</option>
                                    <option value="Support">Support</option>
                                    <option value="Content">Content</option>
                                    <option value="Paper Work">Paper Work</option>
                                </select>
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="hoursWorked">Hours Worked</label>
                                <input
                                    {...register('hoursWorked', { required: true })}
                                    id="hoursWorked"
                                    type="number"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                />
                            </div>

                            <div>
                                <label className="text-gray-700 dark:text-gray-200" htmlFor="date">Date</label>
                                <br />
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={date => setSelectedDate(date)}
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                />
                            </div>

                        </div>

                        <div className="flex justify-end mt-6">
                            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                                Submit
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default WorkSheet;