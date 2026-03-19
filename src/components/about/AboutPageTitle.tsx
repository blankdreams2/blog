'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

const TITLE_JP = '何でもは知らないわよ、知ってることだけ。'
const TOOLTIP =
  "I don't know everything. I just know what I know. — Hanekawa Tsubasa"

interface AboutPageTitleProps {
  children?: React.ReactNode
}

export default function AboutPageTitle({ children }: AboutPageTitleProps) {
  return (
    <div className="mt-3 mb-6 text-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <h2 className="font-editorial text-foreground cursor-help text-xl font-bold">
              {TITLE_JP}
            </h2>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="max-w-sm px-4 py-2.5 text-center font-serif text-sm whitespace-normal"
          >
            {TOOLTIP}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {children && <div className="mt-2">{children}</div>}
    </div>
  )
}
