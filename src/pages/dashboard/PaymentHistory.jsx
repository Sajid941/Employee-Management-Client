import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMemo } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const PaymentHistory = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure(`/payments/${user?.email}`)
            return res.data
        }
    })
    const data = useMemo(() => payments, [payments])
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor("S.NO", {
            cell: info => <span>{info.row.index + 1}</span>,
            header: "Id"
        }),
        columnHelper.accessor("date", {
            cell: info => <span>{info.getValue()}</span>,
            header: "Date"
        }),
        columnHelper.accessor("salary", {
            cell: info => <span>{info.getValue()}</span>,
            header: "Amount"
        }),
        columnHelper.accessor("transitionId", {
            cell: info => <span>{info.getValue()}</span>,
            header: "Transition Id"
        }),

    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })
    return (
        <div className=" w-full mt-16 space-y-5 lg:mx-10">
            <SectionTitle subHeading="Happy" heading="Payment History"/>
            <table className="table border p-5 rounded-md">
                <thead className="dark:text-white">
                    {
                        table.getHeaderGroups().map(headerGroups => (
                            <tr key={headerGroups.id}>
                                {headerGroups.headers.map(header => (
                                    <th key={header.id}>
                                        {
                                            header.isPlaceholder ?
                                                null :
                                                flexRender(header.column.columnDef.header,
                                                    header.getContext())
                                        }
                                    </th>
                                ))}
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
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;