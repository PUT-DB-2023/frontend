import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import { Table } from 'components/Table'
import { Toolbar } from 'components/Toolbar'
import { columns } from 'features/users/routes/Users'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ButtonType, PanelType } from 'types'
import { getGroup } from '../api/getGroup'
import { ServerListModal } from '../components/ServerListModal'
import { RemoveModal } from '../components/RemoveModal'
import { EditModal } from '../components/EditModal'
import * as React from 'react'
import { searchFunc } from 'api/searchApi'
import { OptionsMenu } from 'components/OptionsMenu'
import { AddStudCSVModal } from '../components/AddStudCSVModal'
import { AddStudents } from '../components/AddStudents'
import { AddStudentInfoModal, StudentInfo } from '../components/AddStudentInfoModal'

export const Group = () => {
  const [removeModal, setRemoveModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [addStudentModal, setAddStudentModal] = React.useState(false);
  const { id } = useParams()
  const [newModal, setNewModal] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [addFileModal, setAddFileModal] = React.useState(false);
  const [studentInfoModal, setStudentInfoModal] = React.useState(false);
  const [addFileResult, setAddFileResult] = React.useState<StudentInfo[]>()

  const { data: groupData, status: groupStatus, refetch: groupRefetch } = useQuery(['group', id], () => getGroup(id))
  let servers = null

  const searchData = React.useMemo(() => searchFunc(search, groupData?.students, ['student_id','first_name','last_name','email']), [search, groupData?.students]);

  if (groupStatus === 'loading') {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }
  else {
    servers = groupData?.teacherEdition?.edition?.servers
  }  

  return (  
    <ContentLayout>
      <RemoveModal off={() => setRemoveModal(false)} id={id} show={removeModal} name={`${groupData.name} - ${groupData.day} ${groupData.hour}`} />
      <EditModal off={() => setEditModal(false)} refetch={groupRefetch} show={editModal} data={groupData} />
      {id && <AddStudCSVModal show={addFileModal} off={() => setAddFileModal(false)} refetch={groupRefetch} id={id} showInfo={() => setStudentInfoModal(true)} setResult={setAddFileResult}/>}
      <ServerListModal groupId={groupData.id} servers={servers} refetch={() => groupRefetch()} show={newModal} off={() => setNewModal(false)} allAccountsMoved={groupData.all_accounts_moved}/>
      <AddStudents off={() => setAddStudentModal(false)} show={addStudentModal} refetch={groupRefetch} group={groupData}/>
      {id && <AddStudentInfoModal show={studentInfoModal} off={() => setStudentInfoModal(false)} refetch={groupRefetch} id={id} data={addFileResult}/>}
      <ContentPanel type={PanelType.HEADER}>
        <div className='flex-col flex gap-4'>
          <h1 className='font-bold text-3xl'> {groupData?.name} - {groupData?.teacherEdition?.edition?.course?.name} {groupData?.teacherEdition?.edition?.semester?.year} {groupData?.teacherEdition?.edition?.semester?.winter ? "Zima" : "Lato"}</h1>
          <h2 className='font-semibold text-xl text-blue-800'>
            {groupData?.teacherEdition?.teacher?.first_name} {groupData?.teacherEdition?.teacher?.last_name} - {groupData.day} {groupData.hour}
          </h2>
        </div>
        <div className='flex gap-6'>
          <Button onClick={() => setNewModal(true)} type={ButtonType.ACTION} text='Utwórz konta bazodanowe' />
          <OptionsMenu edit={() => setEditModal(true)} remove={() => setRemoveModal(true)} />
        </div>
      </ContentPanel>

      <ContentPanel type={PanelType.CONTENT}>
        <div className='flex justify-between'>
          <h2 className='text-lg font-semibold'> Studenci </h2>
          <div className='flex justify-between gap-6'>
            <Button text={'Dodaj z pliku'} type={ButtonType.ACTION} onClick={() => setAddFileModal(true)}/>
            <Button text={'Dodaj studenta'} type={ButtonType.ACTION} onClick={() => setAddStudentModal(true)}/>
            <Toolbar sort={false} filter={false} search={true} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj użytkowników' />
          </div>
          
        </div>
        <Table data={searchData} columns={columns('students')}></Table>
      </ContentPanel>
    </ContentLayout>
  )
}
