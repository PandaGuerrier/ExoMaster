import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import { useState } from 'react'

export default function FileDropZone() {
  const [isDragActive, setIsDragActive] = useState(false)

  const onDrop = async (acceptedFiles: File[]) => {
    const formData = new FormData()
    formData.append('file', acceptedFiles[0])
    console.log('Uploading file:', acceptedFiles[0])

    try {
      await axios.post('/exercises/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      alert('File uploaded successfully')
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Failed to upload file')
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
    noClick: true // Disable click event
  })

  return (
    <div
      {...getRootProps()}
      className={`fixed w-full h-full flex items-center justify-center ${isDragActive ? 'opacity-100' : 'opacity-50'}`}
    >
      <input {...getInputProps()} />
      <div className="text-white text-2xl">Déposez votre fichier ici</div>
    </div>
  )
}
