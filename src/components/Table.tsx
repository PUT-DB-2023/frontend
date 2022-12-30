import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable
} from '@tanstack/react-table';
import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { UserType } from 'types';

interface ILinkCell {
  row: any;
  getValue: any;
  baseUrl: string;
  userType?: UserType;
}

export const LinkCell = ({row, getValue, baseUrl} : ILinkCell) => {
  return  (
            <Link to={baseUrl ? {pathname:`/users/${baseUrl}${row.original.user.id}`}: {pathname:`/users/${row.original.id}`}}>
                <div className='p-2'>
                    {getValue() as ReactNode}
                </div>
            </Link>
          )
}

interface ITable {
  data: any;
  columns: ColumnDef<any>[];
}

export const Table = ({ data, columns } : ITable) => {
    const [sorting, setSorting] = React.useState<SortingState>([])
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className="w-full rounded-lg">
            <table className='border-slate-300 bg-white lg:w-full lg:table block w-full overflow-x-auto'>
            <thead className='text-base'>
                {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                    <th key={header.id} className='text-left border border-slate-300 p-2 hover:text-zinc-600' onClick={header.column.getToggleSortingHandler()}>
                        {header.isPlaceholder ? null : (
                      <div
                        {...{
                          className: `flex justify-between ${header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : ''}`,
                          onClick: () => header.column.getToggleSortingHandler(),
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12" />
                          </svg>,
                          desc: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M 15.75 15 m-7.5-6 L 12 5.25 15.75 9" />
                          </svg>,
                        }[header.column.getIsSorted() as string] ?? 
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
                          </svg>
                        }
                      </div>
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
  