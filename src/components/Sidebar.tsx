import { SlidersHorizontal, X } from 'lucide-react'
import type { Filters, Language } from '../types'
import { t } from '../i18n'

interface Props {
  filters: Filters
  setFilters: (f: Filters) => void
  lang: Language
}

const tri = (val: boolean | null, yes: string, no: string) => (
  <select
    className="input-field text-xs py-1"
    value={val === null ? '' : val ? 'true' : 'false'}
    onChange={e => {
      const v = e.target.value
      return v === '' ? null : v === 'true'
    }}
  >
    <option value="">All</option>
    <option value="true">{yes}</option>
    <option value="false">{no}</option>
  </select>
)

export function Sidebar({ filters, setFilters, lang }: Props) {
  const tr = t[lang]
  const hasFilters = filters.status !== 'All' || filters.workType !== 'All' || filters.country ||
    filters.visaSponsorship !== null || filters.relocationAssistance !== null || filters.englishRequired !== null

  const update = (k: keyof Filters, v: unknown) => setFilters({ ...filters, [k]: v })

  const clear = () => setFilters({
    status: 'All', workType: 'All', country: '',
    visaSponsorship: null, relocationAssistance: null, englishRequired: null
  })

  const triSelect = (key: keyof Filters, label: string) => (
    <div>
      <label className="text-xs text-slate-400 mb-1 block">{label}</label>
      <select
        className="input-field text-xs py-1"
        value={filters[key] === null ? '' : filters[key] ? 'true' : 'false'}
        onChange={e => {
          const v = e.target.value
          update(key, v === '' ? null : v === 'true')
        }}
      >
        <option value="">{tr.all}</option>
        <option value="true">{tr.yes}</option>
        <option value="false">{tr.no}</option>
      </select>
    </div>
  )

  return (
    <aside className="w-56 shrink-0">
      <div className="flex items-center justify-between mb-4">
        <span className="flex items-center gap-2 text-sm font-medium text-white">
          <SlidersHorizontal size={15} />{tr.filters}
        </span>
        {hasFilters && (
          <button onClick={clear} className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300">
            <X size={12} />{tr.clearFilters}
          </button>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-slate-400 mb-1 block">{tr.status}</label>
          <select className="input-field text-xs py-1" value={filters.status}
            onChange={e => update('status', e.target.value)}>
            <option value="All">{tr.all}</option>
            {(['Saved','Applied','Interview','Offer','Rejected'] as const).map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-slate-400 mb-1 block">{tr.workType}</label>
          <select className="input-field text-xs py-1" value={filters.workType}
            onChange={e => update('workType', e.target.value)}>
            <option value="All">{tr.all}</option>
            <option value="Remote">{tr.remote}</option>
            <option value="Hybrid">{tr.hybrid}</option>
            <option value="On-site">{tr.onsite}</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-slate-400 mb-1 block">{tr.country}</label>
          <input className="input-field text-xs py-1" value={filters.country}
            placeholder="e.g. Germany"
            onChange={e => update('country', e.target.value)} />
        </div>

        {triSelect('visaSponsorship', tr.visa)}
        {triSelect('relocationAssistance', tr.relocation)}
        {triSelect('englishRequired', tr.english)}
      </div>
    </aside>
  )
}

void tri // suppress unused warning
