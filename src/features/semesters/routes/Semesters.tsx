import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { ButtonType, PanelType } from 'types'
import { getSemesters } from '../api/getSemesters'
import { AddNewModal } from '../components/AddNewModal'
import { useParams } from 'react-router-dom'
import { RemoveModal } from '../components/RemoveModal'
import { EditModal } from '../components/EditModal'
import { Semester } from '../types'
import { activateSemester } from '../api/activateSemester'
import { SemesterList } from '../components/SemesterList'
import { queryClient } from 'lib/react-query'

export const Semesters = () => {
  const [addModal, setAddModal] = React.useState(false)
  const { id } = useParams()

  const { data : activeSemesterData, status : activeSemesterStatus, refetch : activeSemesterRefetch } = useQuery(['activeSemester', id], () => getSemesters(true));

  React.useEffect(() => {document.title = `Semestry`},[])

  if (activeSemesterStatus == 'loading') {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  const allRefetch = () => {
    activeSemesterRefetch();
    queryClient.refetchQueries(['inactiveSemesters']) // refetch the semester list
  }

  return (
    <ContentLayout>
        <AddNewModal show={addModal} off={() => setAddModal(false)} refetch={() => allRefetch()}/>  
        <ContentPanel type={PanelType.HEADER}>
          <div className='flex-col'>
            <h1 className='text-black text-3xl font-bold mb-4'> Semestry </h1>
          </div>
          <div className='flex gap-6'>
            <Button type={ButtonType.ACTION} text='Dodaj semestr' onClick={()=>setAddModal(true)}/>
          </div>
        </ContentPanel>
        <ContentPanel type={PanelType.HEADER}>
          <div className='flex justify-between'>
            <div className='flex flex-col gap-6'>
              <h2 className='text-lg font-semibold'>Bieżący semestr</h2>
              <div className='flex flex-col gap-4'>
              <h1 className='text-3xl font-bold'>
                {activeSemesterData ? activeSemesterData[0].start_year.toString().concat('/').concat((activeSemesterData[0].start_year+1).toString()).concat(activeSemesterData[0].winter ? " - Zima" : " - Lato") : 'Brak semestrów'}
              </h1>
              <h2 className={`text-lg font-semibold ${activeSemesterData[0].active ? 'text-blue-600' : 'text-red-500'}`}>
                {activeSemesterData ? activeSemesterData[0].active ? 'Aktywny' : 'Nieaktywny' : ''}
              </h2>
              </div>
            </div>
          </div>
        </ContentPanel>
        <ContentPanel type={PanelType.CONTENT}>
          <h2 className='text-lg font-semibold'>Pozostałe semestry</h2>
          <SemesterList allRefetch={allRefetch}/>
        </ContentPanel>
    </ContentLayout>
  )
}
