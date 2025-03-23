import { useState } from 'react'
import Folder from '#models/folder'
import { FaFile, FaFolder } from 'react-icons/fa'
import { Link } from '@inertiajs/react'


interface FolderProps {
  path: string[] | null,
  folderName: string | 'Home',
  folder: Folder | null,
  list: any[],
  setList: (list: any[]) => void,
}

export default function FolderComponent({ path, folderName, folder, list, setList }: FolderProps) {
  const [selected, setSelected] = useState<any>(null)

  return (
    <div className={"h-full w-full p-5"}>
      <div className={'w-full overflow-x-hidden overflow-y-auto gap-3 grid grid-cols-12'}>
        {
          list.map((item: any) => {
            const isSelected = selected === item.uuid
            return (
              <div
                key={item.uuid || item.id}
                className={``}
                onClick={() => setSelected(item.uuid)}
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
