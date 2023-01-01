import { ContentLayout, ContentPanel } from 'components';
import { PanelType } from 'types';
import { GroupList } from '../components/GroupList';

export const Groups = () => {
    React.useEffect(() => {document.title = `Grupy`},[])
    return (
        <ContentLayout>
          <ContentPanel type={PanelType.HEADER}>
            <span className='text-black text-3xl font-bold mb-4'>Grupy</span>
          </ContentPanel>
    
          <ContentPanel type={PanelType.CONTENT}>
            <GroupList />
          </ContentPanel>
        </ContentLayout>
      )
}