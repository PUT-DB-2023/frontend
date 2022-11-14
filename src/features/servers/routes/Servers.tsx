import { ContentLayout, ContentPanel } from 'components'
import { Button } from 'components/Button'
import { Spinner } from 'components/Spinner'
import React from 'react'
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

  return (
    <ContentLayout>
      {/* <AddNewModal show={showAdd} off={() => setShowAdd(false)} refetch={serverRefetch} /> */}
      <ContentPanel type={PanelType.HEADER}>
        <span className='text-black text-3xl font-bold mb-4'>Serwery</span>
        <Button type={ButtonType.ACTION} text='Dodaj serwer' onClick={()=>setShowAdd(true)}/>
      </ContentPanel>

      <ContentPanel type={PanelType.CONTENT}>
        <Toolbar sort={true} filter={true} search={true} sortOptions={serversSortOptions} sortVal={sortBy} sortSet={setSortBy} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj serwera'/>
        {/* <h2 className='text-lg font-semibold'>Aktywne serwery</h2> */}
        <ServerList sortVal={sortBy} sortSet={setSortBy} searchVal={search} searchSet={setSearch}></ServerList>
      </ContentPanel>
    </ContentLayout>
  )
}
