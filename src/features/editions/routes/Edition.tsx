import { searchFunc } from 'api/searchApi';
import { sortFunc } from 'api/sortFilter';
import { Loading } from 'components/Loading';
import { Toolbar } from 'components/Toolbar';
import { Group } from 'features/groups/types';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { groupsSortOptions } from 'types';
import { getEdition } from '../api/getEdition';
import { getEditionGroups } from '../api/getEditionGroups';
import { EditionGroupList } from '../components/EditionGroupList';
import { Edition as TEdition } from '../types';
import { InfoBoxDisclosure } from 'components/InfoBox';
import { Server } from 'features/servers';
import { descriptionClass } from 'features/groups/routes/Group';

interface IEdition {
    editionData: TEdition;
}

export const Edition = () => {

    const { courseId, editionId } = useParams()

    const { data: selectedEditionData, status: selectedEditionStatus, refetch: selectedEditionRefetch } = useQuery<TEdition>(['selectedEdition', editionId], () => getEdition(editionId));
    const { data: groupData, status: groupStatus, refetch: groupRefetch } = useQuery(['editionGroups', editionId, selectedEditionData], () => getEditionGroups(editionId))

    const [sortBy, setSortBy] = React.useState(groupsSortOptions[0])
    const [search, setSearch] = React.useState('')
console.log(groupData)
    const searchData = React.useMemo(() => searchFunc(search, groupData, ['day', 'hour', 'name', 'room', 'teacherEdition/teacher/user/first_name', 'teacherEdition/teacher/user/last_name']), [search, groupData]);
    const sortedGroups = React.useMemo<Group[]>(() => sortFunc(searchData, sortBy), [searchData, sortBy]);

    if (selectedEditionStatus == 'loading' || groupStatus == 'loading') {
        return <Loading />
    }

    return (
        <>
            <div className='flex flex-col gap-8'>
            <div className='flex flex-col gap-6'>
                <h1 className='text-3xl font-bold'>
                    {selectedEditionData ? selectedEditionData.semester.start_year.toString().concat('/').concat((selectedEditionData.semester.start_year + 1).toString()).concat(selectedEditionData.semester.winter ? " - Zima" : " - Lato") : 'Brak semestrów'}
                </h1>
                <div className={selectedEditionData?.semester?.active ? 'text-blue-600' : 'text-red-500'}>
                    <span className={descriptionClass}>{selectedEditionData ? selectedEditionData?.semester?.active ? 'Aktywna' : 'Nieaktywna' : ''}</span>
                </div>
            </div>
                <div className={`flex gap-3 flex-wrap`}>
                    {selectedEditionData?.servers.map((server: Server, index) => {
                        return (
                            <span className={descriptionClass}>{server.name}</span>
                        )
                    })}
                </div>
                {selectedEditionData?.description && <InfoBoxDisclosure children={selectedEditionData.description}/>}
            </div>
            {selectedEditionData ?
                <>
                    <Toolbar sort={true} filter={false} search={true} sortOptions={groupsSortOptions} sortVal={sortBy} sortSet={setSortBy} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj grupy' />
                    <EditionGroupList groupData={sortedGroups}></EditionGroupList>
                </>
                : null}
        </>
    )
}

