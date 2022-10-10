import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import { getEditions } from 'features/editions/api/getEditions'
import { EditionList } from 'features/editions/components/EditionList'
import { UserTable } from 'features/users/components/UserTable'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { ButtonType, EditionStatus, PanelType } from 'types'
import { addDbAccounts } from '../api/addDbAccounts'
import { getGroup } from '../api/getGroup'

// TODO Add the edition fetching to the edition list component

export const Group = () => {

  const { id } = useParams()

  const groupQuery = useQuery(['group', id], () => getGroup( id ))
  let students = null

  if (groupQuery.isLoading) {
    return (
      <ContentPanel type={PanelType.LARGE}> 
        <Spinner />
      </ContentPanel>
    );
  }
  else if (groupQuery.isError) {
    return (
      <div>
        Error!
      </div>
    );
  }
  else {
    students = groupQuery.data.students
  }

  const createDbAccounts = (groupId: Number, serverId : Number) => {
    const createDbAccountsQuery = useQuery(['dbAccountCreationStatus'], () => addDbAccounts(groupQuery.data.id, groupQuery.data.teacherEdition.edition.servers[0].id))

    console.log(createDbAccountsQuery.data)

  }

  const num = 1
  
  return (
    <ContentLayout>
        <ContentPanel type={PanelType.LARGE}> 
          <div className='flex-col'>
            <h1 className='text-black text-3xl font-bold mb-4'> Grupa { groupQuery.data.name }</h1>
            <h2 className='text-blue-900 font-semibold mb-8'> { groupQuery.data !== undefined ? groupQuery.data.students.length : '' } studentów </h2>
            <h3 className='text-slate-500 text-base text-justify'>{ groupQuery.data.day + " " + groupQuery.data.hour }</h3>
          </div>
          <div className='flex gap-4'>
            <Button onClick={ () => createDbAccounts(groupQuery.data.id, 1) } type={ButtonType.ACTION} text='Utwórz konta'/>
            <Button type={ButtonType.OUTLINE} text='Edytuj'/>
            <Button type={ButtonType.WARNING} text='Usuń'/>
          </div>
        </ContentPanel>

        <ContentPanel type={PanelType.LARGE}>
          <UserTable data={ students }></UserTable>
        </ContentPanel>
    </ContentLayout>
  )
}
