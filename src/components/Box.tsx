import React from 'react'

interface BoxProps {
    title: string;
    color?: string;
    children?: React.ReactNode;
}

export const Box = ({title, color='bg-blue-800', children} : BoxProps) => {
  return (
    <div className='w-96 h-80 bg-white shadow-md flex flex-col font-semibold text-lg rounded-md hover:cursor-pointer'>
      <div className={`w-full h-9 rounded-t-md ${color}`}></div>
      <div className='w-full p-4'>
        {title}
      </div>
    </div>
  )
}