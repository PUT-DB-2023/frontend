import React from 'react'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { User } from '../types'
import { userList } from '../api/getUsers'

import '../components/index.css'

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: () => 'Nr Indeksu',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'firstName',
    header: () => 'Imię',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'lastName',
    header: () => 'Nazwisko',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'email',
    header: () => 'Email',
    cell: info => info.getValue(),
  },
  {
    accessorKey: 'password',
    header: () => 'Password',
    cell: info => info.getValue(),
  },
]

export const UserList = () => {

  const [data, setData] = React.useState(() => [...userList])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="p-2">
      <table className='border border-slate-300 bg-white shadow-md'>
        <thead className='text-sm'>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
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
        <tbody className='text-sm border border-slate-300'>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
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
