import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMemo } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Swal from "sweetalert2/dist/sweetalert2";
import toast from "react-hot-toast";
import useAllUsers from "../../hooks/useAllUsers";

const AllEmployeeList = () => {
    const axiosSecure = useAxiosSecure()

    const { users, refetch } = useAllUsers()
    const handleMakeHr = (id, name) => {
        Swal.fire({
            title: `Do you want to make ${name} HR`,
            text: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make HR"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.patch(`/makeHr/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            toast.success(`${name} is now HR`)
                            refetch()
                        }
                    })
            }
        });
    }
    const handleDeleteUser = uid => {
        Swal.fire({
            title: `Do you want to Delete ${name} `,
            text: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/deleteUser/${uid}`)
                    .then(res => {
                        if (res.data.message === "success") {
                            axiosSecure.put(`/firedUser/${uid}`)
                            .then(res=>{
                                if(res.data.modifiedCount > 0){
                                    refetch()
                                }
                            })

                        }
                    })
            }
        });
    }
    const data = useMemo(() => users, [users])
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor("S.NO", {
            cell: info => <span>{info.row.index + 1}</span>,
            header: "Id"
        }),
        columnHelper.accessor('name', {
            cell: info => <span>{info.getValue()}</span>,
            header: "Name"
        }),
        columnHelper.accessor("designation", {
            cell: info => <span>{info.getValue()}</span>,
            header: "Designation"
        }),
        columnHelper.display({
            cell: ({ row }) => <div>
                <button
                    onClick={() => handleMakeHr(row?.original?._id, row?.original?.name)}
                    disabled={row.original.role === "hr"}
                    className="btn btn-xs bg-green-500 hover:bg-green-400">
                    Make HR
                </button>
            </div>,
            header: "Make HR"
        }),
        columnHelper.display({
            cell: ({ row }) => <div>
                <button
                    onClick={() => handleDeleteUser(row.original.uid)}
                    disabled={row.original.isFired === true}
                    className="btn btn-xs bg-red-500 hover:bg-red-400 text-white">
                    {row.original.isFired === true ? 'Fired' : "Fire"}
                </button>
            </div>,
            header: "Action"
        }),
        columnHelper.display({
            cell: ({ row }) => <div>
                <button
                    className="btn btn-xs bg-[#374151] hover:bg-red-400 text-white">
                    Adjust Salary
                </button>
            </div>,
            header: "Adjust Salary"
        })
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div className=" w-full mt-16 space-y-5 lg:mx-10">
            <h1 className="text-2xl text-center font-medium">All EmploYee List</h1>
            <table className="table border p-5 rounded-md">
                <thead>
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

export default AllEmployeeList;