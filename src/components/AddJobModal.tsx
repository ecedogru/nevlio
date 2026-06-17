import { useState } from 'react'
import { X, Loader2, Link } from 'lucide-react'
import type { JobApplication } from '../types'
import { parseJobPosting } from '../claude'
import { t } from '../i18n'

interface Props {
  lang: 'tr' | 'en'
  onSave: (job: JobApplication) => void
  onClose: () => void
}

const blank = (): Partial<JobApplication> => ({
  company: '', title: '', location: '', country: '',
  workType: 'Remote', visaSponsorship: false,
  relocationAssistance: false, englishRequired: true,
  status: 'Saved', url: '', description: '', notes: '',
})

export function AddJobModal({ lang, onSave, onClose }: Props) {
  const tr = t[lang]
  const [tab, setTab] = useState<'ai' | 'manual'>('ai')
  const [text, setText] = useState('')
  const [form, setForm] = useState<Partial<JobApplication>>(blank())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleParse = async () => {
    if (!text.trim()) return
    setLoading(true)
    setError('')
    try {
      const parsed = await parseJobPosting(text)
      setForm(prev => ({ ...prev, ...parsed, description: text }))
      setTab('manual')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Parse failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = () => {
    if (!form.company || !form.title) return
    const job: JobApplication = {
      id: crypto.randomUUID(),
      company: form.company || '',
      title: form.title || '',
      location: form.location || '',
      country: form.country || '',
      workType: form.workType || 'Remote',
      visaSponsorship: form.visaSponsorship || false,
      relocationAssistance: form.relocationAssistance || false,
      englishRequired: form.englishRequired !== false,
      status: form.status || 'Saved',
      url: form.url || '',
      description: form.description || '',
      notes: form.notes || '',
      createdAt: new Date().toISOString(),
    }
    onSave(job)
    onClose()
  }

  const set = (k: keyof JobApplication, v: unknown) =>
    setForm(prev => ({ ...prev, [k]: v }))

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#0F1629] border border-[#1E2D4A] rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-[#1E2D4A]">
          <h2 className="text-lg font-semibold text-white">{tr.addJob}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white"><X size={20} /></button>
        </div>

        <div className="flex border-b border-[#1E2D4A]">
          <button
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${tab === 'ai' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:text-white'}`}
            onClick={() => setTab('ai')}
          >AI Parse</button>
          <button
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${tab === 'manual' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-slate-400 hover:text-white'}`}
            onClick={() => setTab('manual')}
          >{tr.addManually}</button>
        </div>

        <div className="p-5 space-y-4">
          {tab === 'ai' && (
            <>
              <textarea
                className="w-full bg-[#1A2744] border border-[#1E2D4A] rounded-lg p-3 text-sm text-slate-200 placeholder-slate-500 resize-none focus:outline-none focus:border-blue-500"
                rows={8}
                placeholder={tr.pasteLinkedIn}
                value={text}
                onChange={e => setText(e.target.value)}
              />
              {error && <p className="text-red-400 text-sm">{error}</p>}
              <button
                onClick={handleParse}
                disabled={loading || !text.trim()}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-lg py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
              >
                {loading ? <><Loader2 size={16} className="animate-spin" />{tr.parsing}</> : tr.parseJob}
              </button>
            </>
          )}

          {tab === 'manual' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">{tr.company} *</label>
                  <input className="input-field" value={form.company} onChange={e => set('company', e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">{tr.title} *</label>
                  <input className="input-field" value={form.title} onChange={e => set('title', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">{tr.location}</label>
                  <input className="input-field" value={form.location} onChange={e => set('location', e.target.value)} />
                </div>
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">{tr.country}</label>
                  <input className="input-field" value={form.country} onChange={e => set('country', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">{tr.workType}</label>
                <select className="input-field" value={form.workType} onChange={e => set('workType', e.target.value)}>
                  <option value="Remote">{tr.remote}</option>
                  <option value="Hybrid">{tr.hybrid}</option>
                  <option value="On-site">{tr.onsite}</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">{tr.status}</label>
                <select className="input-field" value={form.status} onChange={e => set('status', e.target.value)}>
                  {(['Saved','Applied','Interview','Offer','Rejected'] as const).map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-4">
                {[
                  { key: 'visaSponsorship', label: tr.visa },
                  { key: 'relocationAssistance', label: tr.relocation },
                  { key: 'englishRequired', label: tr.english },
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!form[key as keyof JobApplication]}
                      onChange={e => set(key as keyof JobApplication, e.target.checked)}
                      className="w-4 h-4 rounded accent-blue-500"
                    />
                    {label}
                  </label>
                ))}
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 flex items-center gap-1 block">
                  <Link size={12} />{tr.jobUrl}
                </label>
                <input className="input-field" value={form.url} onChange={e => set('url', e.target.value)} placeholder="https://linkedin.com/jobs/..." />
              </div>
              <div>
                <label className="text-xs text-slate-400 mb-1 block">{tr.notes}</label>
                <textarea className="input-field resize-none" rows={3} value={form.notes} onChange={e => set('notes', e.target.value)} />
              </div>
            </div>
          )}
        </div>

        {tab === 'manual' && (
          <div className="flex gap-3 p-5 border-t border-[#1E2D4A]">
            <button onClick={onClose} className="flex-1 border border-[#1E2D4A] text-slate-300 hover:text-white rounded-lg py-2.5 text-sm transition-colors">
              {tr.cancel}
            </button>
            <button
              onClick={handleSave}
              disabled={!form.company || !form.title}
              className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
            >
              {tr.save}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
