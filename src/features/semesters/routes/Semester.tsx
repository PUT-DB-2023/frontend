import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ButtonType, PanelType } from 'types'
import { getSemester } from '../api/getSemester'
// import { SemesterInfo } from '../components/SemesterInfo'
import { RemoveModal } from '../components/RemoveModal'
import { EditModal } from '../components/EditModal'
import * as React from 'react'
import { Menu } from '@headlessui/react'
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { activeSemester } from '../api/activeSemester'
import { OptionsMenu } from 'components/OptionsMenu'

export const Semester = () => {
  const [showRemove, setShowRemove] = React.useState(false)
  const [showEdit, setShowEdit] = React.useState(false)
  const { id } = useParams()

  const semesterQuery = useQuery(['semester', id], () => getSemester( id ))
  // const {data: semesterQuery } = useQuery(['semester', id], () => getSemester( id ))
  const refetch = semesterQuery.refetch;

  const activation = React.useCallback(()=>{
    id && activeSemester({id: id, active: !semesterQuery.data.active, refresh: refetch});
    semesterQuery.refetch()
  },[semesterQuery, id, refetch])

  if (semesterQuery.isLoading) {
    return (
      <Spinner />
    );
  }
  else if (semesterQuery.isError) {
    return (
      <div>
        Error!
      </div>
    );
  }

  return (
    <ContentLayout>
      <RemoveModal off={()=>setShowRemove(false)} show={showRemove} id={id} name={semesterQuery.data.name} refetch={() => refetch()}/>
      <EditModal off={()=>setShowEdit(false)} show={showEdit} refetch={semesterQuery.refetch} data={{id: id as string, ...semesterQuery.data}}/>
        <ContentPanel type={PanelType.HEADER}>
          <div className='flex-col'>
            <h1 className='text-black text-3xl font-bold mb-4'> Serwer - { semesterQuery.data.name }</h1>
          </div>
          <div className='flex items-start'>
            <div className='flex gap-6'>
              {semesterQuery.data.active ? 
                <Button type={ButtonType.WARNING} text='Deaktywuj' onClick={activation}/> :
                <Button type={ButtonType.ACTION} text='Aktywuj' onClick={activation}/>
              } 
              <OptionsMenu edit={() => setShowEdit(true)} remove={() => setShowRemove(true)} />
            </div>
          </div>
        </ContentPanel>
        <ContentPanel type={PanelType.CONTENT}>
          <h2 className='text-lg font-semibold'> Szczegóły </h2>
          {/* <SemesterInfo semesterData={semesterQuery.data} /> */}
        </ContentPanel>
        <ContentPanel type={PanelType.CONTENT}>
          <h2 className='text-lg font-semibold'> Polecenia bazodanowe </h2>
          <div className='flex flex-col'>
            <span className='font-normal text-base'> Tworzenie użytkownika </span>
            <span className='font-normal text-base'> Modyfikowanie użytkownika </span>
            <span className='font-normal text-base'> Usuwanie użytkownika </span>
          </div>
        </ContentPanel>
    </ContentLayout>
  )
}
