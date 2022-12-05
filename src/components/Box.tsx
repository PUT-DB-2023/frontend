import React from 'react'

interface IBox {
    color?: string;
    children?: React.ReactNode;
}

export const Box = ({color='bg-blue-800', children} : IBox) => {
  return (
    <div className='w-full mb-6 h-32 lg:h-24 bg-zinc-200 shadow-md flex flex-row font-semibold text-lg rounded-lg hover:cursor-pointer hover:bg-zinc-100'>
      <div className={`w-6 h-full rounded-l-md ${color}`}></div>
      <div className='w-full flex flex-col px-4 py-2 gap-1'>
        { children }
      </div>
    </div>
  )
}