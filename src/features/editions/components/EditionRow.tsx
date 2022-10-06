import React from 'react'

interface EditionRowProps {
    color?: string;
    children?: React.ReactNode;
}

export const EditionRow = ({color='bg-blue-800', children} : EditionRowProps) => {
  return (
    <div className='w-full mb-6 h-20 bg-slate-200 shadow-md flex flex-row font-semibold text-lg rounded-md hover:cursor-pointer hover:bg-slate-100'>
      <div className={`w-6 h-full rounded-l-md ${color}`}></div>
      <div className='w-full flex flex-col p-2'>
        { children }
      </div>
    </div>
  )
}