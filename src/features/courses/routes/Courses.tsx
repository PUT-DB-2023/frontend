import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { ButtonType, PanelType, coursesSortOptions } from 'types'
import { CourseList } from '../components/CourseList'
import { AddNewModal } from '../components/AddNewModal'
import * as React from 'react';
import { useQuery } from 'react-query'
import { getCourses } from '../api/getCourses'
import { Spinner } from 'components/Spinner'
import { Toolbar } from 'components/Toolbar'
import { Menu } from '@headlessui/react'
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import { sortFunc } from '../../../api/sortFilter'
import { searchFunc } from 'api/searchApi'

export const Courses = () => {
  const [newModal, setNewModal] = React.useState(false);
  const [sortBy, setSortBy] = React.useState(coursesSortOptions[0])
  const [filterBy, setFilterBy] = React.useState(null);
  const [search, setSearch] = React.useState('');

  const [showActiveOnly, setShowActiveOnly] = React.useState<boolean | undefined>(true) // show only active courses (true - active only, undefined - all courses)
  const { data: courseData, status: courseStatus, refetch: courseRefetch } = useQuery(['courses', showActiveOnly], () => getCourses(showActiveOnly))
  
  const searchData = React.useMemo(() => searchFunc(search, courseData, ['name']), [search, courseData]);
  const sorted = React.useMemo(() => sortFunc(searchData, sortBy), [searchData, sortBy]);

  if (courseStatus == 'loading') {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  console.log(courseData)

  return (
    <ContentLayout>
      <AddNewModal refetch={() => courseRefetch()} show={newModal} off={() => setNewModal(false)} />
      <ContentPanel type={PanelType.HEADER}>
        <span className='text-black text-3xl font-bold mb-4'>Przedmioty</span>
        <Button type={ButtonType.ACTION} text='Dodaj przedmiot' onClick={() => setNewModal(true)} />
      </ContentPanel>
      <ContentPanel type={PanelType.CONTENT}>
        <Toolbar sort={true} filter={true} search={true} sortOptions={coursesSortOptions} sortVal={sortBy} sortSet={setSortBy} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj przedmiotu' />
        <CourseList courseData={sorted}></CourseList>
        {courseData.length !== 0 ? <Button type={ButtonType.ACTION} text={showActiveOnly ? 'Pokaż nieaktywne' : 'Schowaj nieaktywne'} onClick={() => {setShowActiveOnly(showActiveOnly ? undefined : true)}} /> : null}
      </ContentPanel>
    </ContentLayout>
  )
}