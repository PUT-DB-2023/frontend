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
    <div className='flex w-full flex-wrap gap-4'>
        { courseData.map(function(course : Course) {
            return (
              <Box route={"/courses/" + course.id}>
                <span className='font-semibold text-xl'> { course.name }</span>
                <span className='font-normal text-base text-slate-600'> { course.description }</span>
              </Box>
            )
        }) }
    </div>
  )
}