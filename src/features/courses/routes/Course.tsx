import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import { getEditions } from 'features/editions/api/getEditions'
import { EditionList } from 'features/editions/components/EditionList'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ButtonType, EditionStatus, PanelType } from 'types'
import { getCourse } from '../api/getCourse'
import { RemoveModal } from '../components/RemoveModal'
import { EditModal } from '../components/EditModal'
import * as React from 'react'

// TODO Add the edition fetching to the edition list component

export const Course = () => {
  const [removeModal, setRemoveModal] = React.useState(false)
  const [editModal, setEditModal] = React.useState(false)

  const { id } = useParams()

  const { data : courseData, status : courseStatus, refetch : courseRefetch } = useQuery(['course', id], () => getCourse(id))
  const { data : editionData, status : editionStatus, refetch : editionRefetch } = useQuery(['editions', id], () => getEditions(id))
  
  if (editionStatus == 'loading' || courseStatus == 'loading') {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }
  
  return (
    <ContentLayout>
        <RemoveModal show={removeModal} off={() => setRemoveModal(false)} id={id} name={courseData.name} />
        <EditModal refetch={() => courseRefetch()} show={editModal} off={() => setEditModal(false)} data={courseData} />
        <ContentPanel type={PanelType.HEADER}> 
          <div className='flex-col'>
            <h1 className='text-black text-3xl font-bold mb-4'>{ courseData.name }</h1>
            <h2 className='text-blue-900 font-semibold mb-8'> { editionData !== undefined ? editionData.length : '' } edycje </h2>
            <h3 className='text-slate-500 text-base text-justify'>{ courseData.description }</h3>
          </div>
          <div className='flex gap-4'>
            <Button type={ButtonType.OUTLINE} text='Edytuj' onClick={()=>setEditModal(true)}/>
            <Button type={ButtonType.WARNING} text='Usuń' onClick={()=>setRemoveModal(true)}/>
          </div>
        </ContentPanel>

        <ContentPanel type={PanelType.CONTENT}>
          <h2 className='text-lg font-semibold'>Aktywne edycje</h2>
          {/* <hr className='w-full mt-2 border-1 border-blue-800'></hr> */}
            <EditionList id={courseData.id} type={EditionStatus.ACTIVE} />
        </ContentPanel>

        <ContentPanel type={PanelType.CONTENT}> 
          <h2 className='text-lg font-semibold'>Zakończone edycje</h2>
          {/* <hr className='w-full mt-2 border-1 border-blue-800'></hr> */}
            <EditionList id={courseData.id} type={EditionStatus.CLOSED} />
        </ContentPanel>
    </ContentLayout>
  )
}
