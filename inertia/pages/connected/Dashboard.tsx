import useAuth from '~/hooks/use_auth'
import DashboardLayout from '~/layouts/DashboardLayout'
import { Head } from '@inertiajs/react'

export default function DashboardHome() {
  const auth = useAuth()
  console.log(auth)
  return (
    <DashboardLayout>
        <Head title={"Dashboard"} />
        <div className={'text-white text-2xl font-bold'}>
          Bienvenue sur votre espace ExoMaster, <span className={'text-blue-600'}>{auth.user?.username}</span> !
        </div>
    </DashboardLayout>
  )
}
