import { objectMap } from 'api/objectMap'
import { Button } from 'components/Button'
import { Field } from 'components/Field'
import AuthContext from 'context/AuthContext'
import { useAuthContext } from 'hooks/useAuthContext'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { AuthUserInfo, ButtonType } from 'types'
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
      const authUserInfo = {
          id: '1',
          first_name: 'FIRST_NAME',
          last_name: 'LAST_NAME',
          role: 'ROLE'
      }

      localStorage.setItem('auth_user', JSON.stringify(authUserInfo))

      const authenticatedUser: AuthUserInfo = JSON.parse(localStorage.getItem('auth_user') || "")

      setAuthUser(authenticatedUser)
      navigate(`/`)
    }
  }, [email, password])

  return (
    <div className='bg-white lg:w-[500px] md:w-[500px] w-full min-h-[300px] rounded-md shadow-md lg:p-14 md:p-14 p-10 flex flex-col justify-between'>
      <div className='flex flex-col justify-between gap-8'>
        <Field title={"Email"} value={email} setValue={setEmail} autoFocus={true} errorMsg={errorMsg['email']} setErrorMsg={(e: string) => setErrorMsg({ ...errorMsg, 'email': e })}/>
        <Field type='password' title={"Hasło"} value={password} setValue={setPassword} autoFocus={true} errorMsg={errorMsg['password']} setErrorMsg={(e: string) => setErrorMsg({ ...errorMsg, 'password': e })}/>
        <Button text='Zaloguj' type={ButtonType.ACTION} onClick={() => handleLogin()} />
      </div>
    </div>
    
  )
}
