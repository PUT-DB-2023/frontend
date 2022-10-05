import { ContentLayout, ContentPanel } from 'components'
import React from 'react'
import { ButtonType, PanelType } from 'types'
import { UserTypeList } from '../components/UserTypeList'

export const UserTypes = () => {
  return (
    <ContentLayout>
      <ContentPanel type={PanelType.LARGE}> 
          <span className='text-black text-3xl font-bold mb-4'>Użytkownicy</span>
        </ContentPanel>
        <UserTypeList></UserTypeList>
    </ContentLayout>
  )
}
