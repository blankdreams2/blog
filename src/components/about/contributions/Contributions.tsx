import Calendar from './Calendar'
import Overview from './Overview'

type ContributionsProps = {
  githubData: any
}

export default function Contributions({ githubData }: ContributionsProps) {
  return (
    <section className="flex flex-col gap-y-2">
      {!githubData && <div className="dark:text-neutral-400">No Data</div>}

      {githubData && (
        <div className="space-y-3">
          <Overview data={githubData} />
          <Calendar data={githubData} />
        </div>
      )}
    </section>
  )
}
