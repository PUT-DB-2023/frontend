import { Box } from 'components'
import { Spinner } from 'components/Spinner'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { getCourses } from '../api/getCourses'
import { CoursesRoutes } from '../routes'
import { Course } from '../types'

export const CourseList = ( { courseData } : any) => {
  console.log(courseData);
  return (
    <div className='w-full h-full'>
        { courseData.length == 0 ? 
          <div className='font-semibold text-xl'> Brak Przedmiotów </div> :
          courseData.map(function(course : Course) {
            return (
              <Link to={'/courses/' + course.id}>
                <Box>
                  <span className='font-semibold text-xl'> { course.name }</span>
                  <span className='font-normal text-base text-slate-600'> { course.description }</span>
                </Box>
              </Link>
            )
        }) }
    </div>
  )
}