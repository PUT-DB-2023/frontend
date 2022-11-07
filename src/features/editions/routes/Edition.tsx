import { ContentLayout, ContentPanel } from 'components';
import { Button } from 'components/Button';
import { Spinner } from 'components/Spinner';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ButtonType, PanelType } from 'types';
import { getEdition } from '../api/getEdition';
import { getEditionGroups } from '../api/getEditionGroups';
import { GroupList } from '../components/GroupList';
import { RemoveModal } from '../components/RemoveModal';
import { EditModal } from '../components/EditModal';
import * as React from 'react'
import { Toolbar } from 'components/Toolbar';
import { Menu } from '@headlessui/react';
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import { activeEdition } from '../api/activeEdition';
import { groupsSortOptions } from 'types';
import { sortFunc } from 'api/sortFilter';
import { searchFunc } from 'api/searchApi';

export const Edition = () => {
  const [showRemove, setShowRemove] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false)
  const { id } = useParams();
  const [sortBy, setSortBy] = React.useState(groupsSortOptions[0])
  const [filterBy, setFilterBy] = React.useState(null);
  const [search, setSearch] = React.useState('');

  const { data: editionData, status: editionStatus, refetch: editionRefetch } = useQuery(['edition', id], () => getEdition(id))
  const { data: groupData, status: groupStatus, refetch: groupRefetch } = useQuery(['editionGroups', id], () => getEditionGroups(id))

  const searchData = React.useMemo(() => searchFunc(search, groupData, ['day','hour','teacherEdition/teacher/first_name', 'teacherEdition/teacher/last_name']), [search, groupData]);
  const sortedGroups = React.useMemo(() => sortFunc(searchData, sortBy),[searchData, sortBy]);

  const handleActive = React.useCallback(() => {
    id && activeEdition({ id: id, active: !editionData.active, refresh: editionRefetch });
  }, [id, editionData, editionRefetch])

  if (editionStatus === 'loading' || groupStatus === 'loading') {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <ContentLayout>
      <RemoveModal off={() => setShowRemove(false)} show={showRemove} id={id} name={"Usuń edycję"} courseId={editionData.course.id} />
      <EditModal off={() => setShowEdit(false)} show={showEdit} refetch={editionRefetch} data={editionData} />
      <ContentPanel type={PanelType.HEADER}>
        <div className='flex-col'>
          <h1 className='text-black text-3xl font-bold mb-4'>
            {editionData.course.name + " " + editionData.semester.year + " - "}
            {editionData.semester.winter ? "Zima" : "Lato"}
          </h1>
          <h2 className='text-blue-900 font-semibold mb-8'>{groupData.length} grupy</h2>
        </div>
        <div className='flex items-start'>
          <div className='flex gap-6'>
            {editionData.active ?
              <Button type={ButtonType.WARNING} text='Zakończ' onClick={() => handleActive()} /> :
              <Button type={ButtonType.ACTION} text='Wznów' onClick={() => handleActive()} />
            }
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
                        onClick={() => setShowEdit(true)}
                        className={`${active ? 'bg-blue-100' : 'text-black'
                          } group flex w-full items-center rounded-lg px-2 py-2 text-sm`}
                      >
                        Edytuj
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }: { active: any }) => (
                      <button
                        onClick={() => console.log('SHOW INACTIVE')}
                        className={`${active ? 'bg-blue-100' : 'text-black'
                          } group flex w-full items-center rounded-lg px-2 py-2 text-sm`}
                      >
                        Pokaż nieaktywne grupy
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }: { active: any }) => (
                      <button
                        onClick={() => setShowRemove(true)}
                        className={`${active ? 'bg-red-500 text-white' : 'text-red-500'
                          } group flex w-full items-center rounded-lg px-2 py-2 text-sm`}
                      >
                        Usuń
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
        <Toolbar sort={true} filter={true} search={true} sortOptions={groupsSortOptions} sortVal={sortBy} sortSet={setSortBy} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj grupy' />
        <GroupList groupData={sortedGroups}></GroupList>
      </ContentPanel>
    </ContentLayout>
  )
}
