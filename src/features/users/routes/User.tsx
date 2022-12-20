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
import { EditModal } from '../components/EditModal'
import { RemoveModal } from '../components/RemoveModal'
import * as React from 'react'

const columns : ColumnDef<DbAccount>[] =
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
      accessorKey: 'editionServer.edition.semester.start_year',
      header: () => 'Edycja',
      cell: ({getValue} : {getValue : any}) => (
        <div className='p-2'>
            {getValue().toString() + '/' + (parseInt(getValue()) + 1).toString() as ReactNode}
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
              {getValue()?.toString() as ReactNode}
          </div>
        )
    }
  ]

export const User = ({type} : {type: UserType}) => {
  const { id } = useParams()
  const [editModal, setEditModal] = React.useState(false)
  const [removeModal, setRemoveModal] = React.useState(false)
  const {data: userData, status: userStatus, refetch: userRefetch} = useQuery(['user', id], () => getUser( id, type ))
  React.useEffect(() => {
    document.title = `${type === UserType.ADMIN ? 'Admin:' : type === UserType.TEACHER ? 'Dydaktyk:' : type === UserType.STUDENT ? 'Student:' : 'Użytkownik:'} 
    ${userData?.first_name ? userData?.first_name : ''} ${userData?.last_name ? userData?.last_name : ''}`
  },[type, userData?.first_name, userData?.last_name])


  if (userStatus === 'loading' || userData === undefined) {
    return null
  }

  return (
    <ContentLayout>
      <EditModal show={editModal} refetch={userRefetch} off={() => setEditModal(false)} type={type} data={userData}/>
      <RemoveModal show={removeModal} id={id} off={() => setRemoveModal(false)} type={type} />
      <ContentPanel type={PanelType.HEADER}> 
            <span className='text-black text-3xl font-bold mb-4'> { userData.first_name + " " + userData.last_name} </span>
          <div className='flex gap-6'>
            <Button type={ButtonType.ACTION} text='Resetuj hasło' onClick={()=>console.log('RESET PASSWORD')}/>
            <OptionsMenu edit={() => setEditModal(true)} remove={() => setRemoveModal(true)} />
          </div>
        </ContentPanel>
        <ContentPanel type={PanelType.HEADER}>
          <UserInfo userData={userData} />
        </ContentPanel>
        {
          type === UserType.STUDENT ? (
            <ContentPanel type={PanelType.CONTENT}>
              <h2 className='text-lg font-semibold'> Konta bazodanowe </h2>
              <Table data={userData.db_accounts} columns={columns}></Table>
            </ContentPanel>
          ) : null
        }
        
    </ContentLayout>
  )
}
