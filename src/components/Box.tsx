import React from 'react'

interface BoxProps {
    color?: string;
    children?: React.ReactNode;
}

export const Box = ({color='bg-blue-800', children} : BoxProps) => {
  return (
    <div className='w-96 h-80 bg-white shadow-md flex flex-col rounded-md hover:cursor-pointer hover:bg-blue-50 transition-all'>
      <div className={`w-full h-9 rounded-t-md ${color}`}></div>
       <div className='w-full p-4 flex flex-col gap-4'>
        { children }
      </div>
    </div>
  )
}