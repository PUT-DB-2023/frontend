import { ColumnDef } from '@tanstack/react-table';
import { searchFunc } from 'api/searchApi';
import { ContentLayout, ContentPanel } from 'components';
import { Button } from 'components/Button';
import { LinkCell, Table } from 'components/Table';
import { Toolbar } from 'components/Toolbar';
import * as React from 'react';
import { useQuery } from 'react-query';
import { ButtonType, PanelType, UserType } from 'types';
import { getUsers } from '../api/getUsers';
import { AddNewModal } from '../components/AddNewModal';
import AuthContext from 'context/AuthContext';

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
  const usersQuery = useQuery(['users', type], () => getUsers(type))
  const baseUrl = type === UserType.ADMIN ? '' : type === UserType.TEACHER ? 'teachers/' : type === UserType.STUDENT ? 'students/' : ''
  const [search, setSearch] = React.useState('');
  const {authUser, checkPermission} = React.useContext(AuthContext);

  const searchData = React.useMemo(() => searchFunc(search, usersQuery.data, ['student_id', 'first_name', 'last_name', 'email']), [search, usersQuery.data]);

  if (usersQuery.isLoading) {
    return null
  }

  return (
    <ContentLayout>
      <AddNewModal show={addModal} off={() => setAddModal(false)} refetch={() => usersQuery.refetch()} type={type} />
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
        <Toolbar sort={false} filter={false} search={true} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj użytkownika' />
        <Table data={searchData} columns={columns(type, baseUrl)} />
      </ContentPanel>
    </ContentLayout>
  )
}
