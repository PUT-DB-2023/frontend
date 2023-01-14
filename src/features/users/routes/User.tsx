import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid'
import { ColumnDef, Getter } from '@tanstack/react-table'
import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Loading } from 'components/Loading'
import { CustomOptionMenuItem, OptionsMenu } from 'components/OptionsMenu'
import { Table } from 'components/Table'
import AuthContext from 'context/AuthContext'
import { Semester } from 'features/semesters'
import * as React from 'react'
import { ReactNode } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ButtonType, DbAccount, PanelType, UserType } from 'types'
import { isStudentOrTeacher } from '../api/checkUserType'
import { getUser } from '../api/getUser'
import { EditModal } from '../components/EditModal'
import { PasswordResetModal } from '../components/PasswordResetModal'
import { RemoveDBAccountModal } from '../components/RemoveDBAccountModal'
import { RemoveModal } from '../components/RemoveModal'
import { ResetDBAccountPasswordModal } from '../components/ResetDBAccountPasswordModal'
import { StudentGroupList } from '../components/StudentGroupList'
import { TeacherEditionList } from '../components/TeacherEditionList'
import { UserInfo } from '../components/UserInfo'
import { User as TUser } from '../types'

const customMenuItems = (dbAccount: DbAccount, setShow: (v: boolean) => void, setCurrent: (v: DbAccount) => void): CustomOptionMenuItem[] => [
  {
    text: 'Resetuj hasło',
    onClick: async () => {
      setCurrent(dbAccount);
      setShow(true);
    },
  }
]

