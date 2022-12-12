import { searchFunc } from 'api/searchApi'
import { sortFunc } from 'api/sortFilter'
import { Box } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import { Toolbar } from 'components/Toolbar'
import React, { useEffect, useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { ButtonType, coursesSortOptions } from 'types'
import { getCourses } from '../api/getCourses'
import { CoursesRoutes } from '../routes'
import { Course } from '../types'

interface ICourseList {
  courseData: Course[];
}

export const CourseList = () => {

  const [sortBy, setSortBy] = React.useState(coursesSortOptions[0])
  const [filterBy, setFilterBy] = React.useState(null);
  const [search, setSearch] = React.useState('');

  const [showAllCourses, setShowAllCourses] = React.useState<boolean | undefined>(false) // show only active courses (true - active only, undefined - all courses)
  const { data: courseData, status: courseStatus, refetch: courseRefetch } = useQuery(['activeCourses'], () => getCourses(true))
  const { data: inactiveCourseData, status: inactiveCourseStatus, refetch: inactiveCourseRefetch } = useQuery(['inactiveCourses', showAllCourses], () => getCourses(false), {
    refetchOnWindowFocus: false,
    enabled: false // disable this query from automatically running
  })

  const [test, setTest] = useState(courseData)

  useEffect(() => {
    setTest(courseData)
  }, [courseData])

  useEffect(() => {
    if (showAllCourses) {
      inactiveCourseRefetch()
      setTest(courseData.concat(inactiveCourseData))
    }
  }, [showAllCourses])
  
  
  const searchData = React.useMemo(() => searchFunc(search, test, ['name']), [search, test]);
  const sorted = React.useMemo(() => sortFunc(searchData, sortBy), [searchData, sortBy]);

  const nonActiveLast = React.useCallback((data: any[]) => {
    const active = data?.filter(i => i?.active);
    const nonActive = data?.filter(i => !i?.active);
    return active?.concat(nonActive);
  }, []);

  const activeSorted = nonActiveLast(sorted);

  if (courseStatus == 'loading' && test === undefined) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <div className='flex flex-col gap-8'>
      <Toolbar sort={true} filter={false} search={true} sortOptions={coursesSortOptions} sortVal={sortBy} sortSet={setSortBy} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj przedmiotu' />
      <div className='w-full h-full flex flex-col items-center'>
        { activeSorted.length == 0 ? 
          <div className='w-full h-full flex justify-center items-center p-10 font-semibold text-xl'> Brak Aktywnych Przedmiotów </div> :
          activeSorted.map(function(course : Course) {
            return (
              <Link key={course.id} to={'/courses/' + course.id} className='w-full'>
                <Box color={course.active ? 'bg-blue-800' : 'bg-red-500'}>
                  <span className='font-semibold text-xl'> { course.name }</span>
                  <span className='font-normal text-base text-slate-600'> { course.description }</span>
                </Box>
              </Link>
            )
        }) }
      </div>
      <Button type={ButtonType.LOAD_HIDDEN} text={showAllCourses ? 'Schowaj nieaktywne' : 'Pokaż nieaktywne'} onClick={() => {setShowAllCourses(showAllCourses ? false : true)}} />
    </div>
    
  )
}