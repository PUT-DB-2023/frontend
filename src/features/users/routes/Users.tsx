import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button';
import { Spinner } from 'components/Spinner';
import { useQuery } from 'react-query';
import { ButtonType, PanelType, UserType } from 'types'
import { getUsers } from '../api/getUsers';
import { UserTable } from '../components/UserTable';

interface UsersProps {
    type: UserType;
}

export const Users = ({ type } : UsersProps) => {
  const usersQuery = useQuery(['users', type], () => getUsers(type))

  if (usersQuery.isLoading) {
    return (
      <Spinner />
    );
  }

  console.log(type)
  return (
    <ContentLayout>
      <ContentPanel type={PanelType.LARGE}> 
        <span className='text-black text-3xl font-bold mb-4'>
            { 
                type === UserType.ADMIN ? 'Administratorzy' :
                type === UserType.TEACHER ? 'Dydaktycy' :
                type === UserType.STUDENT ? 'Studenci' : '' 
            }
        </span>
        <div className='flex gap-4'>
          <Button type={ButtonType.ACTION} text='Dodaj'/>
        </div>
      </ContentPanel>

      <ContentPanel type={PanelType.LARGE}>
        <UserTable data={ usersQuery.data }> </UserTable>
      </ContentPanel>
    </ContentLayout>
  )
}
