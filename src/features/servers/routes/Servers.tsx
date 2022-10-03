import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import React from 'react'
import { ButtonType, PanelType } from 'types'
import { ServerList } from '../components/ServerList'

export const Servers = () => {
  return (
    <ContentLayout>
      <ContentPanel type={PanelType.HEADER}> 
          <span className='text-black text-3xl font-bold mb-4'>Serwery</span>
          <div className='flex gap-4'>
            <Button type={ButtonType.ACTION} text='Dodaj'/>
          </div>
        </ContentPanel>
        <ServerList></ServerList>
    </ContentLayout>
  )
}
