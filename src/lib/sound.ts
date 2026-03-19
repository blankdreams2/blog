const SOUND_STORAGE_KEY = 'sound'
const SOUND_OFF_CLASS = 'sound-off'

export const SOUND_MODE_CHANGE_EVENT = 'sound-mode-change'

export function getSoundEnabled(): boolean {
  if (typeof document === 'undefined') return true
  return !document.documentElement.classList.contains(SOUND_OFF_CLASS)
}

export function setSoundEnabled(enabled: boolean) {
  if (typeof document === 'undefined') return

  document.documentElement.classList.toggle(SOUND_OFF_CLASS, !enabled)

  try {
    localStorage.setItem(SOUND_STORAGE_KEY, enabled ? 'on' : 'off')
  } catch {
    // ignore
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(SOUND_MODE_CHANGE_EVENT, { detail: { enabled } }),
    )
  }
}

export function toggleSoundEnabled() {
  setSoundEnabled(!getSoundEnabled())
}
