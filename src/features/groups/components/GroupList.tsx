import { searchFunc } from 'api/searchApi';
import { sortFunc } from 'api/sortFilter';
import { Box } from 'components';
import { Loading } from 'components/Loading';
import { Toolbar } from 'components/Toolbar';
import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { groupsSortOptions } from 'types';
import { getGroups } from '../api/getGroups';
import { Group } from '../types';

export const GroupList = () => {
  const [sortBy, setSortBy] = React.useState(groupsSortOptions[0])
  const [search, setSearch] = React.useState('');

  const { data: groupData, status: groupStatus, refetch: groupRefetch } = useQuery(['groups'], getGroups)

  const searchData = React.useMemo(() => searchFunc(search, groupData, ['name', 'day', 'hour', 'teacherEdition/edition/course/name', 'teacherEdition/edition/semester/start_year']), [search, groupData]);
  const sortedGroups = React.useMemo(() => sortFunc(searchData, sortBy), [searchData, sortBy]);

  if (groupStatus == 'loading') {
    return <Loading />
  }

  return (
    <div className='flex flex-col gap-8'>
      <Toolbar sort={true} filter={false} search={true} sortOptions={groupsSortOptions} sortVal={sortBy} sortSet={setSortBy} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj grupy' />
      <div className='w-full'>
        {groupData.length == 0 ?
          <div className='w-full h-full flex justify-center items-center p-10 font-semibold text-xl'> Brak Grup </div> :
          sortedGroups.map((group: Group) => {
            return (
              <Link key={group.id} to={'/groups/' + group.id}>
                <Box>
                  <span className='font-semibold text-xl'>{group?.name}</span>
                  <div className='flex flex-col'>
                    <span className='font-normal text-base'>{group?.teacherEdition?.edition?.course?.name} - {group?.teacherEdition?.edition?.semester?.start_year}/{group?.teacherEdition?.edition?.semester?.start_year + 1} {group?.teacherEdition?.edition?.semester?.winter ? "Zima" : "Lato"}</span>
                    <span className='font-normal text-base'>
                      {group.day} {group.hour}
                    </span>
                  </div>
                </Box>
              </Link>
            )
          })}
      </div>
    </div>
  )
}
