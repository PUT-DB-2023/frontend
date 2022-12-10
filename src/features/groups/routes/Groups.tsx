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
// import { getTeacherEdition } from '../api/getEditionTeachers';
import { groupsSortOptions } from 'types';
import { sortFunc } from 'api/sortFilter';
import { searchFunc } from 'api/searchApi'

export const Groups = () => {
    const [showAdd, setShowAdd] = React.useState(false);
    const [sortBy, setSortBy] = React.useState(groupsSortOptions[0])
    const [filterBy, setFilterBy] = React.useState(null);
    const [search, setSearch] = React.useState('');

    const { data: groupData, status: groupStatus, refetch: groupRefetch } = useQuery(['groups'], getGroups)
    // const { data: techerEditionsData, status: teacherEditionsStatus, refetch: teacherEditionsRefetch } = useQuery(['teacher_editions'], getTeacherEdition)

    const searchData = React.useMemo(() => searchFunc(search, groupData, ['name','day','hour','teacherEdition/edition/course/name','teacherEdition/edition/semester/year']), [search, groupData]);
    const sortedGroups = React.useMemo(() => sortFunc(searchData, sortBy),[searchData, sortBy]);


    if (groupStatus == 'loading') {
    return (
        <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
        </div>
        )
    }
    return (
        <ContentLayout>
          <AddNewModal show={showAdd} off={() => setShowAdd(false)} refetch={groupRefetch}/>
          <ContentPanel type={PanelType.HEADER}>
            <span className='text-black text-3xl font-bold mb-4'>Grupy</span>
            {/* <Button type={ButtonType.ACTION} text='Dodaj grupę' onClick={()=>setShowAdd(true)}/> */}
          </ContentPanel>
    
          <ContentPanel type={PanelType.CONTENT}>
            <Toolbar sort={true} filter={false} search={true} sortOptions={groupsSortOptions} sortVal={sortBy} sortSet={setSortBy} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj grupy'/>
            {/* <h2 className='text-lg font-semibold'>Aktywne grupy</h2> */}
            <GroupList groupData={sortedGroups}></GroupList>
          </ContentPanel>
        </ContentLayout>
      )
}