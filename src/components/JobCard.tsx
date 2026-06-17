import { useState } from 'react'
import { ExternalLink, MapPin, Globe, Wifi, Building2, Loader2, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import type { JobApplication, ApplicationStatus } from '../types'
import { StatusBadge } from './StatusBadge'
import { matchJobWithCV } from '../claude'
import { t } from '../i18n'

interface Props {
  job: JobApplication
  lang: 'tr' | 'en'
  cvText: string
  onUpdate: (id: string, updates: Partial<JobApplication>) => void
  onDelete: (id: string) => void
}

const workTypeIcon = (wt: string) => {
  if (wt === 'Remote') return <Wifi size={12} />
  if (wt === 'Hybrid') return <Building2 size={12} />
  return <Building2 size={12} />
}

export function JobCard({ job, lang, cvText, onUpdate, onDelete }: Props) {
  const tr = t[lang]
  const [expanded, setExpanded] = useState(false)
  const [matching, setMatching] = useState(false)

  const handleMatch = async () => {
    if (!cvText || !job.description) return
    setMatching(true)
    try {
      const score = await matchJobWithCV(job.description, cvText)
      onUpdate(job.id, { matchScore: score })
    } finally {
      setMatching(false)
    }
  }

  const scoreColor = (s: number) => {
    if (s >= 75) return 'text-green-400'
    if (s >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="bg-[#0F1629] border border-[#1E2D4A] rounded-xl p-4 hover:border-blue-800 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-white font-medium text-sm truncate">{job.title}</h3>
            <StatusBadge status={job.status} />
            {job.matchScore !== undefined && (
              <span className={`text-xs font-bold ${scoreColor(job.matchScore)}`}>
                {job.matchScore}%
              </span>
            )}
          </div>
          <p className="text-slate-400 text-xs mt-0.5">{job.company}</p>
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            {job.location && (
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <MapPin size={11} />{job.location}
              </span>
            )}
            {job.country && (
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Globe size={11} />{job.country}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-slate-500">
              {workTypeIcon(job.workType)}{job.workType}
            </span>
            {job.visaSponsorship && (
              <span className="text-xs text-emerald-400 font-medium">Visa ✓</span>
            )}
            {job.relocationAssistance && (
              <span className="text-xs text-purple-400 font-medium">Reloc ✓</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {job.url && (
            <a href={job.url} target="_blank" rel="noopener noreferrer"
              className="p-1.5 text-slate-400 hover:text-blue-400 transition-colors">
              <ExternalLink size={14} />
            </a>
          )}
          <button onClick={() => setExpanded(!expanded)}
            className="p-1.5 text-slate-400 hover:text-white transition-colors">
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          <button onClick={() => onDelete(job.id)}
            className="p-1.5 text-slate-400 hover:text-red-400 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-3 pt-3 border-t border-[#1E2D4A] space-y-3">
          <div>
            <label className="text-xs text-slate-400 block mb-1">{tr.status}</label>
            <select
              className="input-field text-xs py-1"
              value={job.status}
              onChange={e => onUpdate(job.id, { status: e.target.value as ApplicationStatus })}
            >
              {(['Saved','Applied','Interview','Offer','Rejected'] as const).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {job.notes !== undefined && (
            <div>
              <label className="text-xs text-slate-400 block mb-1">{tr.notes}</label>
              <textarea
                className="input-field resize-none text-xs"
                rows={2}
                value={job.notes}
                onChange={e => onUpdate(job.id, { notes: e.target.value })}
              />
            </div>
          )}

          {cvText && job.description && (
            <button
              onClick={handleMatch}
              disabled={matching}
              className="flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors disabled:opacity-40"
            >
              {matching ? <><Loader2 size={12} className="animate-spin" />{tr.matching}</> : `⚡ ${tr.matchWithCV}`}
            </button>
          )}
        </div>
      )}
    </div>
  )
}
