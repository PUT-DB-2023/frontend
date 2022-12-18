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
import { queryClient } from 'lib/react-query';

export const Groups = () => {
    const [showAdd, setShowAdd] = React.useState(false);
    
    return (
        <ContentLayout>
          <AddNewModal show={showAdd} off={() => setShowAdd(false)} refetch={() => queryClient.refetchQueries(['groups'])}/>
          <ContentPanel type={PanelType.HEADER}>
            <span className='text-black text-3xl font-bold mb-4'>Grupy</span>
            {/* <Button type={ButtonType.ACTION} text='Dodaj grupę' onClick={()=>setShowAdd(true)}/> */}
          </ContentPanel>
    
          <ContentPanel type={PanelType.CONTENT}>
            <GroupList />
          </ContentPanel>
        </ContentLayout>
      )
}