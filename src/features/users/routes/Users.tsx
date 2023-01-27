import { ColumnDef } from '@tanstack/react-table';
import { ContentLayout, ContentPanel } from 'components';
import { Button } from 'components/Button';
import { OptionsMenu, CustomOptionMenuItem } from 'components/OptionsMenu';
import { LinkCell } from 'components/Table';
import AuthContext from 'context/AuthContext';
import { queryClient } from 'lib/react-query';
import * as React from 'react';
import { ButtonType, PanelType, UserType } from 'types';
import { AddNewModal } from '../components/AddNewModal';
import { RemoveStudentsWithoutGroupsModal } from '../components/RemoveUsersWithoutGroupsModal';
import { UserList } from '../components/UserList';
import { Student, User } from '../types';

interface UsersProps {
  type: UserType;
}

const customMenuItems = (student: Student, setShow: (v: boolean) => void, setCurrent: (v: Student) => void): CustomOptionMenuItem[] => [
  {
    text: 'Usuń z grupy',
    onClick: async () => {
      setCurrent(student);
      setShow(true);
    },
  }
]

export const usersColumns = (type: UserType,
  baseUrl: string,
  options?: boolean,
  removeFromGroupPerm?: boolean,
  setRemoveFromGroup?: (v: boolean) => void,
  setCurrent?: (v: Student) => void,
): ColumnDef<any>[] => {
  let prefix = 'user.'

  if (type === UserType.ADMIN) {
    prefix = ''
  }

  let data: ColumnDef<any>[] = [];
  type !== UserType.STUDENT && data.push({
    accessorKey: `${prefix}id`,
    header: () => 'Id',
    cell: ({ row, getValue }: any) => LinkCell({ row, getValue, baseUrl })
  })
  type === UserType.STUDENT && data.push({
    accessorKey: `student_id`,
    header: () => 'Nr albumu',
    cell: ({ row, getValue }: any) => LinkCell({ row, getValue, baseUrl })
  })
  data.push({
    accessorKey: `${prefix}first_name`,
    header: () => 'Imię',
    cell: ({ row, getValue }: any) => LinkCell({ row, getValue, baseUrl })
  })
  data.push({
    accessorKey: `${prefix}last_name`,
    header: () => 'Nazwisko',
    cell: ({ row, getValue }: any) => LinkCell({ row, getValue, baseUrl })
  })
  data.push({
    accessorKey: `${prefix}email`,
    header: 'Email',
    cell: ({ row, getValue }: any) => LinkCell({ row, getValue, baseUrl })
  })

  if (options && setRemoveFromGroup && setCurrent) {
    data.push({
      id: 'options',
      accessorFn: row => row,
      header: 'Opcje',
      cell: ({ getValue }: any) => (
        <div className='p-2 flex justify-center '>
          <OptionsMenu
            customMenuItems={removeFromGroupPerm ? customMenuItems(getValue(), setRemoveFromGroup, setCurrent) : undefined}
          />
        </div>
      )
    })
  }

  return data;
}

export const Users = ({ type }: UsersProps) => {
  const [addModal, setAddModal] = React.useState(false);
  const { checkPermission } = React.useContext(AuthContext);
  const [removeStudentsWithoutGroups, setRemoveStudentsWithoutGroups] = React.useState(false);
  React.useEffect(() => { document.title = type === UserType.ADMIN ? 'Administratorzy' : type === UserType.TEACHER ? 'Dydaktycy' : type === UserType.STUDENT ? 'Studenci' : 'Użytkownicy' }, [type])

  const addUserPermission = (type: UserType) => {
    const user = checkPermission('database.add_user');
    const special = type === UserType.STUDENT ? checkPermission('database.add_student') : (type === UserType.TEACHER ? checkPermission('database.add_teacher') : checkPermission('database.add_admin'));
    return user && special;
  }

  const customMenuItems = (): CustomOptionMenuItem[] => [
    {
      text: 'Usuń studentów bez grup',
      onClick: async () => {
        setRemoveStudentsWithoutGroups(true);
      },
    }
  ]

  return (
    <ContentLayout>
      {addUserPermission(type) && <AddNewModal show={addModal} off={() => setAddModal(false)} refetch={() => queryClient.refetchQueries('users')} type={type} />}
      {(checkPermission("database.delete_student") && type === UserType.STUDENT) && <RemoveStudentsWithoutGroupsModal show={removeStudentsWithoutGroups} off={() => setRemoveStudentsWithoutGroups(false)} refetch={() => queryClient.refetchQueries('users')} />}
      <ContentPanel type={PanelType.HEADER}>
        <span className='text-black text-3xl font-bold mb-4'>
          {
            type === UserType.ADMIN ? 'Administratorzy' :
              type === UserType.TEACHER ? 'Dydaktycy' :
                type === UserType.STUDENT ? 'Studenci' : ''
          }
        </span>
        <div className='flex gap-4'>
          {addUserPermission(type) && <Button type={ButtonType.ACTION} onClick={() => setAddModal(true)} text='Dodaj' />}
          <OptionsMenu
            customMenuItems={(checkPermission('database.delete_student') && type === UserType.STUDENT) ? customMenuItems() : undefined}
          />
        </div>
      </ContentPanel>

      <ContentPanel type={PanelType.CONTENT}>
        <UserList type={type} />
      </ContentPanel>
    </ContentLayout>
  )
}