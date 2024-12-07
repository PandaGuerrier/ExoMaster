import DashboardLayout from '~/layouts/DashboardLayout'
import { Head } from '@inertiajs/react'
import { InferPageProps } from '@adonisjs/inertia/types'
import SubjectsController from '#controllers/common/users/subjects_controller'
import { Button } from '@nextui-org/react'
import DefaultExercise from '#models/default_exercise'

// @ts-ignore
export default function ShowTeacher({ subject }: InferPageProps<SubjectsController, 'showTeacher'>) {
  return (
    <DashboardLayout>
      <Head title={subject!.title}/>
      <div className={'space-y-5'}>


        <div className={'text-center text-white text-2xl font-bold'}>
          Voici le sujet: {subject!.title}
          <div className={"text-xl font-medium"}>
            {subject!.description}
          </div>
        </div>


        <div className={'flex flex-wrap text-white md:space-x-5 justify-center gap-3 overflow-y-auto h-[80vh]'}>
          {
            subject!.exercises.map((exercise: DefaultExercise) => {
              return (
                <div key={exercise.id} className={'text-white border p-5 rounded-md hover:bg-gray-800 duration-200 flex h-[20vh] md:h-[15vh]'}>
                  <div>
                    <div className={'font-bold'}>{exercise.title}</div>
                    <div>{exercise.description}</div>

                    <div className={"flex space-x-5 mt-5"}>
                      <Button variant={'light'} color={'primary'} fullWidth href={'/subjects/me/' + subject.id + '/' + exercise.id} as={'a'}>Modifier</Button>
                    </div>
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
