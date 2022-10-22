import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button';
import { Spinner } from 'components/Spinner';
import { Table } from 'components/Table';
import { Toolbar } from 'components/Toolbar';
import { useQuery } from 'react-query';
import { ButtonType, PanelType, UserType } from 'types'
import { getUsers } from '../api/getUsers';
import { UserTable } from '../components/UserTable';

interface UsersProps {
    type: UserType;
}

export const Users = ({ type } : UsersProps) => {
  const usersQuery = useQuery(['users', type], () => getUsers(type))

  console.log(usersQuery.data)

  if (usersQuery.isLoading) {
    return (
      <Spinner />
    );
  }

  console.log(type)
  return (
    <ContentLayout>
      <ContentPanel type={PanelType.HEADER}>
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

      <ContentPanel type={PanelType.CONTENT}>
        <Toolbar searchPlaceholder='Szukaj użytkownika' />
        <Table data={usersQuery.data}> </Table>
      </ContentPanel>
    </ContentLayout>
  )
}
