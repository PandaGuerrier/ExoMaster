import DashboardLayout from '~/layouts/DashboardLayout'
import { Head } from '@inertiajs/react'
import { InferPageProps } from '@adonisjs/inertia/types'
import SubjectsController from '#controllers/common/users/subjects_controller'
import { Button } from '@nextui-org/react'

export default function SubjectTeacher({ subjects }: InferPageProps<SubjectsController, 'index'>) {
  return (
    <DashboardLayout>
      <Head title="Création de sujet !"/>
      <div className={'space-y-5'}>


        <div className={'text-white text-2xl font-bold'}>
          Ici, vous trouverez tous les sujets que vous avez créé !
        </div>


        <div className={'flex text-white space-x-5'}>
          {
            subjects!.map((subject) => {
              return (
                <div key={subject.id} className={'text-white border p-5 rounded-md hover:bg-gray-800 duration-200 flex '}>
                  <div>
                    <div className={'font-bold'}>{subject.title}</div>
                    <div>{subject.description}</div>
                    <div className={"flex space-x-5 mt-5 "}>
                      <Button variant={'light'} color={'primary'} fullWidth href={'/subjects/' + subject.id + '/'} as={'a'}>Essayer</Button>
                      <Button variant={'light'} color={'primary'} fullWidth href={'/subjects/me/' + subject.id + '/'} as={'a'}>Modifier</Button>
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
