import DashboardLayout from '~/layouts/DashboardLayout'
import useAuth from '~/hooks/use_auth'

export default function DashboardHome() {
  const auth = useAuth()


  console.log(auth)
  return (
      <DashboardLayout>
        <h1 className={'text-2xl font-bold text-white'}>Bienvenue {auth.user.username}</h1>
      </DashboardLayout>
  )
}
