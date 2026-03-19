'use client'

import { useGLTF } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'

import { CANVAS_DPR, CANVAS_GL_OPTIONS } from '@/lib/canvas-gl-options'

// cup: inside polaroid bottom-right, gentle steam-like bob
function CupCoffee() {
  const groupRef = useRef<Group>(null)
  const { scene } = useGLTF('/3d/cupcoffee.glb')

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.y = -0.6 + Math.sin(t * 0.6) * 0.04
    groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.015
  })

  return (
    <group ref={groupRef} position={[0.3, 0, 1.8]}>
      <primitive object={scene} scale={1.3} />
    </group>
  )
}

// machine: outside polaroid right, floating
function CoffeeMachine() {
  const groupRef = useRef<Group>(null)
  const { scene } = useGLTF('/3d/coffeemachine.glb')

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.y = -0.5 + Math.sin(t * 0.8) * 0.06
    groupRef.current.rotation.z = -0.08 + Math.sin(t * 0.5) * 0.02
  })

  return (
    <group ref={groupRef} position={[1, -1, 0.55]}>
      <primitive object={scene} scale={0.5} />
    </group>
  )
}

// rice: bottom-left outside polaroid
function Burger() {
  const groupRef = useRef<Group>(null)
  const { scene } = useGLTF('/3d/burger.glb')

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    groupRef.current.position.y = -0.9 + Math.sin(t * 0.55) * 0.05
    groupRef.current.rotation.z = Math.sin(t * 0.45) * 0.03
  })

  return (
    <group ref={groupRef} position={[-0.9, 0, 1]}>
      <primitive object={scene} scale={0.04} />
    </group>
  )
}

export function CoffeeScene() {
  return (
    <div className="absolute -right-20 -bottom-6 z-10 size-96 overflow-visible">
      <div className="size-full min-h-[192px] min-w-[192px] sm:min-h-[300px] sm:min-w-[300px]">
        <Canvas
          camera={{ position: [-0.2, 0.6, 3.5], fov: 60 }}
          dpr={CANVAS_DPR}
          gl={CANVAS_GL_OPTIONS}
        >
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <CupCoffee />
          <CoffeeMachine />
          <Burger />
        </Canvas>
      </div>
    </div>
  )
}
