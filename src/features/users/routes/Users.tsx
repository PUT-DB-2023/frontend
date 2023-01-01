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

  return ([
    {
      accessorKey: `${prefix}id`,
      header: () => 'Id',
      cell: ({ row, getValue } : any) => LinkCell({ row, getValue, baseUrl })
    },
    {
      accessorKey: `${prefix}first_name`,
      header: () => 'Imię',
      cell: ({ row, getValue }) => LinkCell({ row, getValue, baseUrl })
    },
    {
      accessorKey: `${prefix}last_name`,
      header: () => 'Nazwisko',
      cell: ({ row, getValue }) => LinkCell({ row, getValue, baseUrl })
    },
    {
      accessorKey: `${prefix}email`,
      header: 'Email',
      cell: ({ row, getValue }) => LinkCell({ row, getValue, baseUrl })
    }
  ])
}

export const Users = ({ type }: UsersProps) => {
  const [addModal, setAddModal] = React.useState(false);
  const {authUser, checkPermission} = React.useContext(AuthContext);
  React.useEffect(() => {document.title = type === UserType.ADMIN ? 'Administratorzy' : type === UserType.TEACHER ? 'Dydaktycy' : type === UserType.STUDENT ? 'Studenci' : 'Użytkownicy'},[type])

  return (
    <ContentLayout>
      {checkPermission('database.add_user') && <AddNewModal show={addModal} off={() => setAddModal(false)} refetch={() =>queryClient.refetchQueries('users')} type={type} />}
      <ContentPanel type={PanelType.HEADER}>
        <span className='text-black text-3xl font-bold mb-4'>
          {
            type === UserType.ADMIN ? 'Administratorzy' :
            type === UserType.TEACHER ? 'Dydaktycy' :
            type === UserType.STUDENT ? 'Studenci' : ''
          }
        </span>
        <div className='flex gap-4'>
          {checkPermission('database.add_user') && <Button type={ButtonType.ACTION} onClick={() => setAddModal(true)} text='Dodaj' />}
        </div>
      </ContentPanel>

      <ContentPanel type={PanelType.CONTENT}>
        <UserList type={type} />
      </ContentPanel>
    </ContentLayout>
  )
}
