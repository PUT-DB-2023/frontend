import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button';
import { ButtonType, PanelType, UserType } from 'types'

interface UsersProps {
    type: UserType;
}

export const Users = ({ type } : UsersProps) => {
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
    </ContentLayout>
  )
}
