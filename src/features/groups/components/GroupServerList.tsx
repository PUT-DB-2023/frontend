import { Box } from 'components'
import { Server } from 'features/servers'

export const GroupServerList = (serverData: Server[]) => {
  return (
    <div className='flex w-full flex-wrap gap-4'>
      {serverData.map(function (server: Server) {
        return (
          <Box>
            <span className='font-semibold text-xl'> {server.name} </span>
          </Box>
        )
      })}
    </div>
  )
}