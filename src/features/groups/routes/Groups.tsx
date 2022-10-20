import { ContentLayout, ContentPanel } from 'components';
import { Button } from 'components/Button';
import { Spinner } from 'components/Spinner';
import { Toolbar } from 'components/Toolbar';
import { AddNewModal } from 'features/courses/components/AddNewModal';
import { ServerList } from 'features/servers/components/ServerList';
import React from 'react'
import { useQuery } from 'react-query';
import { ButtonType, PanelType, Status } from 'types';
import { getGroups } from '../api/getGroups';
import { GroupList } from '../components/GroupList';

export const Groups = () => {
    const [showAdd, setShowAdd] = React.useState(false);
    const { data: groupData, status: groupStatus, refetch: groupRefetch } = useQuery(['groups'], getGroups)

    if (groupStatus == 'loading') {
    return (
        <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
        </div>
        )
    }
    return (
        <ContentLayout>
          <AddNewModal show={showAdd} off={() => setShowAdd(false)} refetch={groupRefetch} />
          <ContentPanel type={PanelType.HEADER}>
            <span className='text-black text-3xl font-bold mb-4'>Grupy</span>
            <div className='flex gap-4'>
              <Button type={ButtonType.ACTION} text='Dodaj' onClick={() => setShowAdd(true)}/>
            </div>
          </ContentPanel>
    
          <ContentPanel type={PanelType.CONTENT}>
            <Toolbar searchPlaceholder='Szukaj grupy'/>
            <h2 className='text-lg font-semibold'>Aktywne grupy</h2>
            <GroupList groupData={groupData} type={Status.ACTIVE}></GroupList>
    
            <hr className='w-full mt-2 border-1 border-blue-800'></hr>
    
            <h2 className='text-lg font-semibold'>Nieaktywne grupy</h2>
            <GroupList groupData={groupData} type={Status.INACTIVE}></GroupList>
          </ContentPanel>
        </ContentLayout>
      )
}
