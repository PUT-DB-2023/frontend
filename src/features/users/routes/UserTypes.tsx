import { ContentLayout, ContentPanel } from 'components'
import React from 'react'
import { ButtonType, PanelType } from 'types'
import { UserTypeList } from '../components/UserTypeList'

export const UserTypes = () => {
  React.useEffect(() => {document.title = `Użytkownicy`},[])
  return (
    <ContentLayout>
      <ContentPanel type={PanelType.HEADER}> 
          <span className='text-black text-3xl font-bold mb-4'>Użytkownicy</span>
        </ContentPanel>

        <ContentPanel type={PanelType.CONTENT}>
          <UserTypeList />
        </ContentPanel>
    </ContentLayout>
  )
}
