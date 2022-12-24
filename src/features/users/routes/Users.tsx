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

interface UsersProps {
  type: UserType;
}

export const columns = (type: UserType, baseUrl: string): ColumnDef<any>[] => {
  let id_column = {
    accessorKey: 'user.id',
    header: () => 'Id',
    cell: ({ row, getValue } : any) => LinkCell({ row, getValue, baseUrl })
  }

  let prefix = 'user.'

  if (type === UserType.STUDENT) {
    id_column = {
      accessorKey: 'student_id',
      header: () => 'Nr Indeksu',
      cell: ({ row, getValue }) => LinkCell({ row, getValue, baseUrl })
    }
  }

  else if (type === UserType.ADMIN) {
    prefix = ''
  }

  console.log(`${prefix}first_name`)

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
          <Button type={ButtonType.ACTION} onClick={() => setAddModal(true)} text='Dodaj' />
        </div>
      </ContentPanel>

      <ContentPanel type={PanelType.CONTENT}>
        <Toolbar sort={false} filter={false} search={true} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj użytkownika' />
        <Table data={searchData} columns={columns(type, baseUrl)} />
      </ContentPanel>
    </ContentLayout>
  )
}
