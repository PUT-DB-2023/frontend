import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import AuthContext from 'context/AuthContext'
import { queryClient } from 'lib/react-query'
import React from 'react'
import { ButtonType, PanelType } from 'types'
import { AddNewModal } from '../components/AddNewModal'
import { MajorList } from '../components/MajorList'

export const Majors = () => {
  const [showAdd, setShowAdd] = React.useState(false);
  const { checkPermission } = React.useContext(AuthContext)
  React.useEffect(() => { document.title = `Kierunki` }, [])

  return (
    <ContentLayout>
      {checkPermission('database.add_major') && <AddNewModal show={showAdd} off={() => setShowAdd(false)} refetch={() => queryClient.refetchQueries(['majors'])} />}
      <ContentPanel type={PanelType.HEADER}>
        <span className='text-black text-3xl font-bold mb-4'>Kierunki</span>
        {checkPermission('database.add_major') && <Button type={ButtonType.ACTION} text='Dodaj kierunek' onClick={() => setShowAdd(true)} />}
      </ContentPanel>
      <ContentPanel type={PanelType.CONTENT}>
        <MajorList />
      </ContentPanel>
    </ContentLayout>
  )
}