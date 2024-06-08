import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMemo } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import toast from "react-hot-toast";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const EmployeeList = () => {
    const axiosSecure = useAxiosSecure()
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure('/users')
            return res.data
        }
    })

    const handleVerified = (id, name) => {

        Swal.fire({
            title: `Do you want to verify ${name}?`,
            text: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Verify"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            toast.success("Verified Successfully")
                        }
                    })
            }
        });

    }

    const handlePay = id =>{
        axiosSecure.post('/pay',{id})
        .then(res=>{
            console.log(res.data);
        })
        .catch(error=>{

            console.error(error)
        })
    }

    const data = useMemo(() => users, [users])
    const columnHelper = createColumnHelper()
    const columns = [
        columnHelper.accessor('S.NO', {
            cell: info => <span>{info.row.index + 1}</span>,
            header: "Id"
        }),
        columnHelper.accessor('name', {
            cell: info => <span>{info.getValue()}</span>,
            header: "Name"
        }),
        columnHelper.display({
            cell: ({ row }) => (
                row.original.isVerified ?
                    <button
                        className="btn btn-xs border-0 bg-green-500 hover:bg-green-400 text-white"
                    >
                        ✔
                    </button> :
                    <button
                        onClick={() => handleVerified(row.original._id, row.original.name)}
                        className="btn btn-xs border-0 bg-red-500 hover:bg-red-400 text-white"
                    >
                        ✘
                    </button>

            ),
            header: "Verify"
        }),
        columnHelper.accessor('bankAccount', {
            cell: info => <span>{info.getValue()}</span>,
            header: "Bank Account"
        }),
        columnHelper.accessor('salary', {
            cell: info => <span>{info.getValue()}</span>,
            header: "Salary"
        }),
        columnHelper.display({
            // cell: ({ row }) => <button disabled={!row.original.isVerified} className="btn btn-xs bg-[#374151] hover:bg-[#506079] text-white">Pay</button>,
            cell: ({ row }) => <div>
                < button disabled={!row.original.isVerified} className="btn btn-xs border-0 bg-[#374151] hover:bg-[#506079] text-white" onClick={() => document.getElementById('my_modal_'+row.original._id).showModal()}>Pay</button >
                <dialog id={"my_modal_"+row.original._id} className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <h3 className="font-bold text-lg">Pay {row.original.name}</h3>
                        <button onClick={()=>handlePay(row.original._id)} className="btn">{row.original._id}</button>
                    </div>
                </dialog>
            </div>,
            header: "Action"
        }),
        columnHelper.accessor('details', {
            cell: () => <button className="btn btn-xs">Details</button>,
            header: "Action"
        }),
    ]

    const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })

    return (
        <div className="w-full mx-5  lg:mx-10 ">
            <SectionTitle subHeading="Pay Fast" heading="Employee List" />
            <div className="overflow-x-auto">
                <table className="table mt-20 ">
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

export default EmployeeList;