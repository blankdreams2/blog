/**
 * Shared WebGL options for react-three-fiber Canvas.
 * Optimized to reduce GPU load and prevent "Context Lost" lag during
 * Astro view transitions when navigating between pages.
 */
export const CANVAS_GL_OPTIONS = {
  antialias: true,
  alpha: true,
  powerPreference: 'low-power' as const,
} as const

/** Limit pixel ratio to reduce GPU load during transitions */
export const CANVAS_DPR: [number, number] = [1, 2]
