'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Building2 } from 'lucide-react'
import { TechIcon } from './TechIcon'
import type { Experience } from '@/data/experiences'

const INITIAL_COUNT = 3

const ExperienceItem = ({ exp }: { exp: Experience }): React.ReactElement => {
  return (
    <li className="relative flex gap-6">
      {/* company logo - centered on timeline */}
      <div
        className="bg-muted/50 relative z-10 mt-1 flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full"
        aria-hidden
      >
        {exp.logo ? (
          <img src={exp.logo} alt="" className="size-full object-contain bg-white" />
        ) : (
          <Building2 className="text-accent size-6" strokeWidth={1.5} />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-bold">{exp.role}</h3>
        </div>
        <p className="text-muted-foreground">{exp.company}</p>
        <p className="text-muted-foreground text-sm">
          {exp.duration} · {exp.location}
        </p>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          {exp.description}
        </p>
        {exp.technologies && exp.technologies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-muted inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs"
              >
                <TechIcon name={tech} />
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </li>
  )
}

interface Props {
  experiences: Experience[]
}

export function ExperienceTimeline({ experiences }: Props) {
  const [expanded, setExpanded] = useState(false)
  const initial = experiences.slice(0, INITIAL_COUNT)
  const rest = experiences.slice(INITIAL_COUNT)
  const hasMore = rest.length > 0

  return (
    <section className="mt-16">
      <h2 className="text-5xl font-bold">
        Experience<span className="text-accent">.</span>
      </h2>
      <p className="text-muted-foreground mb-6 text-2xl">
        Where I've{' '}
        <span className="text-foreground decoration-accent font-serif italic underline underline-offset-4">
          Worked
        </span>{' '}
        so far.
      </p>

      <div className="relative">
        <div
          className="bg-border absolute top-2 bottom-2 left-6 w-px"
          aria-hidden
        />

        <ul className="flex flex-col gap-8">
          {initial.map((exp, i) => (
            <ExperienceItem key={`${exp.company}-${exp.role}-${i}`} exp={exp} />
          ))}

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col gap-8 overflow-hidden"
              >
                {rest.map((exp, i) => (
                  <ExperienceItem
                    key={`${exp.company}-${exp.role}-${i}`}
                    exp={exp}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </ul>

        {hasMore && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="text-muted-foreground hover:text-foreground group inline-flex items-center gap-2 text-sm transition-colors"
            >
              {expanded ? 'Show less' : `See ${rest.length} more`}
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.25 }}
              >
                ▼
              </motion.span>
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
