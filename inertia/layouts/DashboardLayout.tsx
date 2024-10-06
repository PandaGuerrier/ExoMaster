import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { Sidebar, SidebarBody, SidebarLink } from '~/components/ui/sidebar'
import { useEffect, useState } from 'react'
import { IconArrowLeft, IconBrandTabler, IconSettings, IconUserBolt } from '@tabler/icons-react'

import * as React from 'react'
import { Button, Image } from '@nextui-org/react'
import useAuth from '~/hooks/use_auth'

export default function DashboardLayout({children}: { children: React.ReactNode }) {
  const links = [
    {
      label: 'Dashboard',
      href: '#',
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
      )
    },
    {
      label: 'Profile',
      href: '#',
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
      )
    },
    {
      label: 'Settings',
      href: '#',
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
      )
    },
    {
      label: 'Logout',
      href: '#',
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"/>
      )
    }
  ]
  const [open, setOpen] = useState(false)
  const auth = useAuth()

  return (
    <div
      className={'absolute inset-0 overflow-hidden flex flex-col md:flex-row bg-neutral-900 dark:bg-neutral-800'}>

      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo/> : <LogoIcon/>}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link}/>
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: auth.user.username,
                href: '#',
                icon: (
                  <Image
                    src={'https://ui-avatars.com/api/?name=' + auth.user.username + '&background=random&color=fff'}
                    radius={'full'}
                    width={40}
                    className={'flex-shrink-0'}
                  />
                )
              }}
            />

            <Button
              variant={'flat'}
              color={'danger'}
              isIconOnly={!open}
              type={'button'}
              radius={'md'}
              onClick={() => setOpen(!open)}
              fullWidth
              className={'mr-4'}
            >
              <IconArrowLeft/>
              {open && 'Déconnexion'}
            </Button>
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard children={children}/>
    </div>
  )
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div
        className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0"/>
      <motion.span
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        ExoMaster
      </motion.span>
    </Link>
  )
}
export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <div
        className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0"/>
    </Link>
  )
}

// Dummy dashboard component with content
const Dashboard = ({children}: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <div className="flex flex-1">
      <div
        className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        {
          loading ? (
            <>
              <div className="flex gap-2">
                {[...new Array(4)].map((i) => (
                  <div
                    key={'first-array' + i}
                    className="h-20 w-full rounded-lg bg-neutral-800 animate-pulse"
                  ></div>
                ))}
              </div>
              <div className="flex gap-2 flex-1">
                {[...new Array(2)].map((i) => (
                  <div
                    key={'second-array' + i}
                    className="h-full w-full rounded-lg bg-neutral-800 animate-pulse"
                  ></div>
                ))}
              </div>
            </>
          ) : children}
      </div>
    </div>
  )
}
