import { Spinner } from './Spinner'

export const Loading = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
      <Spinner />
    </div>
  )
}