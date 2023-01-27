import { searchFunc } from 'api/searchApi'
import { Loading } from 'components/Loading'
import { Table } from 'components/Table'
import { Toolbar } from 'components/Toolbar'
import React from 'react'
import { useQuery } from 'react-query'
import { UserType } from 'types'
import { getUsers } from '../api/getUsers'
import { usersColumns } from '../routes/Users'

interface IUserList {
    type: UserType;
}

export const UserList = ({ type }: IUserList) => {
    const { data: usersData, status: usersStatus, refetch: usersRefetch } = useQuery(['users', type], () => getUsers(type))
    const baseUrl = type === UserType.ADMIN ? '' : type === UserType.TEACHER ? 'teachers/' : type === UserType.STUDENT ? 'students/' : ''
    const [search, setSearch] = React.useState('');
    const searchData = React.useMemo(() => searchFunc(search, usersData, ['student_id', 'user/first_name', 'user/last_name', 'user/email']), [search, usersData]);

    if (usersStatus === 'loading') {
        return <Loading />
    }

    return (
        <div className='flex flex-col gap-8 justify-center items-center'>
            <Toolbar sort={false} filter={false} search={true} searchVal={search} searchSet={setSearch} searchPlaceholder='Szukaj użytkownika' />
            <Table data={searchData} columns={usersColumns(type, baseUrl)} />
        </div>
    )
}