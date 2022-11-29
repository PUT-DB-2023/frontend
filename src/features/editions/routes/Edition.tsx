import { searchFunc } from 'api/searchApi';
import { sortFunc } from 'api/sortFilter';
import { Spinner } from 'components/Spinner';
import { Toolbar } from 'components/Toolbar';
import { Group } from 'features/groups/types';
import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { groupsSortOptions } from 'types';
import { getEdition } from '../api/getEdition';
import { getEditionGroups } from '../api/getEditionGroups';
import { GroupList } from '../components/GroupList';
import { Edition as TEdition } from '../types';

interface IEdition {
    editionData: TEdition;
}

export const Edition = () => {

    const { courseId, editionId } = useParams()

    const { data : selectedEditionData, status : selectedEditionStatus, refetch : selectedEditionRefetch } = useQuery<TEdition>(['selectedEdition', editionId], () => getEdition(editionId));
    const { data: groupData, status: groupStatus, refetch: groupRefetch } = useQuery(['editionGroups', editionId, selectedEditionData], () => getEditionGroups(editionId))

    const [sortBy, setSortBy] = React.useState(groupsSortOptions[0])
    const [filterBy, setFilterBy] = React.useState(null)
    const [search, setSearch] = React.useState('')

    const searchData = React.useMemo(() => searchFunc(search, groupData, ['day','hour','teacherEdition/teacher/first_name', 'teacherEdition/teacher/last_name']), [search, groupData]);
    const sortedGroups = React.useMemo<Group[]>(() => sortFunc(searchData, sortBy),[searchData, sortBy]);

    if (selectedEditionStatus == 'loading' || groupStatus == 'loading') {
        return (
          <div className='w-full h-full flex justify-center items-center'>
            <Spinner />
          </div>
        )
    }

    return (
        <>
            <div className='flex flex-col gap-4'>
                <h1 className='text-3xl font-bold'>
                    {selectedEditionData?.semester?.start_year.toString().concat(selectedEditionData?.semester?.winter ? " - Zima" : " - Lato")}
                </h1>
                <h2 className={`text-lg font-semibold ${selectedEditionData?.semester?.active ? 'text-blue-600' : 'text-red-500'}`}>
                    {selectedEditionData ? selectedEditionData?.semester?.active ? 'Aktywna' : 'Nieaktywna' : ''}
                </h2>
            </div>
            {selectedEditionData ?
                <>
                    <Toolbar sort={true} filter={true} search={true} sortOptions={groupsSortOptions} sortVal={sortBy} sortSet={setSortBy} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj grupy' />
                    <GroupList groupData={sortedGroups}></GroupList>
                </>
            : null}
        </>
    )
}

