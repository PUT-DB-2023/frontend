import { Button } from 'components/Button'
import { Field } from 'components/Field'
import React, { useState } from 'react'
import { ButtonType } from 'types'
import { login } from '../api/login'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='bg-white lg:w-[500px] md:w-[500px] w-full min-h-[300px] rounded-md shadow-md lg:p-14 md:p-14 p-10 flex flex-col justify-between'>
      <form className='flex flex-col justify-between gap-8'>
        <Field title={"Email"} value={email} setValue={setEmail} />
        <Field type='password' title={"Hasło"} value={password} setValue={setPassword} />
        <Button text='Zaloguj' type={ButtonType.ACTION} onClick={() => login({email: email, password:password})} />
      </form>
    </div>
    
  )
}
