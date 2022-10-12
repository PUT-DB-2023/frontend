import React from 'react'
import { Link } from 'react-router-dom';

interface BoxProps {
    color?: string;
    children?: React.ReactNode;
    route: string
}

export const Box = ({color='bg-blue-800', children, route} : BoxProps) => {
  return (
    <Link to={route} className='w-full lg:w-auto'>
      <div className='lg:w-96 w-full h-80 bg-white shadow-md flex flex-col rounded-md hover:cursor-pointer hover:bg-blue-50 transition-all'>
        <div className={`w-full h-9 rounded-t-md ${color}`}></div>
        <div className='w-full p-4 flex flex-col gap-4'>
          { children }
        </div>
      </div>
    </Link>
  )
}