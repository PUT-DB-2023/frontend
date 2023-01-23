import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Loading } from 'components/Loading'
import AuthContext from 'context/AuthContext'
import { descriptionClass } from 'features/groups/routes/Group'
import { queryClient } from 'lib/react-query'
import * as React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ButtonType, PanelType } from 'types'
import { getSemesters } from '../api/getSemesters'
import { AddNewModal } from '../components/AddNewModal'
import { SemesterList } from '../components/SemesterList'

export const Semesters = () => {
  const [addModal, setAddModal] = React.useState(false)
  const { id } = useParams()
  const {authUser, checkPermission} = React.useContext(AuthContext)

  const { data: activeSemesterData, status: activeSemesterStatus, refetch: activeSemesterRefetch } = useQuery(['activeSemester', id], () => getSemesters(true));

  React.useEffect(() => {document.title = `Semestry`},[])

  if (activeSemesterStatus == 'loading') {
    return <Loading />
  }

  const allRefetch = () => {
    activeSemesterRefetch();
    queryClient.refetchQueries(['inactiveSemesters']) // refetch the semester list
  }

  return (
    <ContentLayout>
      {checkPermission('database.add_semester') && <AddNewModal show={addModal} off={() => setAddModal(false)} refetch={() => allRefetch()} />}
      <ContentPanel type={PanelType.HEADER}>
        <div className='flex-col'>
          <h1 className='text-black text-3xl font-bold mb-4'> Semestry </h1>
        </div>
        <div className='flex gap-6'>
          {checkPermission('database.add_semester') && <Button type={ButtonType.ACTION} text='Dodaj semestr' onClick={() => setAddModal(true)} />}
        </div>
      </ContentPanel>
      <ContentPanel type={PanelType.HEADER}>
        <div className='flex justify-between'>
          <div className='flex flex-col gap-6'>
            <h2 className='text-lg font-semibold'>Bieżący semestr</h2>
            <div className='flex flex-col gap-6'>
              <h1 className='text-3xl font-bold'>
                {activeSemesterData ? activeSemesterData[0].start_year.toString().concat('/').concat((activeSemesterData[0].start_year + 1).toString()).concat(activeSemesterData[0].winter ? " - Zima" : " - Lato") : 'Brak semestrów'}
              </h1>
              <div className={activeSemesterData[0].active ? 'text-blue-600' : 'text-red-500'}>
                  <span className={descriptionClass}>{activeSemesterData ? activeSemesterData[0].active ? 'Aktywny' : 'Nieaktywny' : ''}</span>
              </div>
            </div>
          </div>
        </div>
      </ContentPanel>
      <ContentPanel type={PanelType.CONTENT}>
        <h2 className='text-lg font-semibold'>Pozostałe semestry</h2>
        <SemesterList allRefetch={allRefetch} />
      </ContentPanel>
    </ContentLayout>
  )
}
