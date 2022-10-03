import { Box } from 'components'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { getCourses } from '../api/getCourses'
import { CoursesRoutes } from '../routes'
import { Course } from '../types'

export const CourseList = () => {
  // const [newCourse, setNewCourse] = useState('')
  const coursesQuery = useQuery('courses', getCourses)

  // TODO move the mutations into separate files in the API directory (see bulletproof_react)

  if (coursesQuery.isLoading) {
    return (
      <div>
        Loading..
      </div>
    );
  }

console.log(coursesQuery.data)

  return (
    <div className='flex w-full flex-wrap gap-4'>
        { coursesQuery.data.map(function(course : Course) {
            return <Link to= {'/courses/' + course.id}>
                    <Box>
                      <span className='font-semibold text-xl'> { course.name }</span>
                      <span className='font-normal text-base'> { course.description }</span>
                    </Box>
                    </Link>
        }) }
    </div>
  )
}