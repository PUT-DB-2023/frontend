import React, { ReactNode } from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { User } from 'features/users'
import { Button } from './Button'
import { ButtonType } from 'types'
import { Link, useNavigate } from 'react-router-dom'

export const LinkCell = ({row, getValue, baseUrl} : {row: any, getValue: any, baseUrl : string}) => {   
    return  (
                <Link to={{pathname:`/users/${baseUrl}/${row.original.id}`}}>
                    <div className='p-2'>
                        {getValue() as ReactNode}
                    </div>
                </Link>
            )
}

export const Table = ({ data, columns } : any) => {
    console.log(data);
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="w-full rounded-md">
            <table className='border-slate-300 bg-white lg:w-full md:w-full lg:table md:table block w-full overflow-x-auto'>
            <thead className='text-base'>
                {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                    <th key={header.id} className='text-left border border-slate-300 p-2'>
                        {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                            )}
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody className='text-sm text-zinc-600 border border-slate-300'>
                {table.getRowModel().rows.map(row => (
                <tr key={row.id} className='hover:bg-zinc-100 transition-all cursor-pointer'>
                    {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className='border border-slate-300'>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                    ))}
                </tr>
                ))}
            </tbody>
            </table>
            <div className="h-4" />
        </div>
    )
}
