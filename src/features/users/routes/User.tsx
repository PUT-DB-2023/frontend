import { ColumnDef } from '@tanstack/react-table'
import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { OptionsMenu } from 'components/OptionsMenu'
import { Spinner } from 'components/Spinner'
import { Table } from 'components/Table'
import { ReactNode } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ButtonType, DbAccount, PanelType, UserType } from 'types'
import { getUser } from '../api/getUser'
import { UserInfo } from '../components/UserInfo'

const columns : ColumnDef<DbAccount>[] = // TODO ADD DB_ACCOUNT TYPE
[
    {
      accessorKey: 'editionServer.server.name',
      header: () => 'Serwer',
      cell: ({getValue}) => (
        <div className='p-2'>
            {getValue() as ReactNode}
        </div>
      )
    },
    {
      accessorKey: 'editionServer.edition.course.name',
      header: () => 'Przedmiot',
      cell: ({getValue}) => (
        <div className='p-2'>
            {getValue() as ReactNode}
        </div>
      )
    },
    {
      accessorKey: 'editionServer.edition.semester.year',
      header: () => 'Edycja',
      cell: ({getValue}) => (
        <div className='p-2'>
            {getValue() as ReactNode}
        </div>
      )
    },
    {
      accessorKey: 'editionServer.edition.semester.winter',
      header: () => 'Semestr',
      cell: ({getValue} : {getValue : any}) => (
        <div className='p-2'>
            {getValue() ? <span>Zima</span> : <span>Lato</span>}
        </div>
      )
    },
    {
        accessorKey: 'username',
        header: () => 'Użytkownik',
        cell: ({getValue}) => (
          <div className='p-2'>
              {getValue() as ReactNode}
          </div>
        )
    },
    {
        accessorKey: 'password',
        header: () => 'Hasło',
        cell: ({getValue}) => (
          <div className='p-2'>
              {getValue() as ReactNode}
          </div>
        )
    },
    {
        accessorKey: 'additional_info',
        header: () => 'Dodatkowe informacje',
        cell: ({getValue}) => (
          <div className='p-2'>
              {getValue() as ReactNode}
          </div>
        )
    },
    {
        accessorKey: 'is_moved',
        header: 'Przeniesiono',
        cell: ({getValue} : {getValue : any}) => (
          <div className='p-2'>
              {getValue().toString() as ReactNode}
          </div>
        )
    }
  ]

export const User = ({type} : {type: UserType}) => {
  const { id } = useParams()
  const userQuery = useQuery(['user', id], () => getUser( id, type ))
  const baseUrl = type === UserType.ADMIN ? 'admins' : type === UserType.TEACHER ? 'teachers' : type === UserType.STUDENT ? 'students' : ''

  if (userQuery.isLoading || userQuery.data === undefined) {
    return (
      <Spinner />
    );
  }
  else if (userQuery.isError || userQuery.data === undefined) {
    return (
      <div>
        Error!
      </div>
    );
  }

  console.log(userQuery.data)

  return (
    <ContentLayout>
      <ContentPanel type={PanelType.HEADER}> 
            <span className='text-black text-3xl font-bold mb-4'> { userQuery.data.first_name + " " + userQuery.data.last_name} </span>
          <div className='flex gap-6'>
            <Button type={ButtonType.ACTION} text='Resetuj hasło' onClick={()=>console.log('RESET PASSWORD')}/>
            <OptionsMenu edit={() => console.log('EDIT')} remove={() => console.log('REMOVE')} />
          </div>
        </ContentPanel>
        <ContentPanel type={PanelType.HEADER}>
          <UserInfo userData={userQuery.data} />
        </ContentPanel>
        {
          type === UserType.STUDENT ? (
            <ContentPanel type={PanelType.CONTENT}>
              <h2 className='text-lg font-semibold'> Konta bazodanowe </h2>
              <Table data={userQuery.data.db_accounts} columns={columns}></Table>
            </ContentPanel>
          ) : null
        }
        
    </ContentLayout>
  )
}
