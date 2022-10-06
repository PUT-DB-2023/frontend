import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button';
import { ButtonType, PanelType, UserType } from 'types'
import { UserTable } from '../components/UserTable';

interface UsersProps {
    type: UserType;
}

export const Users = ({ type } : UsersProps) => {

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
        <UserTable type={ type }></UserTable>
      </ContentPanel> 
    </ContentLayout>
  )
}
