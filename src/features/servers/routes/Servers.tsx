import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import React, { useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { ButtonType, PanelType, Status } from 'types'
import { getServers } from '../api/getServers'
import { ServerList } from '../components/ServerList'
import { AddNewModal } from '../components/AddNewModal'
import { Toolbar } from 'components/Toolbar'
import { Menu } from '@headlessui/react'
import { DotsHorizontalIcon } from '@heroicons/react/solid'
import { serversSortOptions } from 'types'
import { sortFunc } from 'api/sortFilter'
import { searchFunc } from 'api/searchApi'

export const Servers = () => {
  const [showAdd, setShowAdd] = React.useState(false);
  const [sortBy, setSortBy] = React.useState(serversSortOptions[0]);
  const [filterBy, setFilterBy] = React.useState(null);
  const [search, setSearch] = React.useState('');

  const [showActiveOnly, setShowActiveOnly] = useState<boolean | undefined>(true) // show only active courses (true - active only, undefined - all courses)
  const { data: serverData, status: serverStatus, refetch: serverRefetch } = useQuery(['servers', showActiveOnly], () => getServers({active: showActiveOnly}));

  const searchData = useMemo(() => searchFunc(search, serverData, ['name']), [search, serverData]);
  const sortedServers = useMemo(() => sortFunc(searchData, sortBy), [searchData, sortBy]);

  const nonActiveLast = React.useCallback((data: any[]) => {
    const active = data?.filter(i => i?.active);
    const nonActive = data?.filter(i => !i?.active);
    return active?.concat(nonActive);
  }, []);

  React.useEffect(() => {document.title = `Serwery`},[])

  const activeSorted = nonActiveLast(sortedServers);

  if (serverStatus == 'loading') {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <ContentLayout>
      <AddNewModal show={showAdd} off={() => setShowAdd(false)} refetch={serverRefetch} />
      <ContentPanel type={PanelType.HEADER}>
        <span className='text-black text-3xl font-bold mb-4'>Serwery</span>
        <Button type={ButtonType.ACTION} text='Dodaj serwer' onClick={() => setShowAdd(true)} />
      </ContentPanel>

      <ContentPanel type={PanelType.CONTENT}>
        <Toolbar sort={true} filter={false} search={true} sortOptions={serversSortOptions} sortVal={sortBy} sortSet={setSortBy} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj serwera' />
        {/* <h2 className='text-lg font-semibold'>Aktywne serwery</h2> */}
        <ServerList serverData={activeSorted}></ServerList>
        {activeSorted.length !== 0 ? <Button type={ButtonType.LOAD_HIDDEN} text={showActiveOnly ? 'Pokaż nieaktywne' : 'Schowaj nieaktywne'} onClick={() => { setShowActiveOnly(showActiveOnly ? undefined : true) }} /> : null}
      </ContentPanel>
    </ContentLayout>
  )
}
