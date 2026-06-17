import LandingPage from './pages/LandingPage'
import { useState } from 'react'
import { Plus, Briefcase } from 'lucide-react'
import { useJobStore } from './store'
import { Header } from './components/Header'
import { Sidebar } from './components/Sidebar'
import { JobCard } from './components/JobCard'
import { AddJobModal } from './components/AddJobModal'
import { t } from './i18n'
import type { ApplicationStatus } from './types'

const STATUS_TABS: Array<ApplicationStatus | 'All'> = ['All', 'Saved', 'Applied', 'Interview', 'Offer', 'Rejected']

export default function App() {
  const store = useJobStore()
  const tr = t[store.lang]
  const [showAdd, setShowAdd] = useState(false)
  const [activeTab, setActiveTab] = useState<ApplicationStatus | 'All'>('All')

  const filteredByTab = activeTab === 'All'
    ? store.jobs
    : store.jobs.filter(j => j.status === activeTab)

  const counts = Object.fromEntries(
    STATUS_TABS.map(s => [s, s === 'All' ? store.allJobs.length : store.allJobs.filter(j => j.status === s).length])
  )

  return (
    <>
    <LandingPage />
    <div className="hidden min-h-screen bg-[#0A0F1E]">
      <Header
        lang={store.lang}
        setLang={store.setLang}
        cvText={store.cvText}
        setCvText={store.setCvText}
      />

      <main className="max-w-5xl mx-auto px-5 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Briefcase size={20} className="text-blue-400" />
            <h1 className="text-xl font-semibold text-white">
              {store.allJobs.length} {store.lang === 'tr' ? 'başvuru' : 'applications'}
            </h1>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={16} />{tr.addJob}
          </button>
        </div>

        <div className="flex gap-1 mb-6 overflow-x-auto pb-1">
          {STATUS_TABS.map(s => (
            <button
              key={s}
              onClick={() => setActiveTab(s)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                activeTab === s
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-[#1A2744]'
              }`}
            >
              {s === 'All' ? tr.all : s}
              <span className={`text-xs rounded-full px-1.5 py-0.5 ${activeTab === s ? 'bg-blue-500' : 'bg-[#1E2D4A] text-slate-400'}`}>
                {counts[s]}
              </span>
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          <Sidebar filters={store.filters} setFilters={store.setFilters} lang={store.lang} />

          <div className="flex-1 min-w-0">
            {filteredByTab.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-[#0F1629] border border-[#1E2D4A] flex items-center justify-center mx-auto mb-4">
                  <Briefcase size={28} className="text-slate-600" />
                </div>
                <p className="text-slate-400 text-sm">{tr.noJobs}</p>
                <button
                  onClick={() => setShowAdd(true)}
                  className="mt-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors mx-auto"
                >
                  <Plus size={16} />{tr.addJob}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredByTab.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    lang={store.lang}
                    cvText={store.cvText}
                    onUpdate={store.updateJob}
                    onDelete={store.deleteJob}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {showAdd && (
        <AddJobModal
          lang={store.lang}
          onSave={store.addJob}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
    </>
  )
}
