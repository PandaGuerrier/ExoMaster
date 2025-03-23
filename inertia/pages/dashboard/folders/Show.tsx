import DashboardLayout from '~/layouts/DashboardLayout'
import { Head } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import Exercise from '#models/exercise'
import Folder from '#models/folder'
import FolderComponent from '~/components/Folder'
import ExerciseStoreModal from '~/components/modals/ExerciseStoreModal'
import FolderStoreModal from '~/components/modals/FolderStoreModal'
import React from 'react'

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

      <FolderComponent folder={folder} folderName={folder.name} path={['Home']} list={list} setList={setList}/>

      <ExerciseStoreModal exercises={exercises} setExercises={setExercises} actFolder={folder}/>
      <FolderStoreModal folders={folders} setFolders={setFolders} actFolder={folder}/>

    </DashboardLayout>
  )
}
