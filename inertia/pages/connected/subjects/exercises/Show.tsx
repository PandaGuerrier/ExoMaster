import DashboardLayout from '~/layouts/DashboardLayout'
import { Head } from '@inertiajs/react'
import { InferPageProps } from '@adonisjs/inertia/types'
import ExercisesController from '#controllers/common/users/exercises_controller'
import { useEffect, useState, useCallback } from 'react'
import MonacoEditor from '@uiw/react-monacoeditor'
import { Button } from '@nextui-org/react'
import axios from 'axios'
import { toast } from 'sonner'

// Fonction de debounce
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout
  return function(...args: any[]) {
    clearTimeout(timeout)
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

// @ts-ignore
export default function SubjectShow({subject, exercise}: InferPageProps<ExercisesController, 'show'>) {
  const [code, setCode] = useState(exercise.code)
  const [output, setOutput] = useState(exercise.result)
  const [pyodide, setPyodide] = useState<any>(null)

  useEffect(() => {
    const loadPyodide = async () => {
      const pyodide = await (window as any).loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/',
        stdout: (msg: any) => setOutput((prev: any) => prev + '<div> >>> ' + msg + '</div>')
      })
      console.log(pyodide)
      setPyodide(pyodide)
    }

    if (!pyodide) {
      loadPyodide()
    }
  }, [])

  const save = useCallback(debounce(async () => {
    await axios.put(``, {
      code: code,
      result: output,
    })

    toast.success('Code sauvegardé avec succès !')
  }, 1000), [code, output])

  const handleCodeChange = (value: string) => {
    setCode(value)
    save()
  }

  function setFinish() {
    axios.put(``, {
      code: code,
      result: output,
      isFinish: true,
    }).then(() => {
      toast.success('Exercice terminé avec succès !')
      setTimeout(() => window.location.href = `/subjects/${subject.id}`, 2000)
    })
  }

  async function executeCode() {
    save()
    setOutput('')
    if (pyodide) {
      try {
        pyodide.runPython(code)
      } catch (error) {
        setOutput(error.toString())
      }
    }
  }

  useEffect(() => {
    // This effect will run whenever `output` changes
    console.log('Output has changed:', output)
  }, [output])

  return (
    <DashboardLayout>
      <Head title={exercise!.defaultExercice.title}/>
      <div className={'md:space-y-5'}>
        <div>{exercise.isFinish ? "Vous avez marqué cet exercise en fini !" : ""}</div>
        <div className={'font-bold text-2xl'}>Titre de l'exercise: {exercise.defaultExercice.title}</div>
        <div className={'font-bold'}>Consigne de l'exercise:</div>
        <div>{exercise.defaultExercice.consign}</div>
      </div>
      <div className={'md:flex md:space-x-5'}>
        <div className={'h-[50vh] md:h-[70vh] w-full'}>
          <MonacoEditor
            language="python"
            onChange={(value) => handleCodeChange(value)}
            value={exercise.code}
            options={{
              selectOnLineNumbers: true,
              roundedSelection: false,
              cursorStyle: 'line',
              automaticLayout: true,
              theme: 'vs-dark'
            }}
            width="100%"
          />
        </div>

        <div className={'w-full space-y-5'}>
          <div className={'flex space-x-5'}>
            <Button className={'mt-5'} variant={'flat'} color={'success'} fullWidth
                    onClick={() => executeCode()}>Executer</Button>
            <Button className={'mt-5'} variant={'flat'} color={'warning'} fullWidth
                    onClick={() => setFinish()}>J'ai fini !</Button>
          </div>

          <div className={'font-bold'}>Résultat:</div>
          <div className={'bg-zinc-800 p-5 rounded-md max-h-44 md:max-h-80 overflow-y-auto'}>
            <div dangerouslySetInnerHTML={{__html: output}}/>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
