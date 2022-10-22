import { Menu } from '@headlessui/react'
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { ColumnDef } from '@tanstack/react-table'
import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import { LinkCell, Table } from 'components/Table'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ButtonType, PanelType } from 'types'
import { getUser } from '../api/getUser'
import { UserInfo } from '../components/UserInfo'
import { User as UserType } from '../types'

const columns: ColumnDef<UserType>[] = [
  {
      accessorKey: 'id',
      header: () => 'Nr Indeksu',
      cell: ({row, getValue}) => LinkCell({row, getValue})
  },
  {
      accessorKey: 'first_name',
      header: () => 'Imię',
      cell: ({row, getValue}) => LinkCell({row, getValue})
  },
  {
      accessorKey: 'last_name',
      header: () => 'Nazwisko',
      cell: ({row, getValue}) => LinkCell({row, getValue})
  },
  {
      accessorKey: 'email',
      header: 'Email',
      cell: ({row, getValue}) => LinkCell({row, getValue})
  },
]

export const User = () => {
  const { id } = useParams()
  const userQuery = useQuery(['user', id], () => getUser( id ))

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
          <Table data={userQuery.data} columns={columns}></Table>
        </ContentPanel>
    </ContentLayout>
  )
}
