import React, { useState } from 'react'
import { ModalBody, ModalFooter, ModalHeader } from '@nextui-org/modal'
import { Button } from '@nextui-org/button'
import { toast } from 'sonner'
import InputPanda from '~/components/Input'

export type Errors = {
  [key: string]: {
    field: string
    message: string
  }
}

export default function RegisterForm() {
  const [errors, setErrors] = useState({} as Errors)

  function sortErrors(errors: any) {
    const errorsSorted = {}
    for (const errorIndex in errors) {
      const error = errors[errorIndex]

      // @ts-ignore
      errorsSorted[error.field] = {
        field: error.field,
        message: error.message
      }
    }

    setErrors(errorsSorted)
  }

  const register = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const request = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          username: event.currentTarget.username.value,
          password: event.currentTarget.password.value,
          repeat_password: event.currentTarget.repeat_password.value,
        }),
      })

      const response = await request.json()
      if (response.errors) {
        sortErrors(response.errors)
        console.log(errors)
        return;
      }

      console.log(response)
      toast.success("Welcome " + response.username, {
        position: "bottom-right",
        duration: 5000,
      })
    } catch (e: any) {
      console.log(e)
      sortErrors(e.response.errors)
      return;
    }
  }

  return (
      <form onSubmit={register}>
        <ModalHeader
            className="flex flex-col gap-1 items-center justify-center text-3xl">Inscription</ModalHeader>
        <ModalBody>
          <InputPanda
              autoFocus
              name="username"
              label="Nom d'utilisateur"
              placeholder="Entrez votre nom d'utilisateur"
              error={errors.username?.message}
              type={'text'}
          />
          <div className="flex space-x-4 w-full">
            <InputPanda
                label="Mot de passe"
                name="password"
                placeholder="Entrez votre mot de passe"
                type="password"
                error={errors.password?.message}
            />
            <InputPanda
                label="Répéter le mot de passe"
                name="repeat_password"
                placeholder="Répétez votre mot de passe"
                type="password"
                error={errors.password?.message}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button fullWidth color="primary" type="submit">
            S'inscrire
          </Button>
        </ModalFooter>
      </form>
  )

}
