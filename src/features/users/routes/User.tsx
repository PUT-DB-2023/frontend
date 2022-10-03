import { ContentLayout, ContentPanel } from 'components'
import React from 'react'
import { PanelType, UserType } from 'types'

export const User = () => {
  return (
    <ContentLayout>
      <ContentPanel type={PanelType.HEADER}> 
            <span className='text-black text-3xl font-bold mb-4'> Profil Użytkownika </span>
        </ContentPanel>
    </ContentLayout>
  )
}
