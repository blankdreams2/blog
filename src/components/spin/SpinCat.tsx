'use client'

import { Center, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useCallback, useEffect, useRef, useState } from 'react'

import { CANVAS_DPR, CANVAS_GL_OPTIONS } from '@/lib/canvas-gl-options'
import { useDelayed3DMount } from '@/hooks/use-delayed-3d-mount'
import {
  getSoundEnabled,
  SOUND_MODE_CHANGE_EVENT,
  toggleSoundEnabled,
} from '@/lib/sound'

function CatModel() {
  const { scene } = useGLTF('/3d/cat.glb')
  return (
    <Center>
      <primitive object={scene} scale={0.5} />
    </Center>
  )
}

function SpinCatScene({ soundEnabled }: { soundEnabled: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!soundEnabled && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [soundEnabled])

  const onInteractionStart = useCallback(() => {
    if (!soundEnabled) return
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/spinningcat.mp3')
      audioRef.current.loop = false
    }
    const audio = audioRef.current
    audio.currentTime = 0
    void audio.play().catch(() => {})
  }, [soundEnabled])

  const onInteractionEnd = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [])

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <Suspense fallback={null}>
        <CatModel />
      </Suspense>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        onStart={onInteractionStart}
        onEnd={onInteractionEnd}
      />
    </>
  )
}

export function SpinCat() {
  const [soundEnabled, setSoundEnabled] = useState(() => getSoundEnabled())
  const shouldMount = useDelayed3DMount(400)

  useEffect(() => {
    const update = () => setSoundEnabled(getSoundEnabled())
    window.addEventListener(SOUND_MODE_CHANGE_EVENT, update)
    document.addEventListener('astro:after-swap', update)
    update()
    return () => {
      window.removeEventListener(SOUND_MODE_CHANGE_EVENT, update)
      document.removeEventListener('astro:after-swap', update)
    }
  }, [])

  if (!shouldMount) {
    return (
      <section className="flex flex-col items-center py-12">
        <div className="bg-muted/30 dark:bg-neutral-900/50 relative h-64 w-full max-w-md animate-pulse rounded-xl" />
      </section>
    )
  }

  return (
    <section className="flex flex-col items-center py-12">
      <div className="relative h-64 w-full max-w-md rounded-xl bg-muted/30 dark:bg-neutral-900/50">
        <button
          type="button"
          className="hover:bg-muted/80 absolute top-3 right-3 z-20 rounded-md p-1.5"
          aria-label={soundEnabled ? 'Turn sound off' : 'Turn sound on'}
          aria-pressed={!soundEnabled}
          title={soundEnabled ? 'Sound: On' : 'Sound: Off'}
          onClick={() => toggleSoundEnabled()}
        >
          {soundEnabled ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
              aria-hidden
            >
              <path d="M11 5L6 9H2v6h4l5 4V5Z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
              aria-hidden
            >
              <path d="M11 5L6 9H2v6h4l5 4V5Z" />
              <path d="M22 9l-6 6" />
              <path d="M16 9l6 6" />
            </svg>
          )}
        </button>
        <span className="font-editorial text-muted-foreground absolute bottom-2 left-3 text-sm">
          spin the boy
        </span>
        <Canvas
          camera={{ position: [0, 0, 3], fov: 50 }}
          dpr={CANVAS_DPR}
          gl={CANVAS_GL_OPTIONS}
          className="size-full rounded-xl"
        >
          <SpinCatScene soundEnabled={soundEnabled} />
        </Canvas>
      </div>
    </section>
  )
}
