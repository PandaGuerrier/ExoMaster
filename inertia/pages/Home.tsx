import { AuroraBackground } from '~/components/ui/aurora-background'
import { motion } from 'framer-motion'
import { Head } from '@inertiajs/react'
import { FlipWords } from '~/components/ui/flip-words'
import AuthModal from '~/components/auth/AuthModal'

export default function Home() {
  const words = ['Code', 'Suit ta progression', 'Apprends', 'Réussi', 'Progresse', 'Évolue', 'Brille']
  return (
    <AuroraBackground>
      <Head title={"ExoMaster"} />
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4 text-white"
      >
       <h1 className={'text-4xl md:text-8xl text-white font-bold'}><FlipWords words={words} className={'text-white'}/>avec <span className={'text-blue-600'}>ExoMaster</span></h1>
        <p className="text-center text-xl">
          ExoMaster est une plateforme d'entraînement en ligne pour les étudiants en informatique, spécialiser avec les sujets de bac de NSI.
        </p>
        <AuthModal selectedStr={'login'} />
      </motion.div>
    </AuroraBackground>
  )
}
