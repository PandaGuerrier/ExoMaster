import useAuth from '~/hooks/use_auth'
import DashboardLayout from '~/layouts/DashboardLayout'
import { Head } from '@inertiajs/react'
import Exercise from '#models/exercise'
import ExerciseStoreModal from '~/components/auth/ExerciseStoreModal'

export default function Index() {
  const auth = useAuth()
  console.log(auth)
  return (
    <DashboardLayout>
        <Head title={"Dashboard"} />
        <div className={'text-white text-2xl font-bold'}>
          Bienvenue sur votre espace ExoMaster, <span className={'text-blue-600'}>{auth.user?.username}</span> !
        </div>

      <div>
        {
          auth.user.exercises.map((exercise: Exercise) => {
            return (
              <div key={exercise.id}>
                <div>{exercise.name}</div>
                <div>{exercise.description}</div>
              </div>
            )
          })
        }
      </div>

    <ExerciseStoreModal />
    </DashboardLayout>
  )
}
