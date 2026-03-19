'use client'

import { useDelayed3DMount } from '@/hooks/use-delayed-3d-mount'
import { CANVAS_DPR, CANVAS_GL_OPTIONS } from '@/lib/canvas-gl-options'
import { Center, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

const BanhmyModel = () => {
  const { scene } = useGLTF('/3d/banhmy.glb')
  return (
    <Center>
      <primitive object={scene} scale={0.8} />
    </Center>
  )
}

export function SpinBanhmy() {
  const shouldMount = useDelayed3DMount(400)

  if (!shouldMount) {
    return (
      <section className="flex flex-col items-center py-12">
        <div className="bg-muted/30 relative h-64 w-full max-w-md animate-pulse rounded-xl border dark:bg-neutral-900/50" />
      </section>
    )
  }

  return (
    <section className="flex flex-col items-center py-12">
      <div className="bg-muted/30 relative h-64 w-full max-w-md rounded-xl border dark:bg-neutral-900/50">
        <span className="font-editorial text-muted-foreground absolute bottom-2 left-3 text-sm">
          kitchen closed.
        </span>
        <Canvas
          camera={{ position: [6, 0, 1], fov: 50 }}
          dpr={CANVAS_DPR}
          gl={CANVAS_GL_OPTIONS}
          className="size-full rounded-xl"
        >
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <Suspense fallback={null}>
            <BanhmyModel />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>
    </section>
  )
}
