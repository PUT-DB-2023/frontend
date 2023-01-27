import { Layout } from '../components/Layout'
import { LoginForm } from '../components/LoginForm'

export const Login = () => {
  return (
    <Layout title={'Logowanie'}>
      <LoginForm />
    </Layout>
  )
}