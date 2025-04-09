import DashboardLayout from '~/layouts/DashboardLayout'
import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import Exercise from '#models/exercise'
import Folder from '#models/folder'
import FolderComponent from '~/components/FolderComponent'
import ExerciseStoreModal from '~/components/modals/ExerciseStoreModal'
import FolderStoreModal from '~/components/modals/FolderStoreModal'
import FileDropModal from '~/components/modals/FileDropModal'

interface FolderProps {
  folder: Folder
}

export default function Show({ folder }: FolderProps) {
  const [list, setList] = useState<any[]>([])
  const [exercises, setExercises] = useState<Exercise[]>([...folder.exercises])
  const [folders, setFolders] = useState<Folder[]>([...folder.folders])

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
      <Head title={folder.name}/>
      <div className={'text-white text-2xl font-bold'}>
        <h1>Bienvenue sur votre espace ExoMaster, <span className={'text-blue-600'}>{folder.name}</span> !</h1>
        <h2 className={'text-xl font-bold'}>Dossier : {folder.name}</h2>
        <h2 className={'text-xl font-bold'}>Chemin : {folder.getPath()}</h2>
      </div>
      <FileDropModal exercises={exercises} setExercises={setExercises} actFolder={folder}/>

      <FolderComponent folder={folder} folderName={folder.name} path={['Home']} list={list} />

      <ExerciseStoreModal exercises={exercises} setExercises={setExercises} actFolder={folder}/>
      <FolderStoreModal folders={folders} setFolders={setFolders} actFolder={folder}/>

    </DashboardLayout>
  )
}
