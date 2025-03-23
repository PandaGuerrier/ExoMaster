import { AuroraBackground } from '~/components/ui/aurora-background'
import { motion } from 'framer-motion'
import { Head, Link } from '@inertiajs/react'
import { FlipWords } from '~/components/ui/flip-words'
import AuthModal from '~/components/auth/AuthModal'
import React from 'react'

export default function Home() {
  const words = ['Code', 'Suit ta progression', 'Apprends', 'Réussi', 'Progresse', 'Évolue', 'Brille']
  return (
    <AuroraBackground>
      <Head title={'Accueil'}/>
      <motion.div
        initial={{opacity: 0.0, y: 40}}
        whileInView={{opacity: 1, y: 0}}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut'
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 text-white h-full"
      >
        <h1 className={'text-4xl md:text-8xl text-white font-bold'}><FlipWords words={words}
                                                                               className={'text-white'}/>avec <span
          className={'text-blue-600'}>ExoMaster</span></h1>
        <p className="text-center text-xl">
          ExoMaster est une plateforme d'entraînement en ligne pour les étudiants en informatique, spécialisé avec les
          sujets de bac de NSI.
        </p>
        <AuthModal selectedStr={'login'}/>
      </motion.div>
      <motion.div className="text-white bottom-0 h-[1/2] p-2"
                  initial={{opacity: 0.0, y: -50}}
                  whileInView={{opacity: 1, y: 0}}
                  transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: 'easeInOut'
                  }}>
        Réalisé par <Link href="https://pandaguerrier.fr/" target="_blank" className="text-blue-600">Jules Lofficial</Link>
      </motion.div>
    </AuroraBackground>
  )
}
