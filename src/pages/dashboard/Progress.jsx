import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {  useMemo, useState } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { format } from 'date-fns';
import DatePicker from "react-datepicker";

const Progress = () => {
    const axiosSecure = useAxiosSecure()
    const [selectedDate, setSelectedDate] = useState('')

    console.log(selectedDate);
    const { data: workSheets = [] } = useQuery({
        queryKey: ['work sheet'],
        queryFn: async () => {
            const res = await axiosSecure('/workSheet')
            return res.data
        }
    })
    console.log(selectedDate);
    const data = useMemo(() => {
        if (selectedDate) {
            return workSheets.filter(workSheet => workSheet.date === selectedDate)
        }
        return workSheets
    }, [workSheets, selectedDate])
    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor("S.NO", {
            cell: info => <span>{info.row.index + 1}</span>,
            header: "Id"
        }),
        columnHelper.accessor('email', {
            cell: info => <span>{info.getValue()}</span>,
            header: "Email"
        }),
        columnHelper.accessor('task', {
            cell: info => <span>{info.getValue()}</span>,
            header: "Tasks"
        }),
        columnHelper.accessor("hoursWorked", {
            cell: info => <span>{info.getValue()}</span>,
            header: "Hours Worked"
        }),
        columnHelper.accessor("date", {
            cell: info => <span>{info.getValue()}</span>,
            header: "Date"
        })
    ]

    const [filtering, setFiltering] = useState("")
    console.log(filtering);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            globalFilter: filtering,
        },
        onGlobalFilterChange: setFiltering
    })

    return (
        <div className=" w-full mb-16 space-y-7 lg:mx-10  px-5 ">
            <SectionTitle subHeading="progress" heading="Employees Work Sheets" />
            <div className="flex gap-5 items-center">
                <div>
                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Filter by Email</label>
                    <input
                        value={filtering}
                        onChange={(e) => setFiltering(e.target.value)}
                        placeholder="Enter a employee email"
                        type="text"
                        className="block w-full  px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                </div>
                <div className="relative">
                    <label className="text-gray-700 text-sm dark:text-gray-200" htmlFor="date">Filter by Date</label>
                    <br />
                    <DatePicker
                        selected={selectedDate}
                        placeholderText="mm/dd/yy"
                        onChange={date => setSelectedDate(format(date, 'MM/dd/yy'))}
                        className="block w-full  px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                    <div className="absolute -right-3 top-5">
                        <button className="btn btn-xs border-0 bg-red-500 text-white hover:bg-red-400" onClick={() => setSelectedDate('')}>Clear Date</button>
                    </div>
                </div>

            </div>
            <div className="overflow-x-auto">
                <table className="table border">
                    <thead className="dark:text-white">
                        {
                            table.getHeaderGroups().map(headerGroups => (
                                <tr key={headerGroups.id}>
                                    {
                                        headerGroups.headers.map(header => (
                                            <th key={header.id}>
                                                {
                                                    flexRender(header.column.columnDef.header, header.getContext())
                                                }
                                            </th>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </thead>
                    <tbody>
                        {
                            table.getRowModel().rows.map(row => (
                                <tr key={row.id}>
                                    {
                                        row.getVisibleCells().map(cell => (
                                            <td key={cell.id}>
                                                {
                                                    flexRender(cell.column.columnDef.cell, cell.getContext())
                                                }
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Progress;