'use client'

import { Center, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

import { CANVAS_DPR, CANVAS_GL_OPTIONS } from '@/lib/canvas-gl-options'
import { useDelayed3DMount } from '@/hooks/use-delayed-3d-mount'

function MonikaModel() {
  const { scene } = useGLTF('/3d/monika.glb')
  return (
    <Center>
      <group rotation={[0, Math.PI, 0]}>
        <primitive object={scene} scale={0.55} />
      </group>
    </Center>
  )
}

export function SpinMonika() {
  const shouldMount = useDelayed3DMount(400)

  if (!shouldMount) {
    return (
      <section className="flex flex-col items-center py-12">
        <div className="bg-muted/30 dark:bg-neutral-900/50 relative h-64 w-full max-w-md animate-pulse rounded-xl border" />
      </section>
    )
  }

  return (
    <section className="flex flex-col items-center py-12">
      <div className="bg-muted/30 relative h-64 w-full max-w-md rounded-xl border dark:bg-neutral-900/50">
        <span className="font-editorial text-muted-foreground absolute bottom-2 left-3 text-sm">
          just monika
        </span>
        <Canvas
          camera={{ position: [0, 0, 3], fov: 50 }}
          dpr={CANVAS_DPR}
          gl={CANVAS_GL_OPTIONS}
          className="size-full rounded-xl"
        >
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <Suspense fallback={null}>
            <MonikaModel />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
    </section>
  )
}
