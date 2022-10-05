import { ContentLayout, ContentPanel } from 'components';
import { Button } from 'components/Button';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ButtonType, PanelType } from 'types';
import { getEdition } from '../api/getEdition';
import { getEditionGroups } from '../api/getEditionGroups';
import { GroupList } from '../components/GroupList';

export const Edition = () => {

  const { id } = useParams()
  console.log(id)

  const editionQuery = useQuery('edition', () => getEdition( id ))

  if (editionQuery.isLoading) {
    return (
      <div>
        Loading..
      </div>
    );
  }
  else if (editionQuery.isError) {
    return (
      <div>
        Error!
      </div>
    );
  }
  
  return (
    <ContentLayout>
        <ContentPanel type={PanelType.LARGE}> 
          <div className='flex-col'>
            <h1 className='text-black text-3xl font-bold mb-4'>{ editionQuery.data.name }</h1>
            <h2 className='text-blue-900 font-semibold mb-8'>3 grupy</h2>
          </div>
          <div className='flex gap-4'>
            <Button type={ButtonType.OUTLINE} text='Edytuj'/>
            <Button type={ButtonType.WARNING} text='Usuń'/>
          </div>
        </ContentPanel>
        <GroupList></GroupList>
    </ContentLayout>
  )
}
