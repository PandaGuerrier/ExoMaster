import useAuth from '~/hooks/use_auth'
import DashboardLayout from '~/layouts/DashboardLayout'
import { Head } from '@inertiajs/react'
import { InferPageProps } from '@adonisjs/inertia/types'
import SubjectsController from '#controllers/common/users/subjects_controller'
import Exercise from '#models/exercise'
import { Button } from '@nextui-org/react'

export default function SubjectIndex({subjects}: InferPageProps<SubjectsController, 'index'>) {
  const auth = useAuth()
  console.log(auth)
  console.log(subjects.map((subject) => subject.defaultSubject.title))

  return (
    <DashboardLayout>
      <Head title={'Sujets'}/>
      <div className={'space-y-5'}>


        <div className={'text-white text-2xl font-bold'}>
          Ici, vous trouverez tous les sujets où vous avez été assignés !
        </div>

        <div className={'flex text-white space-x-5'}>
          {
            subjects.map((subject, index) => {
              const exercisesFinish = subject.exercises.filter((exercise: Exercise) => exercise.isFinish)
              const isFinish = exercisesFinish.length === subject.exercises.length

              return (
                <div key={index} className={'text-white border border-gray-500 p-5 rounded-md hover:bg-gray-800 duration-200 flex'}>
                  <div>
                    <div className={'font-bold'}>{subject.defaultSubject.title}</div>
                    <div>{subject.defaultSubject.description}</div>
                    <Button className={'mt-5'} variant={'light'} color={'primary'} fullWidth href={'/subjects/' + subject.id} as={'a'}>Commencer</Button>
                  </div>
                  <div className={'font-bold ' + (isFinish ? 'text-green-500' : 'text-gray-50')}>{exercisesFinish.length}/{subject.exercises.length}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    </DashboardLayout>
  )
}
