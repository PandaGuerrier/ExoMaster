import useAuth from '~/hooks/use_auth'
import DashboardLayout from '~/layouts/DashboardLayout'
import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import Exercise from '#models/exercise'
import Folder from '#models/folder'
import FolderComponent from '~/components/Folder'
import ExerciseStoreModal from '~/components/modals/ExerciseStoreModal'
import FolderStoreModal from '~/components/modals/FolderStoreModal'
import FileDropModal from '~/components/modals/FileDropModal'

export default function Index() {
  const auth = useAuth()
  const [list, setList] = useState<any[]>([])
  const [exercises, setExercises] = useState<Exercise[]>([...auth.user.exercises])
  const [folders, setFolders] = useState<Folder[]>([...auth.user.folders])

  useEffect(() => {
    const initialList = [
      ...exercises.map(exercise => ({ ...exercise, type: 'exercise' })),
      ...folders.map(folder => ({ ...folder, type: 'folder' }))
    ]
    setList(initialList)
  }, [])

  useEffect(() => {
    const updatedList = [
      ...exercises.map(exercise => ({ ...exercise, type: 'exercise' })),
      ...folders.map(folder => ({ ...folder, type: 'folder' }))
    ]
    setList(updatedList)
  }, [exercises, folders])

  return (
    <DashboardLayout>
      <Head title={'Dashboard'}/>
      <div className={'text-white text-2xl font-bold'}>
        <h1>Bienvenue sur votre espace ExoMaster G, <span className={'text-blue-600'}>{auth.user?.username}</span> !</h1>
        <FileDropModal exercises={exercises} setExercises={setExercises} actFolder={null}/>
      </div>

      <FolderComponent folder={null} folderName={"Home"} path={['Home']} list={list} setList={setList}/>

      <ExerciseStoreModal exercises={exercises} setExercises={setExercises} actFolder={null}/>
      <FolderStoreModal folders={folders} setFolders={setFolders} actFolder={null}/>

    </DashboardLayout>
  )
}
