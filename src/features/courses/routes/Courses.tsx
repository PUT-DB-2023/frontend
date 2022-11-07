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

  const { data: courseData, status: courseStatus, refetch: courseRefetch } = useQuery(['courses'], getCourses)

  const searchData = React.useMemo(() => searchFunc(search, courseData, ['name']), [search, courseData]);
  const sorted = React.useMemo(() => sortFunc(searchData, sortBy), [searchData, sortBy]);

  if (courseStatus == 'loading') {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <ContentLayout>
      <AddNewModal refetch={() => courseRefetch()} show={newModal} off={() => setNewModal(false)} />
      <ContentPanel type={PanelType.HEADER}>
        <span className='text-black text-3xl font-bold mb-4'>Przedmioty</span>
        <div className='flex items-start'>
          <div className='flex gap-6'>
            <Button type={ButtonType.ACTION} text='Dodaj przedmiot' onClick={() => setNewModal(true)} />
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="flex text-black items-center space-x-4">
                  <DotsHorizontalIcon className='w-7 h-auto cursor-pointer hover:text-zinc-500' />
                </Menu.Button>
              </div>
              <Menu.Items className="absolute right-0 mt-4 w-[212px] origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }: { active: any }) => (
                      <button
                        onClick={() => console.log('SHOW INACTIVE')}
                        className={`${active ? 'bg-blue-100' : 'text-black'
                          } group flex w-full items-center rounded-lg px-2 py-2 text-sm`}
                      >
                        Pokaz nieaktywne przedmioty
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </ContentPanel>
      <ContentPanel type={PanelType.CONTENT}>
        <Toolbar sort={true} filter={true} search={true} sortOptions={coursesSortOptions} sortVal={sortBy} sortSet={setSortBy} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj przedmiotu' />
        <CourseList courseData={sorted}></CourseList>
      </ContentPanel>
    </ContentLayout>
  )
}