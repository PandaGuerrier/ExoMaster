import { Modal, ModalContent, useDisclosure } from '@nextui-org/modal'
import { Button, Card, CardBody } from '@nextui-org/react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import Exercise from '#models/exercise'
import Folder from '#models/folder'
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

export default function FileDropModal({ exercises, setExercises, actFolder }: ExerciseStoreModalProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const [isDragActive, setIsDragActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [importedFiles, setImportedFiles] = useState(0)
  const [maxFiles, setMaxFiles] = useState(0)

  const uploadFilesToBackend = async (files: File[]) => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms)); // Helper function for delay
    setMaxFiles(files.length);

    for (const file of files) {
      await delay(1500); // Wait for 1 second before processing the next file

      const formData = new FormData();
      formData.append('file', file);

      const name = file.name;
      const content = await file.text();

      try {
        const response = await fetch('/exercises', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: name.split('.').shift(),
            // @ts-ignore
            language: fileTypes[name.split('.').pop()] || 'txt',
            description: 'Pas de description',
            code: content,
            parentId: actFolder ? actFolder.uuid : null
          })
        });

        const data: any = await response.json();

        if (!response.ok || data.error) {
          throw new Error('Erreur lors de la création de l\'exercises.');
        }

        setExercises([...(exercises as Exercise[]), data as Exercise]);
        toast.success(`Fichier "${name}" importé avec succès.`);
      } catch (err) {
        console.error(err);
        setError(`Erreur lors de l'importation du fichier "${name}".`);
      }

      console.log('File uploaded:', file.name);
      setImportedFiles(prev => prev + 1);

      if (importedFiles >= files.length) {
        setLoading(false);
        setImportedFiles(0);
        setError(null);
        onClose();
      }
    }
  };
  const onDrop = (acceptedFiles: File[]) => {
    console.log('Accepted files:', acceptedFiles)
    setLoading(true)
    uploadFilesToBackend(acceptedFiles)
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
    noClick: true,
    multiple: true, // Allow multiple files
    webkitdirectory: true // Enable directory support
  })

  return (
    <>
      <Button onPress={onOpen} color="primary" variant="shadow">
        Importer un fichier ou dossier
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
                  {
                    loading ? (
                      <div className="flex flex-col items-center justify-center h-full">
                        <p>Importation en cours...</p>
                        <p>{importedFiles}/{maxFiles} fichiers importés</p>
                      </div>
                    ) : (
                      <div {...getRootProps()} className={`flex flex-col items-center justify-center h-full ${isDragActive ? 'border-2 border-blue-500' : ''}`}>
                        <input {...getInputProps()} />
                        <p>Glissez et déposez vos fichiers ici, ou cliquez pour sélectionner des fichiers</p>
                      </div>
                    )
                  }
                </CardBody>
              </Card>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
