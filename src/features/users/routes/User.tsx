import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid'
import { ColumnDef, Getter } from '@tanstack/react-table'
import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Loading } from 'components/Loading'
import { OptionsMenu } from 'components/OptionsMenu'
import { Table } from 'components/Table'
import AuthContext from 'context/AuthContext'
import { GroupList } from 'features/groups/components/GroupList'
import { Semester } from 'features/semesters'
import * as React from 'react'
import { ReactNode } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ButtonType, DbAccount, PanelType, UserType } from 'types'
import { getUser } from '../api/getUser'
import { EditModal } from '../components/EditModal'
import { PasswordResetModal } from '../components/PasswordResetModal'
import { RemoveModal } from '../components/RemoveModal'
import { StudentGroupList } from '../components/StudentGroupList'
import { TeacherEditionList } from '../components/TeacherEditionList'
import { UserInfo } from '../components/UserInfo'
import { User as TUser } from '../types'

const dbAccountsColumns : ColumnDef<DbAccount>[] =
[
    {
      id: 'server',
      accessorFn: row => row?.editionServer?.server?.name,
      header: () => 'Serwer',
      cell: ({getValue}) => (
        <div className='p-2'>
            {getValue() as ReactNode || 'Brak'}
        </div>
      )
    },
    {
      id: 'course',
      accessorFn: row => row?.editionServer?.edition?.course?.name,
      header: () => 'Przedmiot',
      cell: ({getValue}) => (
        <div className='p-2'>
            {getValue() as ReactNode || 'Brak'}
        </div>
      )
    },
    {
      id: 'edycja',
      accessorFn: row => row?.editionServer?.edition?.semester,
      header: () => 'Edycja',
      cell: ({getValue} : {getValue : Getter<Semester>}) => (
        <div className='p-2'>
            {getValue() ? 
              getValue()?.start_year.toString() + '/' + (parseInt(getValue()?.start_year) + 1).toString() + ' - ' +
              getValue()?.winter ? <span>Zima</span> : <span>Lato</span> : 'Brak'
            }
        </div>
      )
    },
    {
        accessorKey: 'username',
        header: () => 'Użytkownik',
        cell: ({getValue}) => (
          <div className='p-2'>
              {getValue() as ReactNode  || 'Brak'}
          </div>
        )
    },
    {
        accessorKey: 'password',
        header: () => 'Hasło',
        cell: ({getValue}) => (
          <div className='p-2'>
              {getValue() as ReactNode  || 'Brak'}
          </div>
        )
    },
    {
        accessorKey: 'additional_info',
        header: () => 'Dodatkowe informacje',
        cell: ({getValue}) => (
          <div className='p-2'>
              {getValue() as ReactNode  || 'Brak'}
          </div>
        )
    },
    {
        accessorKey: 'is_moved',
        header: 'Utworzono na serwerze',
        cell: ({getValue} : {getValue : any}) => (
          <div className='p-2'>
            {getValue() === true ? <CheckCircleIcon className='h-6 text-green-500'/> : getValue() === false ? <XCircleIcon className='h-6 text-red-500'/> : null  || 'Brak'}
          </div>
        )
    }
]

interface IUser {
  type: UserType;
}

export const User = ({type} : IUser) => {
  const { id } = useParams()
  const [editModal, setEditModal] = React.useState(false)
  const [removeModal, setRemoveModal] = React.useState(false)
  const [resetModal, setResetModal] = React.useState(false)
  const [userAccessor, setUserAccessor] = React.useState<TUser>()
  const {authUser, checkPermission} = React.useContext(AuthContext);

  const {data: userData, status: userStatus, refetch: userRefetch} = useQuery(['user', id], () => getUser(id, type))
  
  React.useEffect(() => {
    if (userData) {
      if (type === UserType.ADMIN) setUserAccessor(userData)
      else setUserAccessor(userData.user)
    }
  }, [id, userData, userStatus])

  React.useEffect(() => {
    document.title = `${type === UserType.ADMIN ? 'Admin:' : type === UserType.TEACHER ? 'Dydaktyk:' : type === UserType.STUDENT ? 'Student:' : 'Użytkownik:'} 
    ${userData?.first_name ? userData?.first_name : ''} ${userData?.last_name ? userData?.last_name : ''}`
  },[type, userData?.first_name, userData?.last_name])

  if (userStatus === 'loading' || userData === undefined || userAccessor === undefined) {
    return <Loading />
  }

  return (
    <ContentLayout>
      {checkPermission('database.change_user') && <EditModal show={editModal} refetch={userRefetch} off={() => setEditModal(false)} type={type} data={userData}/>}
      {checkPermission('database.delete_user') && <RemoveModal show={removeModal} id={id} off={() => setRemoveModal(false)} type={type} />}
      {checkPermission('database.reset_system_password') && <PasswordResetModal show={resetModal} id={id} off={() => setResetModal(false)}/>}
      <ContentPanel type={PanelType.HEADER}> 
            <span className='text-black text-3xl font-bold mb-4'> { userAccessor.first_name + " " + userAccessor.last_name} </span>
          <div className='flex gap-6'>
          {checkPermission('database.reset_system_password') ? <Button type={ButtonType.ACTION} text='Resetuj hasło' onClick={()=>setResetModal(true)}/> : null }
            <OptionsMenu
              edit={checkPermission('database.change_user') ? (() => setEditModal(true)) : undefined}
              remove={checkPermission('database.delete_user') ? (() => setRemoveModal(true)) : undefined}
            />
          </div>
        </ContentPanel>
        <ContentPanel type={PanelType.HEADER}>
          <UserInfo userData={userAccessor} />
        </ContentPanel>
        {
          type === UserType.STUDENT ? (
            <ContentPanel type={PanelType.CONTENT}>
              <h2 className='text-lg font-semibold'> Konta bazodanowe </h2>
              <Table data={userData?.db_accounts} columns={dbAccountsColumns}></Table>
            </ContentPanel>
          ) : null
        }

        {
          type === UserType.STUDENT ? (
            <ContentPanel type={PanelType.CONTENT}>
              <h2 className='text-lg font-semibold'> Grupy studenta </h2>
              <StudentGroupList groupData={userData?.groups} />
            </ContentPanel>
          ) : null
        }

        {
          type === UserType.TEACHER ? (
            <ContentPanel type={PanelType.CONTENT}>
              <h2 className='text-lg font-semibold'> Edycje nauczyciela </h2>
              <TeacherEditionList editionData={userData?.editions} />
            </ContentPanel>
          ) : null
        }
        
    </ContentLayout>
  )
}
