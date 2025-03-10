import { Modal, ModalContent, useDisclosure } from '@nextui-org/modal'
import { Button, Card, CardBody, Input } from '@nextui-org/react'

export default function ExerciseStoreModal() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure()

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
                  <form method="POST" action="/exercises" className={"space-y-4"}>
                    <h1 className={"flex justify-center text-center text-3xl font-bold"}>Création d'un exercise !</h1>
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
                      autoFocus
                      name="language"
                      label="Language de l'exercice"
                      placeholder="Python, Javascript, etc."
                      variant="bordered"
                      color={'primary'}
                      required
                    />
                    </div>
                    <Input
                      autoFocus
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
