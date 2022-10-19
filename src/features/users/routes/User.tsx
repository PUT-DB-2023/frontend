import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ButtonType, PanelType, UserType } from 'types'
import { getUser } from '../api/getUser'
import { UserInfo } from '../components/UserInfo'

export const User = () => {
  const { id } = useParams()
  const userQuery = useQuery(['user', id], () => getUser( id ))

  console.log(userQuery.data)

  if (userQuery.isLoading) {
    return (
      <Spinner />
    );
  }
  else if (userQuery.isError) {
    return (
      <div>
        Error!
      </div>
    );
  }

  return (
    <ContentLayout>
      <ContentPanel type={PanelType.HEADER}> 
            <span className='text-black text-3xl font-bold mb-4'> { userQuery.data.first_name + " " + userQuery.data.last_name} </span>
          <div className='flex gap-4'>
              <Button type={ButtonType.OUTLINE} text='Edytuj'/>
              <Button type={ButtonType.WARNING} text='Usuń'/>
          </div>
        </ContentPanel>
        <ContentPanel type={PanelType.HEADER}>
          <UserInfo userData={userQuery.data} />
        </ContentPanel>
    </ContentLayout>
  )
}
