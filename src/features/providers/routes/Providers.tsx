import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import AuthContext from 'context/AuthContext'
import { queryClient } from 'lib/react-query'
import React from 'react'
import { ButtonType, PanelType } from 'types'
import { AddNewModal } from '../components/AddNewModal'
import { ProviderList } from '../components/ProviderList'

export const Providers = () => {
  const [showAdd, setShowAdd] = React.useState(false);
  const {authUser, checkPermission} = React.useContext(AuthContext)
  React.useEffect(() => {document.title = `Systemy bazodanowe`},[])

  return (
    <ContentLayout>
      {checkPermission('database.add_provider') && <AddNewModal show={showAdd} off={() => setShowAdd(false)} refetch={() => queryClient.refetchQueries(['providers'])} />}
      <ContentPanel type={PanelType.HEADER}>
        <span className='text-black text-3xl font-bold mb-4'>Systemy bazodanowe</span>
        {checkPermission('database.add_provider') && <Button type={ButtonType.ACTION} text='Dodaj system' onClick={() => setShowAdd(true)} />}
      </ContentPanel>
      <ContentPanel type={PanelType.CONTENT}>
        <ProviderList />
      </ContentPanel>
    </ContentLayout>
  )
}
