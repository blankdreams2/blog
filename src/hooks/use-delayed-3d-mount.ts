import { useEffect, useState } from 'react'

/**
 * Delays mounting of 3D/WebGL content until after Astro view transitions complete.
 * This prevents WebGL context disposal (outgoing page) from competing with
 * Canvas initialization (incoming page) during navigation, which causes lag.
 *
 * @param delayMs - Delay before mounting (default 400ms)
 * @param enabled - Whether to apply the delay (e.g. false when using client:visible)
 */
export function useDelayed3DMount(delayMs = 400, enabled = true): boolean {
  const [shouldMount, setShouldMount] = useState(!enabled)

  useEffect(() => {
    if (!enabled) {
      setShouldMount(true)
      return
    }

    const id = setTimeout(() => setShouldMount(true), delayMs)
    return () => clearTimeout(id)
  }, [delayMs, enabled])

  return shouldMount
}
