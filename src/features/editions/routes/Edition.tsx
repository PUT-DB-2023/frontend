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
import * as React from 'react'
import { Toolbar } from 'components/Toolbar';

export const Edition = () => {
  const [showRemove, setShowRemove] = React.useState(false)
  const { id } = useParams()

  const { data : editionData, status : editionStatus, refetch : editionRefetch } = useQuery(['edition', id], () => getEdition(id))
  const { data : groupData, status : groupStatus, refetch : groupRefetch } = useQuery(['editionGroups', id], () => getEditionGroups(id))

  if (editionStatus === 'loading' || groupStatus === 'loading') {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }
  
  return (
    <ContentLayout>
      <RemoveModal off={()=>setShowRemove(false)} show={showRemove} id={id} name={DataTransfer.name} courseId={editionData.course.id}/>
        <ContentPanel type={PanelType.HEADER}> 
          <div className='flex-col'>
            <h1 className='text-black text-3xl font-bold mb-4'>
              { editionData.course.name + " " + editionData.semester.year + " - "}
              { editionData.semester.winter ? "Zima" : "Lato"}
            </h1>
            <h2 className='text-blue-900 font-semibold mb-8'>{ groupData.length } grupy</h2>
          </div>
          <div className='flex gap-4'>
            <Button type={ButtonType.OUTLINE} text='Edytuj'/>
            <Button type={ButtonType.WARNING} text='Zakończ' onClick={()=>setShowRemove(true)}/>
          </div>
        </ContentPanel>
        
        <ContentPanel type={PanelType.CONTENT}>
          <Toolbar searchPlaceholder='Szukaj grupy'/>
          <GroupList groupData={groupData}></GroupList>
        </ContentPanel>
    </ContentLayout>
  )
}
