import DashboardLayout from '~/layouts/DashboardLayout'
import { Head } from '@inertiajs/react'
import { InferPageProps } from '@adonisjs/inertia/types'
import SubjectsController from '#controllers/common/users/subjects_controller'
import TableExercise from '#ui/exercises/table-exercise.tsx'

// @ts-ignore
export default function Show({ subject }: InferPageProps<SubjectsController, 'showTeacher'>) {
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
          <TableExercise defaultExercises={subject.exercises} />
        </div>
      </div>
    </DashboardLayout>
  )
}
