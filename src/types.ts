export type ApplicationStatus = 'Saved' | 'Applied' | 'Interview' | 'Offer' | 'Rejected'

export interface JobApplication {
  id: string
  company: string
  title: string
  location: string
  country: string
  workType: 'Remote' | 'Hybrid' | 'On-site'
  visaSponsorship: boolean
  relocationAssistance: boolean
  englishRequired: boolean
  status: ApplicationStatus
  url: string
  description: string
  matchScore?: number
  notes: string
  createdAt: string
  appliedAt?: string
}

export type Language = 'tr' | 'en'

export interface Filters {
  status: ApplicationStatus | 'All'
  workType: 'Remote' | 'Hybrid' | 'On-site' | 'All'
  country: string
  visaSponsorship: boolean | null
  relocationAssistance: boolean | null
  englishRequired: boolean | null
}
