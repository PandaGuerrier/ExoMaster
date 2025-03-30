import DashboardLayout from '~/layouts/DashboardLayout'
import { Head } from '@inertiajs/react'
import { InferPageProps } from '@adonisjs/inertia/types'
import ExercisesController from '#controllers/common/users/exercises_controller'
import { useEffect, useState, useCallback } from 'react'
import MonacoEditor from '@uiw/react-monacoeditor'
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, useDisclosure } from '@nextui-org/react'
import axios from 'axios'
import { toast } from 'sonner'

declare global {
  interface window {
    loadPyodide: any;
  }
}

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeout)
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

export default function ExerciseShow({ exercise }: InferPageProps<ExercisesController, 'show'>) {
  const [code, setCode] = useState(exercise.code)
  const [output, setOutput] = useState(exercise.result)
  const [pyodide, setPyodide] = useState<any>(null)
  const [name] = useState(exercise.name)
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  useEffect(() => {
    const loadPyodide = async () => {
      let time = {
        start: new Date().getTime(),
        sleep: (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
      }

      const pyodide = await (window as any).loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/',
        stdout: (msg: any) => {
          setOutput((prev: any) => prev + '<div> >>> ' + msg + '</div>')
          if (!isOpen) onOpen()
        }
      })
      setPyodide(pyodide)
      pyodide.registerJsModule('time', time)
    }

    if (!pyodide) {
      loadPyodide()
    }
  }, [])

  const save = useCallback(debounce(async () => {
    await axios.put(``, {
      name: exercise.name,
      description: exercise.description,
      code: code,
      result: output,
    })

    toast.success('Code sauvegardé avec succès !')
  }, 1000), [code, output])

  const handleCodeChange = (value: string) => {
    setCode(value)
    save()
  }

  async function executeCode() {
    save()
    setOutput('')
    if (pyodide) {
      try {
        pyodide.runPython(code)
      } catch (error) {
        setOutput(error.toString())
        if (!isOpen) onOpen()
      }
    }
  }

  useEffect(() => {
    console.log('Output has changed:', output)
  }, [output])

  return (
    <DashboardLayout>
      <Head title={name}/>
      <div className={''}>
        <div>{exercise.isFinish ? 'Vous avez marqué cet exercise en fini !' : ''}</div>
        <div className={'font-bold text-2xl'}>Fichier: {name}.{exercise.language}</div>
        <div className={'flex space-x-5'}>
          <Button className={'mt-5'} variant={'flat'} color={'primary'} onClick={onOpen}>Ouvrir la console</Button>
          <Button className={'mt-5'} variant={'flat'} color={'success'} onClick={() => executeCode()}>Executer</Button>
        </div>
      </div>
      <div className={'h-full w-full'}>
        <MonacoEditor
          language={exercise.language}
          onChange={(value: string) => handleCodeChange(value)}
          value={exercise.code}
          options={{
            selectOnLineNumbers: true,
            roundedSelection: false,
            cursorStyle: 'line',
            automaticLayout: true,
            theme: 'vs-dark'
          }}
          height={'100%'}
          width="100%"
        />
      </div>
      <Drawer
        isOpen={isOpen}
        placement={"bottom"}
        onOpenChange={onOpenChange}
        defaultOpen={true}
      >
        <DrawerContent>
          {() => (
            <>
              <DrawerHeader className="flex flex-col gap-1">Console {exercise.language}</DrawerHeader>
              <DrawerBody>
                <div dangerouslySetInnerHTML={{__html: output}}/>
              </DrawerBody>
            </>
          )}
        </DrawerContent>
      </Drawer>

    </DashboardLayout>
  )
}
