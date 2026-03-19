'use client'

import { CANVAS_DPR, CANVAS_GL_OPTIONS } from '@/lib/canvas-gl-options'
import { Center, useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'

const TREE_BASE_Y = -0.8

function Computer() {
  const groupRef = useRef<Group>(null)
  const { scene } = useGLTF('/3d/computer.glb')

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.y = -0.4 + Math.sin(t * 0.6) * 0.05
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.08
  })

  return (
    <group ref={groupRef} position={[1, 1, 0.4]}>
      <primitive object={scene} scale={0.0065} />
    </group>
  )
}

function Tree() {
  const groupRef = useRef<Group>(null)
  const { scene } = useGLTF('/3d/tree.glb')

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.y = TREE_BASE_Y + Math.sin(t * 0.5) * 0.06
    groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.03
  })

  return (
    <group ref={groupRef} position={[-1.1, TREE_BASE_Y, 0.3]}>
      <Center>
        <primitive object={scene} scale={0.0075} />
      </Center>
    </group>
  )
}

const canvasClass =
  'absolute top-1/2 left-1/2 size-[min(100%,400px)] min-h-[280px] min-w-[280px] -translate-x-1/2 -translate-y-1/2 sm:min-h-[360px] sm:min-w-[360px]'

export function AboutScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-visible">
      <div className={canvasClass}>
        <Canvas
          camera={{ position: [0, 0, 2.5], fov: 75 }}
          dpr={CANVAS_DPR}
          gl={CANVAS_GL_OPTIONS}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <Computer />
          <Tree />
        </Canvas>
      </div>
    </div>
  )
}
