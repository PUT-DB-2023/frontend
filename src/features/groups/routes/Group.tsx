import { searchFunc } from 'api/searchApi'
import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Loading } from 'components/Loading'
import { OptionsMenu } from 'components/OptionsMenu'
import { Table } from 'components/Table'
import { Toolbar } from 'components/Toolbar'
import AuthContext from 'context/AuthContext'
import { Server } from 'features/servers'
import { columns } from 'features/users/routes/Users'
import * as React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ButtonType, PanelType, UserType } from 'types'
import { getGroup } from '../api/getGroup'
import { AddStudCSVModal } from '../components/AddStudCSVModal'
import { AddStudentInfoModal, StudentInfo } from '../components/AddStudentInfoModal'
import { AddStudents } from '../components/AddStudents'
import { EditModal } from '../components/EditModal'
import { RemoveModal } from '../components/RemoveModal'
import { ServerListModal } from '../components/ServerListModal'

const descriptionClass = 'rounded-lg bg-zinc-100 px-4 py-2 font-semibold text-lg';

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
  const { authUser, checkPermission } = React.useContext(AuthContext)

  const { data: groupData, status: groupStatus, refetch: groupRefetch } = useQuery(['group', id], () => getGroup(id))
  let servers = null

  const searchData = React.useMemo(() => searchFunc(search, groupData?.students, ['student_id', 'user/first_name', 'user/last_name', 'user/email']), [search, groupData?.students]);

  React.useEffect(() => { document.title = `Grupa: ${groupData?.name ? groupData?.name : ''}` }, [groupData?.name])

  if (groupStatus === 'loading') {
    return <Loading />
  }
  else {
    servers = groupData?.teacherEdition?.edition?.servers
  }

  return (
    <ContentLayout>
      {checkPermission('database.delete_group') && <RemoveModal off={() => setRemoveModal(false)} id={id} show={removeModal} name={`${groupData.name} - ${groupData.day} ${groupData.hour}`} />}
      {checkPermission('database.change_group') && <EditModal off={() => setEditModal(false)} refetch={groupRefetch} show={editModal} data={groupData} />}
      {checkPermission('database.add_students_to_group') && id && <AddStudCSVModal show={addFileModal} off={() => setAddFileModal(false)} refetch={groupRefetch} id={id} showInfo={() => setStudentInfoModal(true)} setResult={setAddFileResult} />}
      {checkPermission('database.move_dbaccount') && <ServerListModal groupId={groupData.id} servers={servers} refetch={() => groupRefetch()} show={newModal} off={() => setNewModal(false)} allAccountsMoved={groupData.all_accounts_moved} />}
      {checkPermission('database.add_students_to_group') && <AddStudents off={() => setAddStudentModal(false)} show={addStudentModal} refetch={groupRefetch} group={groupData} />}
      {checkPermission('database.add_students_to_group') && id && <AddStudentInfoModal show={studentInfoModal} off={() => setStudentInfoModal(false)} refetch={groupRefetch} id={id} data={addFileResult} />}
      <ContentPanel type={PanelType.HEADER}>
        <div className='flex flex-col gap-4'>
          <h1 className='font-bold text-3xl'> {groupData?.name} </h1>
          <div className='flex gap-3 flex-wrap text-blue-800'>
            <span className={descriptionClass}>{groupData?.teacherEdition?.edition?.course?.name}</span>
            <span className={descriptionClass}>{groupData?.teacherEdition?.teacher?.user.first_name} {groupData?.teacherEdition?.teacher?.user.last_name}</span>
            <span className={descriptionClass}>{groupData.day} {groupData.hour}</span>
          </div>
          <h2 className={`w-fit text-zinc-700 ${descriptionClass}`}>
            {groupData?.teacherEdition?.edition?.servers.map((server: Server, index: number) => {
              return (
                server.name + (index == groupData?.teacherEdition?.edition?.servers.length - 1 ? ' ' : ' | ')
              )
            })}
          </h2>
        </div>
        <div className='flex gap-6'>
          {checkPermission('database.move_dbaccount') && <Button onClick={() => setNewModal(true)} type={ButtonType.ACTION} text='Utwórz konta bazodanowe' />}
          <OptionsMenu
            edit={checkPermission('database.change_group') ? (() => setEditModal(true)) : undefined}
            remove={checkPermission('database.delete_group') ? (() => setRemoveModal(true)) : undefined}
          />
        </div>
      </ContentPanel>

      <ContentPanel type={PanelType.CONTENT}>
        <div className='flex justify-between'>
          <h2 className='text-lg font-semibold'> Studenci </h2>
          <div className='flex justify-between gap-6'>
            {checkPermission('database.add_students_to_group') && <Button text={'Wczytaj studentów z pliku'} type={ButtonType.ACTION} onClick={() => setAddFileModal(true)} />}
            {checkPermission('database.add_students_to_group') && <Button text={'Dodaj studentów'} type={ButtonType.ACTION} onClick={() => setAddStudentModal(true)} />}
            <Toolbar sort={false} filter={false} search={true} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj użytkowników' />
          </div>

        </div>
        <Table data={searchData} columns={columns(UserType.STUDENT, 'students/')}></Table>
      </ContentPanel>
    </ContentLayout>
  )
}
