import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import { getEditions } from 'features/editions/api/getEditions'
import { EditionList } from 'features/editions/components/EditionList'
import { GroupList } from 'features/editions/components/GroupList'
import { ServerList } from 'features/servers/components/ServerList'
import { UserTable } from 'features/users/components/UserTable'
import { getgroups } from 'process'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ButtonType, EditionStatus, PanelType } from 'types'
import { addDbAccounts } from '../api/addDbAccounts'
import { getGroup } from '../api/getGroup'
import { GroupServerList } from '../components/GroupServerList'
import { ServerListModal } from '../components/ServerListModal'

// TODO Add the edition fetching to the edition list component

export const Group = () => {

  const { id } = useParams()
  const { data : groupData, status : groupStatus, refetch : groupRefetch } = useQuery(['group', id], () => getGroup( id ))
  const [newModal, setNewModal] = useState(false);

  const { data : dbAccoutCreationData, status: dbAccoutCreationStatus, refetch : dbAccoutCreationRefetch } = useQuery(['dbAccountCreation'],
    () => addDbAccounts(groupData.id, groupData.teacherEdition.edition.servers[0].id), {
    refetchOnWindowFocus: false,
    enabled: false // disable this query from automatically running
  })
  let students = null
  let servers = null
  console.log(groupData)

  if (groupStatus === 'loading') {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }
  else {
    students = groupData.students
    console.log(groupData)
    servers = groupData.teacherEdition.edition.servers
  }

  const createDbAccounts = (groupId: Number, serverId : Number) => {
    dbAccoutCreationRefetch()
  }

  return (
    <ContentLayout>
      <ServerListModal groupId={groupData.id} servers={servers} refetch={() => dbAccoutCreationRefetch()} show={newModal} off={() => setNewModal(false)} />
        <ContentPanel type={PanelType.HEADER}> 
          <div className='flex-col'>
            <h1 className='text-black text-3xl font-bold mb-4'> Grupa { groupData.name }</h1>
            <h2 className='text-blue-900 font-semibold mb-8'> { groupData !== undefined ? groupData.students.length : '' } studentów </h2>
            <h3 className='text-slate-500 text-base text-justify'>{ groupData.day + " " + groupData.hour }</h3>
          </div>
          <div className='flex gap-4'>
            {/* <Button onClick={ () => createDbAccounts(groupData.id, 1) } type={ButtonType.ACTION} text='Utwórz konta'/> */}
            <Button onClick={ () => setNewModal(true) } type={ButtonType.ACTION} text='Utwórz konta'/>
            <Button type={ButtonType.OUTLINE} text='Edytuj'/>
            <Button type={ButtonType.WARNING} text='Usuń'/>
          </div>
        </ContentPanel>

        <ContentPanel type={PanelType.HEADER}>
          <UserTable data={ students }></UserTable>
        </ContentPanel>
    </ContentLayout>
  )
}
