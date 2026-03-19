import AnimateCounter from './AnimateCounter'

interface OverviewItemProps {
  label: string
  value: number
  unit?: string
}

export default function OverviewItem({
  label,
  value,
  unit = '',
}: OverviewItemProps) {
  return (
    <div className="border-border bg-muted/30 flex flex-col self-center rounded-xl border px-4 py-3">
      <span className="text-muted-foreground text-sm font-medium">{label}</span>
      <div>
        <AnimateCounter
          className="text-accent text-xl font-medium lg:text-2xl"
          total={value}
        />
        {unit && (
          <span className="text-muted-foreground text-sm font-medium">
            {' '}
            {unit}
          </span>
        )}
      </div>
    </div>
  )
}
