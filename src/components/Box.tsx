import React from 'react'

interface IBox {
    color?: string;
    children?: React.ReactNode;
}

export const Box = ({color='bg-blue-800', children} : IBox) => {
  return (
    <div className='w-full mb-6 h-32 lg:h-24 bg-slate-200 shadow-md flex flex-row font-semibold text-lg rounded-md hover:cursor-pointer hover:bg-slate-100'>
      <div className={`w-6 h-full rounded-l-md ${color}`}></div>
      <div className='w-full flex flex-col p-2 gap-1'>
        { children }
      </div>
    </div>
  )
}