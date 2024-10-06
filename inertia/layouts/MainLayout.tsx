import * as React from 'react'
import { NextUIProvider } from '@nextui-org/react'

export default function MainLayout({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <div className={"bg-black text-white w-full h-full"}>
        {children}
      </div>
    </NextUIProvider>
  )
}
