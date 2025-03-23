import { Modal, ModalContent, useDisclosure } from '@nextui-org/modal'
import { Button, Card, CardBody, Input } from '@nextui-org/react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import Exercise from '#models/exercise'
import Folder from '#models/folder'

interface ExerciseStoreModalProps {
  exercises: Exercise[],
  setExercises: (exercises: Exercise[]) => void,
  actFolder: Folder | null
}

export default function ExerciseStoreModal({exercises, setExercises, actFolder}: ExerciseStoreModalProps) {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()

  const [error, setError] = useState<string | null>(null)

  const sendForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // @ts-ignore
    console.log(event.currentTarget.name.value)
    const response = await fetch('/exercises', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        // @ts-ignore
        name: event.currentTarget.name.value,
        language: event.currentTarget.language.value,
        description: event.currentTarget.description.value,
        parentId: actFolder ? actFolder.uuid : null
      })
    })
    const data: any = await response.json()
    console.log(data)

    if (!response.ok) {
      console.log(response)
      setError("Erreur lors de la création de l'exercises.")
      return
    }

    console.log(response)

    if (data.error) {
      console.log(data.error)
      setError("Erreur lors de la création de l'exercises.")
      return
    }
    setExercises([...(exercises as Exercise[]), data as Exercise])
    toast.success('Dossier créé.')
    onClose()
  }

  return (
    <>
      <Button onPress={() => {
        onOpen()
      }} color="primary" variant="shadow">
        Créer un exercice
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
                <CardBody className="overflow-hidden">
                  <form onSubmit={sendForm} className={"space-y-4"}>
                    <h1 className={"flex justify-center text-center text-3xl font-bold"}>Création d'un exercise !</h1>
                    <div>
                      {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                          <strong className="font-bold">Erreur !</strong>
                          <span className="block sm:inline">{error}</span>
                        </div>
                      )}
                    </div>
                    <div className={"flex space-x-5"}>
                    <Input
                      autoFocus
                      name="name"
                      label="Nom de l'exercice"
                      placeholder="Entrez le nom de l'exercice"
                      variant="bordered"
                      color={'primary'}
                      required
                    />
                    <Input
                      name="language"
                      label="Language de l'exercice"
                      placeholder="Python, Javascript, etc."
                      variant="bordered"
                      color={'primary'}
                      required
                    />
                    </div>
                    <Input
                      name="description"
                      label="Description de l'exercice"
                      placeholder="Entrez la description de l'exercice"
                      variant="bordered"
                      color={'primary'}
                      required
                    />



                    <Button type="submit" color="primary" variant="shadow" fullWidth>
                      Créer l'exercice
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
