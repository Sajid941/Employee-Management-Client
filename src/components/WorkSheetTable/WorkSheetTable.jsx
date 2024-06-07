import PropTypes from 'prop-types'
import { useMemo } from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

const WorkSheetTable = ({workSheets}) => {


    const data = useMemo(() => workSheets, [workSheets])
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor("S.NO", {
            cell: info => <span>{info.row.index + 1}</span>,
            header: "Id"
        }),
        columnHelper.accessor('task', {
            cell: info => <span>{info.getValue()}</span>,
            header: "Tasks"
        }),
        columnHelper.accessor("hoursWorked", {
            cell: info => <span>{info.getValue()}h</span>,
            header: "Hours Worked"
        }),
        columnHelper.accessor("date", {
            cell: info => <span>{info.getValue()}</span>,
            header: "Date"
        })
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })

    return (
        <div className=" w-full mt-16 space-y-5">
            <h1 className="text-2xl text-center font-medium">Submitted Work Sheet</h1>
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
                        table.getRowModel().rows.map(row=>(
                            <tr key={row.id}>
                                {
                                    row.getVisibleCells().map(cell=>(
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

export default WorkSheetTable;
WorkSheetTable.propTypes={
    workSheets:PropTypes.array
}