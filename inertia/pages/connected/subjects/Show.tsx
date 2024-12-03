import DashboardLayout from '~/layouts/DashboardLayout'
import { Head } from '@inertiajs/react'
import { InferPageProps } from '@adonisjs/inertia/types'
import SubjectsController from '#controllers/common/users/subjects_controller'
import Exercise from '#models/exercise'
import { Button } from '@nextui-org/react'

// @ts-ignore
export default function SubjectShow({ subject }: InferPageProps<SubjectsController, 'show'>) {
  return (
    <DashboardLayout>
      <Head title={subject!.defaultSubject.title}/>
      <div className={'space-y-5'}>


        <div className={'text-white text-2xl font-bold'}>
          Ici, vous trouverez tous les sujets où vous avez été assignés !
        </div>


        <div className={'flex text-white space-x-5'}>
          {
            subject!.exercises.map((exercise: Exercise) => {
              return (
                <div key={exercise.id} className={'text-white border p-5 rounded-md hover:bg-gray-800 duration-200 flex ' + (exercise.isFinish ? 'border-green-500' : 'border-red-500')}>
                  <div>
                    <div className={'font-bold'}>{exercise.defaultExercice.title}</div>
                    <div>{exercise.defaultExercice.description}</div>
                    <Button className={'mt-5'} variant={'light'} color={'primary'} fullWidth href={'/subjects/' + exercise.subjectId + '/exercises/' + exercise.id} as={'a'}>Commencer</Button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </DashboardLayout>
  )
}
