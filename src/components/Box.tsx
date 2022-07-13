import React from 'react'

interface BoxProps {
    title: string;
    highlight?: string;
    children?: React.ReactNode;
}

export const Box = ({title, highlight, children} : BoxProps) => {
  return (
    <div className='w-96 h-80 bg-white shadow-md flex flex-col mx-3 my-3 font-semibold text-lg rounded-md hover:cursor-pointer'>
      <div className='w-full h-9 bg-blue-700 rounded-t-md'></div>
      <div className='w-full p-4'>
        {title}
      </div>
    </div>
  )
}