'use client'

import clsx from 'clsx'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface Contribution {
  date: string
  contributionCount: number
  color: string
}

interface Month {
  name: string
  firstDay: string
  totalWeeks: number
  contributionsCount: number
}

interface CalendarProps {
  data?: {
    weeks: {
      firstDay: string
      contributionDays: Contribution[]
    }[]
    months: Month[]
    colors: string[]
  }
}

export default function Calendar({ data }: CalendarProps) {
  const [selectContribution, setSelectContribution] = useState<{
    count: number | null
    date: string | null
  }>({
    count: null,
    date: null,
  })

  const weeks = data?.weeks ?? []
  const months =
    data?.months?.map((month: Month) => {
      const filterContributionDay = weeks
        .filter(
          (week) => week.firstDay.slice(0, 7) === month.firstDay.slice(0, 7),
        )
        .map((item) => item.contributionDays)
        .flat(1)
      const getContributionsByMonth = filterContributionDay.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.contributionCount,
        0,
      )

      return {
        ...month,
        contributionsCount: getContributionsByMonth,
      }
    }) ?? []

  // Theme-aware palette via CSS variables (pink for light, blue for dark)
  const ACCENT_PALETTE = [
    'var(--contribution-1)',
    'var(--contribution-2)',
    'var(--contribution-3)',
    'var(--contribution-4)',
  ]
  const getAccentColor = (_githubColor: string, contributionCount: number) => {
    const level =
      contributionCount <= 1
        ? 0
        : contributionCount <= 3
          ? 1
          : contributionCount <= 6
            ? 2
            : 3
    return ACCENT_PALETTE[level]
  }
  const contributionColors = ACCENT_PALETTE

  return (
    <>
      <div className="relative flex flex-col">
        <ul className="text-muted-foreground flex justify-end gap-[3px] overflow-hidden text-xs font-medium md:justify-start">
          {months.map((month) => (
            <li
              key={month.firstDay}
              style={{ minWidth: Math.max(14.3 * month.totalWeeks, 20) }}
            >
              {month.name}
            </li>
          ))}
        </ul>

        <div className="flex justify-start gap-[3px] overflow-hidden">
          {weeks?.map((week) => (
            <div key={week.firstDay}>
              {week.contributionDays.map((contribution) => {
                const backgroundColor =
                  contribution.contributionCount > 0
                    ? getAccentColor(
                        contribution.color,
                        contribution.contributionCount,
                      )
                    : undefined

                const getRandomDelayAnimate =
                  Math.random() * week.contributionDays.length * 0.15

                return (
                  <motion.span
                    key={contribution.date}
                    initial="initial"
                    animate="animate"
                    variants={{
                      initial: { opacity: 0, translateY: -20 },
                      animate: {
                        opacity: 1,
                        translateY: 0,
                        transition: { delay: getRandomDelayAnimate },
                      },
                    }}
                    className="my-[2px] block h-[12px] w-[12px] rounded-sm"
                    style={{
                      backgroundColor:
                        backgroundColor ?? 'var(--contribution-empty)',
                    }}
                    onMouseEnter={() =>
                      setSelectContribution({
                        count: contribution.contributionCount,
                        date: contribution.date,
                      })
                    }
                    onMouseLeave={() =>
                      setSelectContribution({ count: null, date: null })
                    }
                  />
                )
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
          <span>Less</span>
          <ul className="flex gap-1">
            <motion.li
              className="h-[10px] w-[10px] rounded-sm"
              style={{ backgroundColor: 'var(--contribution-empty)' }}
            />
            {contributionColors.map((item, index) => (
              <motion.li
                key={item}
                initial="initial"
                animate="animate"
                variants={{
                  initial: { opacity: 0 },
                  animate: {
                    opacity: 1,
                    transition: { delay: index * 0.3 },
                  },
                }}
                className="h-[10px] w-[10px] rounded-sm"
                style={{ backgroundColor: item }}
              />
            ))}
          </ul>
          <span>More</span>
        </div>

        <div
          className={clsx(
            `${selectContribution?.date ? 'opacity-100' : 'opacity-0'}`,
            'bg-muted text-foreground rounded px-2 text-sm',
          )}
        >
          {selectContribution?.count} contributions on{' '}
          {selectContribution?.date}
        </div>
      </div>
    </>
  )
}
