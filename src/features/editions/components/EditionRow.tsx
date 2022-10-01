import React from 'react'

interface BoxProps {
    color?: string;
    children?: React.ReactNode;
}

export const EditionRow = ({color='bg-blue-800', children} : BoxProps) => {
  return (
    <div className='w-full mb-6 h-16 bg-slate-200 shadow-md flex flex-row font-semibold text-lg rounded-md hover:cursor-pointer'>
      <div className={`w-6 h-full rounded-l-md ${color}`}></div>
      <div className='w-full flex p-2'>
        { children }
        <span className='text-base font-semibold'>Lato 2022</span>
      </div>
    </div>
  )
}