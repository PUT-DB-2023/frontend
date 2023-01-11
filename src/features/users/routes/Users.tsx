import { ColumnDef } from '@tanstack/react-table';
import { ContentLayout, ContentPanel } from 'components';
import { Button } from 'components/Button';
import { LinkCell } from 'components/Table';
import AuthContext from 'context/AuthContext';
import { queryClient } from 'lib/react-query';
import * as React from 'react';
import { ButtonType, PanelType, UserType } from 'types';
import { AddNewModal } from '../components/AddNewModal';
import { UserList } from '../components/UserList';

interface UsersProps {
  type: UserType;
}

export const columns = (type: UserType, baseUrl: string): ColumnDef<any>[] => {
  let prefix = 'user.'

  if (type === UserType.ADMIN) {
    prefix = ''
  }

  let data = [];
  type !== UserType.STUDENT && data.push({
    accessorKey: `${prefix}id`,
    header: () => 'Id',
    cell: ({ row, getValue } : any) => LinkCell({ row, getValue, baseUrl })
  })
  type === UserType.STUDENT && data.push({
    accessorKey: `student_id`,
    header: () => 'Student ID',
    cell: ({ row, getValue } : any) => LinkCell({ row, getValue, baseUrl })
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

  return data;
}

export const Users = ({ type }: UsersProps) => {
  const [addModal, setAddModal] = React.useState(false);
  const {authUser, checkPermission} = React.useContext(AuthContext);
  React.useEffect(() => {document.title = type === UserType.ADMIN ? 'Administratorzy' : type === UserType.TEACHER ? 'Dydaktycy' : type === UserType.STUDENT ? 'Studenci' : 'Użytkownicy'},[type])

  const addUserPermission = (type: UserType) => {
    const user = checkPermission('database.add_user');
    const special = type === UserType.STUDENT ? checkPermission('database.add_student') : (type === UserType.TEACHER ? checkPermission('database.add_teacher') : checkPermission('database.add_admin'));
    return user && special;
  }

  return (
    <ContentLayout>
      {addUserPermission(type) && <AddNewModal show={addModal} off={() => setAddModal(false)} refetch={() =>queryClient.refetchQueries('users')} type={type} />}
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
        </div>
      </ContentPanel>

      <ContentPanel type={PanelType.CONTENT}>
        <UserList type={type} />
      </ContentPanel>
    </ContentLayout>
  )
}
