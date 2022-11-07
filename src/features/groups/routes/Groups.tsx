import { Menu } from '@headlessui/react';
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import { ContentLayout, ContentPanel } from 'components';
import { Button } from 'components/Button';
import { Spinner } from 'components/Spinner';
import { Toolbar } from 'components/Toolbar';
import { AddNewModal } from 'features/groups/components/AddNewModal';
import React from 'react'
import { useQuery } from 'react-query';
import { ButtonType, PanelType, Status } from 'types';
import { getGroups } from '../api/getGroups';
import { GroupList } from '../components/GroupList';
import { getTeacherEdition } from '../api/getTeacherEdition';
import { groupsSortOptions } from 'types';
import { sortFunc } from 'api/sortFilter';

export const Groups = () => {
    const [showAdd, setShowAdd] = React.useState(false);
    const [sortBy, setSortBy] = React.useState(groupsSortOptions[0])
    const [filterBy, setFilterBy] = React.useState(null);
    const { data: groupData, status: groupStatus, refetch: groupRefetch } = useQuery(['groups'], getGroups)
    const { data: techerEditionsData, status: teacherEditionsStatus, refetch: teacherEditionsRefetch } = useQuery(['teacher_editions'], getTeacherEdition)
    const sortedGroups = React.useMemo(() => sortFunc(groupData, sortBy),[groupData, sortBy]);


    if (groupStatus == 'loading') {
    return (
        <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
        </div>
        )
    }
    return (
        <ContentLayout>
          <AddNewModal show={showAdd} off={() => setShowAdd(false)} refetch={groupRefetch} teacherEditions={techerEditionsData}/>
          <ContentPanel type={PanelType.HEADER}>
            <span className='text-black text-3xl font-bold mb-4'>Grupy</span>
            <div className='flex items-start'>
            <div className='flex gap-6'>
              <Button type={ButtonType.ACTION} text='Dodaj grupę' onClick={()=>setShowAdd(true)}/>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex text-black items-center space-x-4">
                    <DotsHorizontalIcon className='w-7 h-auto cursor-pointer hover:text-zinc-500'/>
                  </Menu.Button>
                </div>
                  <Menu.Items className="absolute right-0 mt-4 w-[212px] origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active } : { active : any }) => (
                            <button
                              onClick={()=>console.log('SHOW INACTIVE')}
                              className={`${
                                active ? 'bg-blue-100' : 'text-black'
                              } group flex w-full items-center rounded-lg px-2 py-2 text-sm`}
                            >
                              Pokaz nieaktywne grupy
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
            <Toolbar sort={true} filter={true} search={true} sortOptions={groupsSortOptions} sortVal={sortBy} sortSet={setSortBy} searchPlaceholder='Szukaj grupy'/>
            <h2 className='text-lg font-semibold'>Aktywne grupy</h2>
            <GroupList groupData={sortedGroups} type={Status.ACTIVE}></GroupList>
    
            <hr className='w-full mt-2 border-1 border-blue-800'></hr>
    
            <h2 className='text-lg font-semibold'>Nieaktywne grupy</h2>
            <GroupList groupData={sortedGroups} type={Status.INACTIVE}></GroupList>
          </ContentPanel>
        </ContentLayout>
      )
}
