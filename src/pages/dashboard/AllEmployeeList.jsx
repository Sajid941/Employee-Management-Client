import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useMemo } from "react";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import Swal from "sweetalert2/dist/sweetalert2";
import toast from "react-hot-toast";
import useAllUsers from "../../hooks/useAllUsers";

const AllEmployeeList = () => {
    const axiosSecure = useAxiosSecure()

    const { users, refetch, } = useAllUsers()
    const handleMakeHr = (id, name , role) => {
        if(role === "hr"){
            return toast.error('ALready HR')
        }
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
                                .then(res => {
                                    if (res.data.modifiedCount > 0) {
                                        refetch()
                                    }
                                })

                        }
                    })
            }
        });
    }

    const handleSalary = (e) => {
        e.preventDefault()
        const id = e.target.id.value
        const salary = e.target.salary.value
        axiosSecure.patch(`/adjustSalary/${id}`, { salary })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    e.target.reset()
                    toast.success('Salary Adjust Successfully')
                }
            })
        console.log(id, salary);
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
                    onClick={() => handleMakeHr(row?.original?._id, row?.original?.name, row.original.role)}
                    disabled={ row.original.isFired}
                    className="btn border-0 btn-xs bg-green-500 hover:bg-green-400">
                    {row.original.role === 'hr' ? "HR" : "Make HR"}
                </button>
            </div>,
            header: "Make HR"
        }),
        columnHelper.display({
            cell: ({ row }) => <div>
                <button
                    onClick={() => handleDeleteUser(row.original.uid)}
                    disabled={row.original.isFired === true}
                    className="btn border-0 btn-xs bg-red-500 hover:bg-red-400 text-white">
                    {row.original.isFired ? 'Fired' : "Fire"}
                </button>
            </div>,
            header: "Action"
        }),
        columnHelper.display({
            cell: ({ row }) => <div>
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button
                    className="btn border-0 btn-xs bg-[#374151] hover:bg-[#506079] text-white"
                    onClick={() => document.getElementById(`my_modal_${row.original._id}`).showModal()}
                    disabled={row.original.isFired}
                >
                    Adjust Salary
                </button>
                <dialog id={`my_modal_${row.original._id}`} className="modal">
                    <div className="modal-box">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn border-0 btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                        <div>
                            <form onSubmit={handleSalary}>
                                <input
                                    hidden
                                    type="text"
                                    value={row.original._id}
                                    name="id"
                                />
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Salary</label>
                                    <input type="number"
                                        min={row.original.salary}
                                        name="salary"
                                        defaultValue={row.original.salary}
                                        required
                                        className="block w-full mb-2 px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <button className="py-4 btn">Adjust</button>
                            </form>
                        </div>
                    </div>
                </dialog>
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

export default AllEmployeeList;