const dbAccountsColumns = (
  setReamoveShow: (v: boolean) => void,
  setResetPassword: (v: boolean) => void,
  setCurrent: (v: DbAccount) => void,
  resetDBPassPerm: boolean,
  deleteDBPerm: boolean
): ColumnDef<DbAccount>[] => {
  return [
    {
      id: 'server',
      accessorFn: row => row?.editionServer?.server?.name,
      header: () => 'Serwer',
      cell: ({ getValue }) => (
        <div className='p-2'>
          {getValue() as ReactNode || 'Brak'}
        </div>
      )
    },
    {
      id: 'course',
      accessorFn: row => row?.editionServer?.edition?.course?.name,
      header: () => 'Przedmiot',
      cell: ({ getValue }) => (
        <div className='p-2'>
          {getValue() as ReactNode || 'Brak'}
        </div>
      )
    },
    {
      id: 'edition',
      accessorFn: row => row?.editionServer?.edition?.semester,
      header: () => 'Edycja',
      cell: ({ getValue }: { getValue: Getter<Semester> }) => (
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
      cell: ({ getValue }) => (
        <div className='p-2'>
          {getValue() as ReactNode || 'Brak'}
        </div>
      )
    },
    {
      accessorKey: 'additional_info',
      header: () => 'Dodatkowe informacje',
      cell: ({ getValue }) => (
        <div className='p-2'>
          {getValue() as ReactNode || 'Brak'}
        </div>
      )
    },
    {
      accessorKey: 'is_moved',
      header: 'Utworzono na serwerze',
      cell: ({ getValue }: { getValue: any }) => (
        <div className='p-2'>
          {getValue() === true ? <CheckCircleIcon className='h-6 text-green-500' /> : getValue() === false ? <XCircleIcon className='h-6 text-red-500' /> : null || 'Brak'}
        </div>
      )
    },
    {
      id: 'options',
      accessorFn: row => row,
      // accessorFn: row => ({id: row?.id, name: row?.editionServer?.server.name}),
      header: 'Opcje',
      cell: ({ getValue }: any) => (
        <div className='p-2 flex justify-center '>
          <OptionsMenu
            remove={deleteDBPerm ?
              async () => {
              setCurrent(getValue());
              setReamoveShow(true);
            } : undefined
            }
            customMenuItems={resetDBPassPerm ? customMenuItems(getValue(), setResetPassword, setCurrent) : undefined}
          />
        </div>
      )
    }
  ]
}

interface IUser {
  type: UserType;
}

export const User = ({ type }: IUser) => {
  const { id } = useParams()
  const [editModal, setEditModal] = React.useState(false)
  const [removeModal, setRemoveModal] = React.useState(false)
  const [resetModal, setResetModal] = React.useState(false)
  const [userAccessor, setUserAccessor] = React.useState<TUser>()
  const [removeDBAccount, setRemoveDBAccount] = React.useState(false);
  const [resetDBPassword, setResetBPassword] = React.useState(false);
  const [currentDBAccountID, setCurrentDBAccountID] = React.useState<DbAccount>();
  const { authUser, checkPermission } = React.useContext(AuthContext);
  const userProfil = id === (isStudentOrTeacher(authUser) ? authUser?.user?.id.toString() : authUser?.id.toString());
  console.log(authUser?.permissions)

  const resetPassPerm = (userProfil && checkPermission('database.reset_own_password')) || checkPermission('database.reset_student_password')
  const editPerm = checkPermission('database.change_user')
  const deletePerm = checkPermission('database.delete_user')
  const resetDBPassPerm = checkPermission('database.reset_db_password')
  const deleteDBPerm = checkPermission('database.delete_dbaccount')

  const { data: userData, status: userStatus, refetch: userRefetch } = useQuery(['user', id], () => getUser(id, type))

  React.useEffect(() => {
    if (userData) {
      if (type === UserType.ADMIN) setUserAccessor(userData)
      else setUserAccessor(userData.user)
    }
  }, [id, userData, userStatus])

  React.useEffect(() => {
    document.title = `${type === UserType.ADMIN ? 'Admin:' : type === UserType.TEACHER ? 'Dydaktyk:' : type === UserType.STUDENT ? 'Student:' : 'Użytkownik:'} 
    ${userData?.first_name ? userData?.first_name : ''} ${userData?.last_name ? userData?.last_name : ''}`
  }, [type, userData?.first_name, userData?.last_name])

  const columns = dbAccountsColumns(setRemoveDBAccount, setResetBPassword, setCurrentDBAccountID, resetDBPassPerm, deleteDBPerm);

  if (userStatus === 'loading' || userData === undefined || userAccessor === undefined) {
    return <Loading />
  }

  return (
    <ContentLayout>
      {deleteDBPerm && <RemoveDBAccountModal show={removeDBAccount} off={() => setRemoveDBAccount(false)} dbAccount={currentDBAccountID}/>}
      {resetDBPassPerm && <ResetDBAccountPasswordModal show={resetDBPassword} off={() => setResetBPassword(false)} dbAccount={currentDBAccountID}/>}
      {editPerm && <EditModal show={editModal} refetch={userRefetch} off={() => setEditModal(false)} type={type} data={userData} />}
      {deletePerm && <RemoveModal show={removeModal} id={userData.id} off={() => setRemoveModal(false)} type={type} />}
      {resetPassPerm && <PasswordResetModal show={resetModal} id={userData.id} off={() => setResetModal(false)} />}
      <ContentPanel type={PanelType.HEADER}>
        <span className='text-black text-3xl font-bold mb-4'> {userAccessor.first_name + " " + userAccessor.last_name} </span>
        <div className='flex gap-6'>
          {resetPassPerm && <Button type={ButtonType.ACTION} text='Resetuj hasło' onClick={() => setResetModal(true)} />}
          <OptionsMenu
            edit={editPerm ? (() => setEditModal(true)) : undefined}
            remove={deletePerm && type !== UserType.ADMIN ? (() => setRemoveModal(true)) : undefined}
          />
        </div>
      </ContentPanel>
      <ContentPanel type={PanelType.HEADER}>
        <UserInfo userData={userData} userAccessor={userAccessor} userType={type} />
      </ContentPanel>
      {
        type === UserType.STUDENT ? (
          <ContentPanel type={PanelType.CONTENT}>
            <h2 className='text-lg font-semibold'> Konta bazodanowe </h2>
            <Table data={userData?.db_accounts} columns={columns}></Table>
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
