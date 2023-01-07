import { objectMap } from 'api/objectMap'
import { Button } from 'components/Button'
import { Field } from 'components/Field'
import AuthContext from 'context/AuthContext'
import { User } from 'features/users'
import { useAuthContext } from 'hooks/useAuthContext'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { ButtonType } from 'types'
import { login } from '../api/login'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const defaultMsg = { email: '', password: '' }
  const [errorMsg, setErrorMsg] = React.useState(defaultMsg);

  const {authUser, setAuthUser} = useContext(AuthContext)

  const navigate = useNavigate()

  const validate = React.useCallback(() => {
    let correct = true;

    if (email.length === 0) {
        setErrorMsg(prevState => ({ ...prevState, 'email': 'Pole wymagane' }));
        correct = false;
    }

    if (password.length === 0) {
        setErrorMsg(prevState => ({ ...prevState, 'password': 'Pole wymagane' }));
        correct = false;
    }

    let sum = 0;
    objectMap(errorMsg, (v: any) => sum += v.length)

    return correct && sum === 0;
  }, [email, password])


  // TODO MOVE TO SEPARATE API FILE
  const handleLogin = React.useCallback(async () => {
    if (!validate()) {
        return;
    }
    const res = await login({ email: email, password: password });
    if (res) {

      localStorage.setItem('auth_user', JSON.stringify(res.user))

      const authenticatedUser: User = JSON.parse(localStorage.getItem('auth_user') || "")

      setAuthUser(authenticatedUser)
      navigate(`/`)
    }
  }, [email, password])

  return (
    <div className='bg-white flex flex-col lg:p-14 md:p-14 px-6 py-10 lg:w-[500px] md:w-[500px] w-full rounded-md shadow-md'>
      <div className='flex flex-col justify-between gap-8'>
        <Field type='email' title={"Email"} value={email} setValue={setEmail} autoFocus={true} errorMsg={errorMsg['email']} setErrorMsg={(e: string) => setErrorMsg({ ...errorMsg, 'email': e })}/>
        <Field type='password' title={"Hasło"} value={password} setValue={setPassword} autoFocus={true} errorMsg={errorMsg['password']} setErrorMsg={(e: string) => setErrorMsg({ ...errorMsg, 'password': e })}/>
        <Button text='Zaloguj' type={ButtonType.ACTION} onClick={() => handleLogin()} />
      </div>
    </div>
    
  )
}
