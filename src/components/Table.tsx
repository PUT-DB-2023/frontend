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

const LinkCell = ({row, getValue} : {row: any, getValue: any}) => {   
    return  (
                <Link to={{pathname:`/users/${row.original.id}`}}>
                    <div className='p-2'>
                        {getValue() as ReactNode}
                    </div>
                </Link>
            )
}

const columns: ColumnDef<User>[] = [
    {
        accessorKey: 'id',
        header: () => 'Nr Indeksu',
        cell: ({row, getValue}) => LinkCell({row, getValue})
    },
    {
        accessorKey: 'first_name',
        header: () => 'Imię',
        cell: ({row, getValue}) => LinkCell({row, getValue})
    },
    {
        accessorKey: 'last_name',
        header: () => 'Nazwisko',
        cell: ({row, getValue}) => LinkCell({row, getValue})
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({row, getValue}) => LinkCell({row, getValue})
    },
]

export const Table = ({ data } : any) => {
    const navigate = useNavigate()
    console.log(data);
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="w-full rounded-md">
            <table className='border-slate-300 bg-white lg:w-full lg:table block w-full overflow-x-auto'>
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
