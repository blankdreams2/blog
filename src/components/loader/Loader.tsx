'use client'

import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { Signature } from './Sig2'

const DURATION_MS = 2500

interface LoaderProps {
  onComplete: () => void
}

export function Loader({ onComplete }: LoaderProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, DURATION_MS)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      className="bg-background fixed inset-0 z-100 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08, filter: 'blur(12px)' }}
      transition={{
        duration: 0.5,
        ease: [0.22, 0.03, 0.26, 1],
      }}
    >
      <motion.div
        className="text-foreground w-[320px] px-4 sm:w-[400px] md:w-[480px]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.1, ease: [0.22, 0.03, 0.26, 1] }}
      >
        <Signature />
      </motion.div>
    </motion.div>
  )
}
