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
  sortVal: any;
  sortSet: (v: any) => void;
  searchVal: string;
  searchSet: (v: any) => void;
}

export const CourseList = ({sortVal, sortSet, searchVal, searchSet} : ICourseList) => {
  const [showActiveOnly, setShowActiveOnly] = useState<boolean | undefined>(true) // show only active courses (true - active only, undefined - all courses)
  const { data: courseData, status: courseStatus, refetch: courseRefetch } = useQuery(['courses', showActiveOnly], () => getCourses(showActiveOnly))

  const searchData = useMemo(() => searchFunc(searchVal, courseData, ['name']), [searchVal, courseData]);
  const sorted = useMemo(() => sortFunc(searchData, sortVal), [searchData, sortVal]);

  if (courseStatus == 'loading') {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <div className='w-full h-full flex flex-col items-center'>
        { sorted.length == 0 ? 
          <div className='w-full h-full flex justify-center items-center p-10 font-semibold text-xl'> Brak Wyników </div> :
          sorted.map(function(course : Course) {
            return (
              <Link to={'/courses/' + course.id} className='w-full'>
                <Box>
                  <span className='font-semibold text-xl'> { course.name }</span>
                  <span className='font-normal text-base text-slate-600'> { course.description }</span>
                </Box>
              </Link>
            )
        }) }
        <Button type={ButtonType.ACTION} text={showActiveOnly ? 'Pokaż nieaktywne' : 'Schowaj nieaktywne'} onClick={() => {setShowActiveOnly(showActiveOnly ? undefined : true)}} />
    </div>
  )
}