'use client'

import { useEffect, useState } from 'react'

// TODO: for the fun of it
const LOCATION = 'Guangzhou, China'
const TIMEZONE = 'Asia/Shanghai'

export default function LiveClock() {
  const [time, setTime] = useState('00:00:00')

  useEffect(() => {
    // const format = (n: number) => n.toString().padStart(2, '0')
    const update = () => {
      const now = new Date()
      const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: TIMEZONE,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      setTime(formatter.format(now))
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col items-center gap-1 font-mono">
      <span className="text-muted-foreground text-2xl tabular-nums sm:text-3xl">
        {time}
      </span>
      <span className="text-muted-foreground/80 text-sm">in {LOCATION}</span>
    </div>
  )
}
