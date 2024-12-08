import DashboardLayout from '~/layouts/DashboardLayout'
import { Head } from '@inertiajs/react'
import { InferPageProps } from '@adonisjs/inertia/types'
import SubjectsController from '#controllers/common/users/subjects_controller'
import Exercise from '#models/exercise'
import { Button } from '@nextui-org/react'
import FlipNumbers from 'react-flip-numbers'
import { useEffect, useState } from 'react'

export default function Index({subjects}: InferPageProps<SubjectsController, 'index'>) {
  const [totalExercises, setTotalExercises] = useState<number>(0)
  const [play, setPlay] = useState<boolean>(false)


  useEffect(() => {
    const finishedSubjects = subjects!.filter((subject) => {
      return subject.exercises.every((exercise: Exercise) => exercise.isFinish)
    }).length

    setTotalExercises(finishedSubjects)

    setTimeout(() => {
      setPlay(true)
    }, 1000)
  });
  return (
    <DashboardLayout>
      <Head title={'Sujets'}/>
      <div className={'space-y-5'}>


        <div className={'flex text-white text-xl md:text-3xl font-bold text-center justify-center'}>
          Vous avez
          <FlipNumbers
            height={40}
            width={40}
            color="white"
            duration={10}
            background="transparent"
            numberClassName={'text-white text-2xl md:text-3xl font-bold'}
            play={play}
            perspective={400}
            numbers={String(totalExercises)}
          /> /{subjects.length} sujet{totalExercises > 1 ? 's' : ''} fini{totalExercises > 1 ? 's' : ''}
        </div>

        <div className={'flex text-white space-x-5'}>
          {
            subjects.map((subject, index) => {
              const exercisesFinish = subject.exercises.filter((exercise: Exercise) => exercise.isFinish)
              const isFinish = exercisesFinish.length === subject.exercises.length

              return (
                <div key={index}
                     className={'text-white border border-gray-500 p-5 rounded-md hover:bg-gray-800 duration-200 flex'}>
                  <div>
                    <div className={'font-bold'}>{subject.defaultSubject.title}</div>
                    <div>{subject.defaultSubject.description}</div>
                    <Button className={'mt-5'} variant={'light'} color={'primary'} fullWidth
                            href={'/subjects/' + subject.id} as={'a'}>Commencer</Button>
                  </div>
                  <div
                    className={'font-bold ' + (isFinish ? 'text-green-500' : 'text-gray-50')}>{exercisesFinish.length}/{subject.exercises.length}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    </DashboardLayout>
  )
}
