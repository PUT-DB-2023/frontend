import { searchFunc } from 'api/searchApi'
import { sortFunc } from 'api/sortFilter'
import { Box } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { ButtonType, coursesSortOptions } from 'types'
import { getCourses } from '../api/getCourses'
import { CoursesRoutes } from '../routes'
import { Course } from '../types'

interface ICourseList {
  courseData: Course[];
}

export const CourseList = ({courseData} : ICourseList) => {

  return (
    <div className='w-full h-full flex flex-col items-center'>
        { courseData.length == 0 ? 
          <div className='w-full h-full flex justify-center items-center p-10 font-semibold text-xl'> Brak Wyników </div> :
          courseData.map(function(course : Course) {
            return (
              <Link to={'/courses/' + course.id} className='w-full'>
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