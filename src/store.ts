import { useState, useEffect } from 'react'
import type { JobApplication, Filters, Language } from './types'

const STORAGE_KEY = 'nevlio_jobs'
const LANG_KEY = 'nevlio_lang'
const CV_KEY = 'nevlio_cv'

export function useJobStore() {
  const [jobs, setJobs] = useState<JobApplication[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  const [lang, setLang] = useState<Language>(() =>
    (localStorage.getItem(LANG_KEY) as Language) || 'tr'
  )

  const [cvText, setCvText] = useState<string>(() =>
    localStorage.getItem(CV_KEY) || ''
  )

  const [filters, setFilters] = useState<Filters>({
    status: 'All',
    workType: 'All',
    country: '',
    visaSponsorship: null,
    relocationAssistance: null,
    englishRequired: null,
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
  }, [jobs])

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang)
  }, [lang])

  useEffect(() => {
    localStorage.setItem(CV_KEY, cvText)
  }, [cvText])

  const addJob = (job: JobApplication) => setJobs(prev => [job, ...prev])

  const updateJob = (id: string, updates: Partial<JobApplication>) =>
    setJobs(prev => prev.map(j => (j.id === id ? { ...j, ...updates } : j)))

  const deleteJob = (id: string) =>
    setJobs(prev => prev.filter(j => j.id !== id))

  const filteredJobs = jobs.filter(job => {
    if (filters.status !== 'All' && job.status !== filters.status) return false
    if (filters.workType !== 'All' && job.workType !== filters.workType) return false
    if (filters.country && !job.country.toLowerCase().includes(filters.country.toLowerCase())) return false
    if (filters.visaSponsorship !== null && job.visaSponsorship !== filters.visaSponsorship) return false
    if (filters.relocationAssistance !== null && job.relocationAssistance !== filters.relocationAssistance) return false
    if (filters.englishRequired !== null && job.englishRequired !== filters.englishRequired) return false
    return true
  })

  return { jobs: filteredJobs, allJobs: jobs, addJob, updateJob, deleteJob, lang, setLang, cvText, setCvText, filters, setFilters }
}
