import { Menu } from '@headlessui/react'
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { ColumnDef } from '@tanstack/react-table'
import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import { LinkCell, Table } from 'components/Table'
import React, { ReactNode } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ButtonType, DbAccount, PanelType, UserType } from 'types'
import { getUser } from '../api/getUser'
import { UserInfo } from '../components/UserInfo'
import { User as TUser } from '../types'

const columns : ColumnDef<DbAccount>[] = // TODO ADD DB_ACCOUNT TYPE
[
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
        accessorKey: 'isMovedToExtDB',
        header: 'Przeniesiono',
        cell: ({getValue}) => (
          <div className='p-2'>
              {/* {'true' ? getValue() : 'false'} */}
              {/* {getValue() as ReactNode} */}
          </div>
        )
    }
  ]

export const User = ({type} : {type: UserType}) => {
  const { id } = useParams()
  console.log(typeof type)
  const userQuery = useQuery(['user', id], () => getUser( id, type ))
  const baseUrl = type === UserType.ADMIN ? 'admins' : type === UserType.TEACHER ? 'teachers' : type === UserType.STUDENT ? 'students' : ''

  console.log(userQuery.data)

  if (userQuery.isLoading) {
    return (
      <Spinner />
    );
  }
  else if (userQuery.isError) {
    return (
      <div>
        Error!
      </div>
    );
  }

  return (
    <ContentLayout>
      <ContentPanel type={PanelType.HEADER}> 
            <span className='text-black text-3xl font-bold mb-4'> { userQuery.data.first_name + " " + userQuery.data.last_name} </span>
          <div className='flex gap-6'>
            <Button type={ButtonType.ACTION} text='Resetuj hasło' onClick={()=>console.log('RESET PASSWORD')}/>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="flex text-black items-center space-x-4">
                    <DotsHorizontalIcon className='w-7 h-auto cursor-pointer hover:text-zinc-500'/>
                  </Menu.Button>
                </div>
                  <Menu.Items className="absolute right-0 mt-4 w-[212px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active } : { active : any }) => (
                            <button
                              onClick={()=>console.log('EDIT')}
                              className={`${
                                active ? 'bg-blue-100' : 'text-black'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              Edytuj
                            </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active } : { active : any }) => (
                          <button
                            onClick={()=>console.log('DELETE')}
                            className={`${
                              active ? 'bg-red-500 text-white' : 'text-red-500'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            Usuń
                          </button>
                        )}
                      </Menu.Item>
                      
                    </div>
                  </Menu.Items>
              </Menu>
          </div>
        </ContentPanel>
        <ContentPanel type={PanelType.HEADER}>
          <UserInfo userData={userQuery.data} />
        </ContentPanel>
        <ContentPanel type={PanelType.CONTENT}>
          <Table data={userQuery.data.db_accounts} columns={columns}></Table>
        </ContentPanel>
    </ContentLayout>
  )
}
