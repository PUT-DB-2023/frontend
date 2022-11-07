import { ColumnDef } from '@tanstack/react-table';
import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button';
import { Spinner } from 'components/Spinner';
import { LinkCell, Table } from 'components/Table';
import { Toolbar } from 'components/Toolbar';
import { useQuery } from 'react-query';
import { ButtonType, PanelType, UserType } from 'types'
import { getUsers } from '../api/getUsers';
import { UserTable } from '../components/UserTable';
import { User } from '../types';
import * as React from 'react';
import { searchFunc } from 'api/searchApi'

interface UsersProps {
    type: UserType;
}

export const columns = (baseUrl: string): ColumnDef<User>[] => {

  return ([
    {
        accessorKey: 'student_id',
        header: () => 'Nr Indeksu',
        cell: ({row, getValue}) => LinkCell({row, getValue, baseUrl})
    },
    {
        accessorKey: 'first_name',
        header: () => 'Imię',
        cell: ({row, getValue}) => LinkCell({row, getValue, baseUrl})
    },
    {
        accessorKey: 'last_name',
        header: () => 'Nazwisko',
        cell: ({row, getValue}) => LinkCell({row, getValue, baseUrl})
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({row, getValue}) => LinkCell({row, getValue, baseUrl})
    }
  ])
}

export const Users = ({ type } : UsersProps) => {
  const usersQuery = useQuery(['users', type], () => getUsers(type))
  const baseUrl = type === UserType.ADMIN ? 'admins' : type === UserType.TEACHER ? 'teachers' : type === UserType.STUDENT ? 'students' : ''
  const [search, setSearch] = React.useState('');

  const searchData = React.useMemo(() => searchFunc(search, usersQuery.data, ['student_id','first_name','last_name','email']), [search, usersQuery.data]);

  if (usersQuery.isLoading) {
    return (
      <Spinner />
    );
  }

  return (
    <ContentLayout>
      <ContentPanel type={PanelType.HEADER}>
        <span className='text-black text-3xl font-bold mb-4'>
            { 
                type === UserType.ADMIN ? 'Administratorzy' :
                type === UserType.TEACHER ? 'Dydaktycy' :
                type === UserType.STUDENT ? 'Studenci' : '' 
            }
        </span>
        <div className='flex gap-4'>
          <Button type={ButtonType.ACTION} text='Dodaj'/>
        </div>
      </ContentPanel>

      <ContentPanel type={PanelType.CONTENT}>
        <Toolbar sort={false} filter={false} search={true} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj użytkownika' />
        <Table data={searchData} columns={columns(baseUrl)} />
      </ContentPanel>
    </ContentLayout>
  )
}
