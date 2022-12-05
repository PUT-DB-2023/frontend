import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import React, { useEffect, useRef } from 'react'
import { useQuery } from 'react-query'
import { ButtonType, PanelType, Status } from 'types'
import { getSemesters } from '../api/getSemesters'
import { AddNewModal } from '../components/AddNewModal'
import { Toolbar } from 'components/Toolbar'
import { Listbox, Menu } from '@headlessui/react'
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { semestersSortOptions } from 'types'
import { sortFunc } from 'api/sortFilter'
import { searchFunc } from 'api/searchApi'
import { useParams } from 'react-router-dom'
import { RemoveModal } from '../components/RemoveModal'
import { EditModal } from '../components/EditModal'
import { OptionsMenu } from 'components/OptionsMenu'
import { GroupList } from 'features/editions/components/GroupList'
import { Semester } from '../types'
import { activateSemester } from '../api/activateSemester'
import { SemesterList } from '../components/SemesterList'
import { queryClient } from 'lib/react-query'

export const Semesters = () => {
  const [removeModal, setRemoveModal] = React.useState(false)
  const [editModal, setEditModal] = React.useState(false)
  const [addModal, setAddModal] = React.useState(false)
  const { id } = useParams()

  const activeSemesterQuery = useQuery(['activeEditions', id], () => getSemesters(true));
  const { data : activeSemesterData, status : activeSemesterStatus, refetch : activeSemesterRefetch } = activeSemesterQuery;

  let listRefetch = useRef()

  if (activeSemesterStatus == 'loading') {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  const allRefetch = () => {
    activeSemesterRefetch();
    queryClient.refetchQueries(['semesters']) // refetch the semester list
  }
  

  console.log(activeSemesterData)

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
        <ContentPanel type={PanelType.CONTENT}>
          <div className='flex justify-between'>
            <div className='flex flex-col gap-6'>
              <h2 className='text-lg font-semibold'>Aktualny semestr</h2>
              <div className='flex flex-col gap-4'>
              <h1 className='text-3xl font-bold'>
                {activeSemesterData ? activeSemesterData[0].start_year.toString().concat(activeSemesterData[0].winter ? " - Zima" : " - Lato") : 'Brak semestrów'}
              </h1>
              <h2 className={`text-lg font-semibold ${activeSemesterData[0].active ? 'text-blue-600' : 'text-red-500'}`}>
                {activeSemesterData ? activeSemesterData[0].active ? 'Aktywny' : 'Nieaktywny' : ''}
              </h2>
              </div>
            </div>
            <div className='flex gap-6'>
              <OptionsMenu edit={() => setEditModal(true)} remove={() => setRemoveModal(true)}></OptionsMenu>
            </div>            
          </div>
        </ContentPanel>
        <ContentPanel type={PanelType.CONTENT}>
          <h2 className='text-lg font-semibold'>Pozostałe semestry</h2>
          <SemesterList/>
        </ContentPanel>
    </ContentLayout>
  )
}
