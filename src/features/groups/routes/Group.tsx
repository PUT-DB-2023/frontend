import { Menu } from '@headlessui/react'
import { DotsHorizontalIcon, LoginIcon } from '@heroicons/react/solid'
import { ColumnDef } from '@tanstack/react-table'
import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import { LinkCell, Table } from 'components/Table'
import { Toolbar } from 'components/Toolbar'
import { getEditions } from 'features/editions/api/getEditions'
import { EditionList } from 'features/editions/components/EditionList'
import { GroupList } from 'features/editions/components/GroupList'
import { ServerList } from 'features/servers/components/ServerList'
import { User } from 'features/users'
import { UserTable } from 'features/users/components/UserTable'
import { columns } from 'features/users/routes/Users'
import { getgroups } from 'process'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ButtonType, Status, PanelType, testSortOptions } from 'types'
import { addDbAccounts } from '../api/addDbAccounts'
import { getGroup } from '../api/getGroup'
import { GroupServerList } from '../components/GroupServerList'
import { ServerListModal } from '../components/ServerListModal'
import { RemoveModal } from '../components/RemoveModal'
import { EditModal } from '../components/EditModal'
import * as React from 'react'

export const Group = () => {
  const [removeModal, setRemoveModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const { id } = useParams()
  const { data: groupData, status: groupStatus, refetch: groupRefetch } = useQuery(['group', id], () => getGroup(id))
  const [newModal, setNewModal] = useState(false);

  const { data: dbAccoutCreationData, status: dbAccoutCreationStatus, refetch: dbAccoutCreationRefetch } = useQuery(['dbAccountCreation'],
    () => addDbAccounts(groupData.id, groupData.teacherEdition.edition.servers[0].id), {
    refetchOnWindowFocus: false,
    enabled: false // disable this query from automatically running
  })
  let students = null
  let servers = null

  if (groupStatus === 'loading') {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }
  else {
    students = groupData.students
    servers = groupData.teacherEdition.edition.servers
  }

  const createDbAccounts = (groupId: Number, serverId: Number) => {
    dbAccoutCreationRefetch()
  }

  return (
    <ContentLayout>
      <RemoveModal off={() => setRemoveModal(false)} id={id} show={removeModal} name={`${groupData.name} - ${groupData.day} ${groupData.hour}`} />
      <EditModal off={() => setEditModal(false)} refetch={groupRefetch} show={editModal} data={groupData} />
      <ServerListModal groupId={groupData.id} servers={servers} refetch={() => dbAccoutCreationRefetch()} show={newModal} off={() => setNewModal(false)} />
      <ContentPanel type={PanelType.HEADER}>
        <div className='flex-col flex gap-4'>
          <h1 className='font-bold text-3xl'> {groupData.name} - {groupData.day} {groupData.hour} </h1>
          <h2 className='font-normal text-base'>
            {groupData.teacherEdition.edition.course.name} - {groupData.teacherEdition.edition.semester.year} {groupData.teacherEdition.edition.semester.winter ? "Zima" : "Lato"}
          </h2>
          <h2 className='text-blue-900 font-semibold mb-8'> {groupData !== undefined ? groupData.students.length : ''} studentów </h2>
        </div>
        <div className='flex gap-6'>
          <Button onClick={() => setNewModal(true)} type={ButtonType.ACTION} text='Utwórz konta' />
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <Menu.Button className="flex text-black items-center space-x-4">
                <DotsHorizontalIcon className='w-7 h-auto cursor-pointer hover:text-zinc-500' />
              </Menu.Button>
            </div>
            <Menu.Items className="absolute right-0 mt-4 w-[212px] origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }: { active: any }) => (
                    <button
                      onClick={() => setEditModal(true)}
                      className={`${active ? 'bg-blue-100' : 'text-black'
                        } group flex w-full items-center rounded-lg px-2 py-2 text-sm`}
                    >
                      Edytuj
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }: { active: any }) => (
                    <button
                      onClick={() => setRemoveModal(true)}
                      className={`${active ? 'bg-red-500 text-white' : 'text-red-500'
                        } group flex w-full items-center rounded-lg px-2 py-2 text-sm`}
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

      <ContentPanel type={PanelType.CONTENT}>
        <Toolbar sort={false} filter={false} search={true} sortOptions={testSortOptions} searchPlaceholder='Szukaj użytkowników' />
        <Table data={students} columns={columns('students')}></Table>
      </ContentPanel>
    </ContentLayout>
  )
}
