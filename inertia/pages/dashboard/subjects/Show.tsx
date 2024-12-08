import DashboardLayout from '~/layouts/DashboardLayout'
import { Head } from '@inertiajs/react'
import { InferPageProps } from '@adonisjs/inertia/types'
import SubjectsController from '#controllers/common/users/subjects_controller'
import Exercise from '#models/exercise'
import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import FlipNumbers from "react-flip-numbers";

// @ts-ignore
export default function SubjectShow({ subject }: InferPageProps<SubjectsController, 'show'>) {
  const [totalExercises, setTotalExercises] = useState<number>(0)
  const [play, setPlay] = useState<boolean>(false)


  useEffect(() => {
    const total = subject!.exercises.map((exercise: Exercise) => exercise.isFinish ? 0 : 1).reduce((a: any, b: any) => a + b, 0)
    setTotalExercises(total)

    setTimeout(() => {
      setPlay(true)
    }, 1000)
  });

  return (
    <DashboardLayout>
      <Head title={subject!.defaultSubject.title}/>
      <div className={'space-y-5'}>


        <div className={'flex text-white text-xl md:text-3xl font-bold text-center justify-center'}>
          Vous avez
          <FlipNumbers
          height={40}
          width={40}
          color="white"
          background="transparent"
          numberStyle={{ fontSize: '1.5rem' }}
          play={play}
          perspective={400}
          numbers={String(totalExercises)}
        /> exercice{totalExercises > 1 ? 's' : ''} à faire
        </div>

        <div className={'flex flex-wrap text-white justify-center gap-3 overflow-y-auto h-[80vh]'}>
          {
            subject!.exercises.map((exercise: Exercise) => {
              return (
                <div key={exercise.id} className={'text-white border p-5 rounded-md hover:bg-zinc-800 duration-200 flex h-[20vh] md:h-[18vh]  w-[50vh] ' + (exercise.isFinish ? 'border-green-500' : 'border-red-500')}>
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
