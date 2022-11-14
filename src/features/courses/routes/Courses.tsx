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

  return (
    <ContentLayout>
      {/* <AddNewModal refetch={() => courseRefetch()} show={newModal} off={() => setNewModal(false)} /> */}
      <ContentPanel type={PanelType.HEADER}>
        <span className='text-black text-3xl font-bold mb-4'>Przedmioty</span>
        <Button type={ButtonType.ACTION} text='Dodaj przedmiot' onClick={() => setNewModal(true)} />
      </ContentPanel>
      <ContentPanel type={PanelType.CONTENT}>
        <Toolbar sort={true} filter={true} search={true} sortOptions={coursesSortOptions} sortVal={sortBy} sortSet={setSortBy} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj przedmiotu' />
        <CourseList sortVal={sortBy} sortSet={setSortBy} searchVal={search} searchSet={setSearch}></CourseList>
      </ContentPanel>
    </ContentLayout>
  )
}