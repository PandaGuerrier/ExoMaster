import { Modal, ModalContent, useDisclosure } from '@nextui-org/modal'
import { Button, Card, CardBody, Input, Select, SelectItem } from '@nextui-org/react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import Exercise from '#models/exercise'
import Folder from '#models/folder'
import FileDropZone from '~/components/FileDropZone'
import axios from 'axios'
import { useDropzone } from 'react-dropzone'

interface ExerciseStoreModalProps {
  exercises: Exercise[],
  setExercises: (exercises: Exercise[]) => void,
  actFolder: Folder | null
}

const fileTypes = {
  'py': 'python',
  'js': 'javascript',
  'dart': 'dart',
  'txt': 'txt'
}

export default function FileDropModal({exercises, setExercises, actFolder}: ExerciseStoreModalProps) {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const [download, setDownload] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = async (acceptedFiles: File[]) => {
    const formData = new FormData()
    formData.append('file', acceptedFiles[0])
    console.log('Uploading file:', acceptedFiles[0])
    // get file name, type and content
    const file = acceptedFiles[0]
    const reader = new FileReader()
    reader.onload = async (e) => {
      // @ts-ignore
      const text = e.target.result
      console.log('File content:', text)
    }
    reader.readAsText(file)
    const name = file.name
    const content = await file.text()

    const response = await fetch('/exercises', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        // @ts-ignore
        name: name.split('.').shift(),
        // @ts-ignore
        language: fileTypes[name.split('.').pop()] || 'txt',
        description: 'Pas de description',
        code: content,
        parentId: actFolder ? actFolder.uuid : null
      })
    })
    const data: any = await response.json()
    console.log(data)

    if (!response.ok) {
      console.log(response)
      setError('Erreur lors de la création de l\'exercises.')
      return
    }

    console.log(response)

    if (data.error) {
      console.log(data.error)
      setError('Erreur lors de la création de l\'exercises.')
      return
    }
    setExercises([...(exercises as Exercise[]), data as Exercise])
    toast.success('Dossier créé.')
    onClose()
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
    noClick: true // Disable click event
  })

  return (
    <>
      <Button onPress={() => {
        onOpen()
      }} color="primary" variant="shadow">
        Importer un fichier
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        size="2xl"
      >
        <ModalContent>
          {() => (
            <div className="flex flex-col w-full">
              <Card className="max-w-full">
                <CardBody className="overflow-hidden h-[50%]">
                  <div
                    {...getRootProps()}
                    className={`w-full h-full flex items-center justify-center ${isDragActive ? 'opacity-100' : 'opacity-50'}`}
                  >
                    Déposez votre fichier ici
                    <input {...getInputProps()} />
                  </div>
                </CardBody>
              </Card>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
