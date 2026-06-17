import type { ApplicationStatus } from '../types'

const colors: Record<ApplicationStatus, string> = {
  Saved: 'bg-slate-700 text-slate-200',
  Applied: 'bg-blue-900 text-blue-300',
  Interview: 'bg-yellow-900 text-yellow-300',
  Offer: 'bg-green-900 text-green-300',
  Rejected: 'bg-red-900 text-red-300',
}

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${colors[status]}`}>
      {status}
    </span>
  )
}
