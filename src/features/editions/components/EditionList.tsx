import { Box } from 'components'
// import { courseList } from 'features/courses/api/getCourses'
import React from 'react'
import { Link } from 'react-router-dom'

export const EditionList = () => {
  return (
    <div className='flex flex-col'>
        <h1 className='text-lg font-bold mb-10'>Edycje</h1>
        <h2 className='text-base font-semibold mt-4'>Aktywne edycje</h2>
        <div className='flex w-full flex-wrap gap-4 mt-6 mb-8'>
            {/* { courseList.map(function(object) {
                return <Link to= {'/courses/' + object.id}>
                        <Box title={ object.name } color='bg-blue-700'></Box>
                        </Link>
            }) } */}
        </div>
        <h2 className='text-base font-semibold mt-4'>Zakończone edycje</h2>
        <div className='flex w-full flex-wrap gap-4 mt-6 mb-8'>
            {/* { courseList.map(function(object) {
                return <Link to= {'/courses/' + object.id}>
                        <Box title={ object.name } color='bg-red-500'></Box>
                        </Link>
            }) } */}
            </div>
    </div>
  )
}
