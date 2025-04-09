import { useEffect, useState } from 'react'
import Folder from '#models/folder'
import { FaFile, FaFolder } from 'react-icons/fa'
import { Link } from '@inertiajs/react'

interface FolderProps {
  path: string[] | null,
  folderName: string | 'Home',
  folder: Folder | null,
  list: any[],
}

export default function FolderComponent({ path, folderName, folder, list }: FolderProps) {
  const [selected, setSelected] = useState<string[]>([])

  useEffect(() => {
    console.log('list', list)
    console.log('selected', selected)
  }, [selected])

  const toggleSelection = (key: string, event: React.MouseEvent) => {
    if (event.ctrlKey) {
      // Si CTRL est enfoncé, ajouter ou retirer l'élément de la sélection
      setSelected(prev =>
        prev.includes(key) ? prev.filter(item => item !== key) : [...prev, key]
      );
    } else {
      // Sinon, remplacer toutes les sélections par l'élément cliqué
      setSelected([key]);
    }
  };

  return (
    <div className={"h-full w-full p-5"}>
      <div className={'w-full overflow-x-hidden overflow-y-auto gap-3 grid grid-cols-12'}>
        {
          list.map((item: any) => {
            const key = (item.uuid || item.id) + item.name
            const isSelected = selected.includes(key)
            return (
              <div
                key={key}
                className={``}
                onClick={(event) => toggleSelection(key, event)}
              >
                {isSelected ? (
                  <Link href={item.type === 'folder' ? `/folders/${item.uuid}` : `/exercises/${item.id}`} className={'flex flex-col items-center bg-blue-700 rounded-md bg-opacity-80 hover:bg-opacity-80 h-28 w-28 p-2'}>
                    <div className={'flex justify-center'}>
                      {item.type === 'folder' ? <FaFolder className={'h-20 w-20'}/> : <FaFile className={'h-20 w-20'}/>}
                    </div>
                    <div className={'flex justify-center'}>
                      {item.name} {item.type === 'exercise' ? `.${item.language}` : ''}
                    </div>
                  </Link>
                ) : (
                  <div className={'flex flex-col items-center hover:bg-blue-400 rounded-md bg-opacity-80 hover:bg-opacity-80 h-28 w-28 p-2'}>
                    <div className={'flex justify-center'}>
                      {item.type === 'folder' ? <FaFolder className={'h-20 w-20'}/> : <FaFile className={'h-20 w-20'}/>}
                    </div>
                    <div className={'flex justify-center'}>
                      {item.name} {item.type === 'exercise' ? `.${item.language}` : ''}
                    </div>
                  </div>
                )}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
