import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import React from 'react'
import { useQuery } from 'react-query'
import { ButtonType, PanelType } from 'types'
import { getServers } from '../api/getServers'
import { ServerList } from '../components/ServerList'
import { AddNewModal } from '../components/AddNewModal'
import { Toolbar } from 'components/Toolbar'

export const Servers = () => {
  const [showAdd, setShowAdd] = React.useState(false);
  const { data: serverData, status: serverStatus, refetch: serverRefetch } = useQuery(['servers'], getServers)

  if (serverStatus == 'loading') {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <ContentLayout>
      <AddNewModal show={showAdd} off={() => setShowAdd(false)} refetch={serverRefetch} />
      <ContentPanel type={PanelType.HEADER}>
        <span className='text-black text-3xl font-bold mb-4'>Serwery</span>
        <div className='flex gap-4'>
          <Button type={ButtonType.ACTION} text='Dodaj' onClick={() => setShowAdd(true)}/>
        </div>
      </ContentPanel>

      <ContentPanel type={PanelType.CONTENT}>
        <Toolbar />
        <ServerList serverData={serverData}></ServerList>
      </ContentPanel>
    </ContentLayout>
  )
}
