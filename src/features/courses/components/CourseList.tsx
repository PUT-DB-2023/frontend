import { XCircleIcon } from '@heroicons/react/outline'
import { searchFunc } from 'api/searchApi'
import { sortFunc } from 'api/sortFilter'
import { Box } from 'components'
import { Button } from 'components/Button'
import { Loading } from 'components/Loading'
import { Toolbar } from 'components/Toolbar'
import React from 'react'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { ButtonType, coursesSortOptions } from 'types'
import { getCourses } from '../api/getCourses'
import { Course } from '../types'

interface ICourseList {
  courseData: Course[];
}

export const CourseList = () => {

  const [sortBy, setSortBy] = React.useState(coursesSortOptions[0])
  const [filterBy, setFilterBy] = React.useState(null);
  const [search, setSearch] = React.useState('');

  const [showActiveOnly, setShowActiveOnly] = React.useState<boolean | undefined>(true) // show only active courses (true - active only, undefined - all courses)
  const { data: courseData, status: courseStatus, refetch: courseRefetch } = useQuery(['courses', showActiveOnly], () => getCourses(showActiveOnly))
  
  const searchData = React.useMemo(() => searchFunc(search, courseData, ['name']), [search, courseData]);
  const sorted = React.useMemo(() => sortFunc(searchData, sortBy), [searchData, sortBy]);

  const nonActiveLast = React.useCallback((data: any[]) => {
    const active = data?.filter(i => i?.active);
    const nonActive = data?.filter(i => !i?.active);
    return active?.concat(nonActive);
  }, []);

  const activeSorted = nonActiveLast(sorted);

  if (courseStatus == 'loading') {
    return <Loading />
  }

  return (
    <div className='flex flex-col gap-8 justify-center items-center'>
      <Toolbar sort={true} filter={false} search={true} sortOptions={coursesSortOptions} sortVal={sortBy} sortSet={setSortBy} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj przedmiotu' />
      <div className='w-full h-full flex flex-col items-center'>
        { activeSorted.length == 0 ? 
          <div className='flex flex-col justify-center items-center gap-6 p-10'>
            <XCircleIcon className='h-14 w-auto text-zinc-400' />
            <div className='w-full h-full flex justify-center items-center font-semibold text-xl'> Brak Aktywnych Przedmiotów </div>
          </div>
          :
          activeSorted.map((course : Course) => {
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
      <Button type={ButtonType.LOAD_HIDDEN} text={showActiveOnly ? 'Pokaż nieaktywne' : 'Schowaj nieaktywne'} onClick={() => {setShowActiveOnly(showActiveOnly ? undefined : true)}} />
    </div>
    
  )
}