import DashboardLayout from '~/layouts/DashboardLayout'
import { Head } from '@inertiajs/react'
import { InferPageProps } from '@adonisjs/inertia/types'
import DefaultExercisesController from '#controllers/common/admin/default_exercises_controller'
import { useState } from 'react'
import { Input } from '@nextui-org/input'
import MarkdownEditor from '@uiw/react-markdown-editor'
import { Button } from '@nextui-org/react'
import MonacoEditor from '@uiw/react-monacoeditor'

const defaultConsign = `# Hello Markdown!`
const defaultCode = 'print("Hello World")'

// @ts-ignore
export default function Create({ subject }: InferPageProps<DefaultExercisesController, 'create'>) {
  const [consign, setConsign] = useState<string>('# Hello Markdown!')
  const [code, setCode] = useState<string>('print("Hello World")')

  return (
    <DashboardLayout>
      <Head title={"Création d'un exercice"}/>
      <div className={'space-y-5 overflow-y-auto overflow-x-hidden'}>
        <div className={'text-center text-white text-2xl font-bold'}>
          Création d'un exercice pour le sujet: {subject.title}
          <div className={"text-xl font-medium"}>
            {subject.description}
          </div>
        </div>
        <div className={"h-full"}>
          <form className={'space-y-5 h-full w-full pb-14'} method={"POST"} action={`/subjects/me/${subject.id}/create`}>
            <div className={'flex space-x-5'}>
              <Input name={'title'} variant={"underlined"} placeholder={'Titre de l\'exercice'} label={"Titre"}
                     required/>
              <Input name={'description'} variant={"underlined"} placeholder={'Description de l\'exercice'}
                     label={"Description"} required/>
              <Input name={'points'} variant={"underlined"} placeholder={'Points de l\'exercice'}
                     label={"Points"} required/>
            </div>

            <div className="wmde-markdown-var"></div>
            <div className={' w-full'}>
              <MarkdownEditor value={defaultConsign}  onChange={(value) => setConsign(value)} enablePreview={true}
                              className={"min-h-[50vh] max-h-80"}/>
            </div>
            <div>
              <div className={'h-[50vh] md:h-[70vh] w-full space-y-5'}>
                Code par défaut de l'exercice
                <MonacoEditor
                  language="python"
                  value={defaultCode}
                  onChange={(value) => setCode(value)}
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
            </div>

            <input name={"consign"} value={consign} className={"invisible"}/>
            <input name={"code"} value={code} className={"invisible"}/>

            <div className={"fixed bottom-5 flex justify-center w-full"}>
              <Button variant={'shadow'} color={'primary'} fullWidth type={'submit'} className={"w-1/2"}>Créer l'exercice</Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  )
}
