import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { Sidebar, SidebarBody, SidebarLink } from '~/components/ui/sidebar'
import { useState } from 'react'

import * as React from 'react'
import { Button, Image } from '@nextui-org/react'
import useAuth from '~/hooks/use_auth'

export default function DashboardLayout({children}: { children: React.ReactNode }) {

  const logout = () => {
    window.location.href = '/auth/logout'
  }

  const links = [
    {
      label: 'Dashboard',
      href: '/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0">
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>
          <path
            d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        </svg>
      )
    },
    {
      label: 'Sujets',
      href: '/subjects',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0">
          <path d="M12 20h9"/>
          <path
            d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/>
          <path d="m15 5 3 3"/>
        </svg>
      )
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0">
          <path
            d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      )
    },
    {
      label: 'Settings',
      role: 'teacher',
      href: '/groups',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
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
            {
              open && (
                <div className={'text-white'}>Connecté en tant que</div>
              )
            }
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

            <div className={""}>
              <Button
                variant={'flat'}
                color={'danger'}
                isIconOnly={!open}
                type={'button'}
                radius={'md'}
                onClick={() => logout()}
                fullWidth
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="lucide lucide-arrow-left-from-line">
                  <path d="m9 6-6 6 6 6"/>
                  <path d="M3 12h14"/>
                  <path d="M21 19V5"/>
                </svg>
                {open && 'Déconnexion'}
              </Button>
            </div>
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
        className="font-medium text-white whitespace-pre"
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
  return (
    <div className="flex flex-1">
      <div
        className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full text-white ">
        {children}
      </div>
    </div>
  )
}
