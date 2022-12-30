import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import AuthContext from 'context/AuthContext'
import { queryClient } from 'lib/react-query'
import React from 'react'
import { ButtonType, PanelType } from 'types'
import { AddNewModal } from '../components/AddNewModal'
import { ServerList } from '../components/ServerList'

export const Servers = () => {
  const [showAdd, setShowAdd] = React.useState(false);
  const {authUser, checkPermission} = React.useContext(AuthContext)

  return (
    <ContentLayout>
      {checkPermission('database.add_server') && <AddNewModal show={showAdd} off={() => setShowAdd(false)} refetch={() => queryClient.refetchQueries(['servers'])} />}
      <ContentPanel type={PanelType.HEADER}>
        <span className='text-black text-3xl font-bold mb-4'>Serwery</span>
        {checkPermission('database.add_server') && <Button type={ButtonType.ACTION} text='Dodaj serwer' onClick={() => setShowAdd(true)} />}
      </ContentPanel>
      <ContentPanel type={PanelType.CONTENT}>
        {/* <h2 className='text-lg font-semibold'>Aktywne serwery</h2> */}
        <ServerList />
      </ContentPanel>
    </ContentLayout>
  )
}
