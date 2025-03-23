import { Modal, ModalContent, useDisclosure } from '@nextui-org/modal'
import { Button, Card, CardBody, Input } from '@nextui-org/react'
import Folder from '#models/folder'
import React, { useState } from 'react'
import { toast } from 'sonner'

interface FolderStoreModalProps {
  folders: Folder[],
  setFolders: (folders: Folder[]) => void,
  actFolder: Folder | null
}

export default function FolderStoreModal({folders, setFolders, actFolder}: FolderStoreModalProps) {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
  const [error, setError] = useState<string | null>(null)

  const sendForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // @ts-ignore
    console.log(event.currentTarget.name.value)
    const response = await fetch('/folders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        // @ts-ignore
        name: event.currentTarget.name.value,
        parentId: actFolder ? actFolder.uuid : null
      })
    })
    const data: any = await response.json()
    console.log(data)

    if (!response.ok) {
      console.log(response)
      setError('Erreur lors de la création du dossier.')
      return
    }

    console.log(response)


    if (data.error) {
      console.log(data.error)
      setError('Erreur lors de la création du dossier.')
      return
    }
    setFolders([...(folders as Folder[]), data as Folder])
    toast.success('Dossier créé.')
    onClose()
  }
  return (
    <>
      <Button onPress={() => {
        onOpen()
      }} color="primary" variant="shadow">
        Créer un dossier
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
                  <form onSubmit={sendForm} className={'space-y-4'}>
                    <div className={'flex space-x-5'}>
                      <Input
                        autoFocus
                        name="name"
                        label="Nom du dossier"
                        placeholder="Entrez le nom du dossier"
                        variant="bordered"
                        color={error ? 'danger' : 'primary'}
                        errorMessage={error}
                        required
                      />

                      <Button type="submit" color="primary" variant="shadow" fullWidth>
                        {'->'}
                      </Button>
                    </div>
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
