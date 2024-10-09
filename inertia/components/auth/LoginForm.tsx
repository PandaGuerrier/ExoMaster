import React, { useState } from 'react'
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { Checkbox, Input } from '@nextui-org/react'
import { Button } from '@nextui-org/button'
import { toast } from 'sonner'
import AlertComponent from '~/components/AlertComponent'

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [rememberMe, setRememberMe] = useState(false)

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          username: event.currentTarget.username.value,
          password: event.currentTarget.password.value,
          rememberMe: rememberMe,
        }),
      })
      const data = await response.json()
      console.log(data)

      if (!response.ok) {
          console.log(response)
          setError("Vos identifiants sont incorrects.")
          return;
      }

      console.log(response)

      if (data.error) {
        console.log(data.error)
        setError(data.error)
        return;
      }

      toast.success('Vous êtes connecté.')
      window.location.reload()
    }  catch (e: any) {
      console.log(e)
      setError("Vos identifiants sont incorrects.")
      return;
    }
  }

  return (
      <form onSubmit={login}>
        <ModalHeader  className="flex flex-col gap-1 items-center justify-center text-3xl">Login</ModalHeader>
        <AlertComponent message={error} />
        <ModalBody>
          <Input
              autoFocus
              name="username"
              label="Nom d'utilisateur"
              placeholder="Entrez votre nom d'utilisateur"
              variant="bordered"
              color={'primary'}
          />
          <Input
              label="Mot de passe"
              name="password"
              placeholder="Entrez votre mot de passe"
              type="password"
              variant="bordered"
              color={'primary'}
          />
          <div className="flex py-2 px-1 justify-between">
            <Checkbox
                isSelected={rememberMe}
                onValueChange={setRememberMe}
                classNames={{
                  label: 'text-small'
                }}
                color={'primary'}
            >
              Remember me
            </Checkbox>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button fullWidth color="primary" type="submit">
            Connexion
          </Button>
        </ModalFooter>
      </form>
  )

}
