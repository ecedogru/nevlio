import Anthropic from '@anthropic-ai/sdk'
import type { JobApplication } from './types'

function getClient() {
  const key = localStorage.getItem('nevlio_apikey') || ''
  return new Anthropic({ apiKey: key, dangerouslyAllowBrowser: true })
}

export async function parseJobPosting(text: string): Promise<Partial<JobApplication>> {
  const client = getClient()
  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `Extract job info from this posting and return ONLY valid JSON with these fields:
{
  "company": string,
  "title": string,
  "location": string,
  "country": string,
  "workType": "Remote" | "Hybrid" | "On-site",
  "visaSponsorship": boolean,
  "relocationAssistance": boolean,
  "englishRequired": boolean
}

Job posting:
${text}`
    }]
  })

  const content = msg.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response')
  const jsonMatch = content.text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No JSON found')
  return JSON.parse(jsonMatch[0])
}

export async function matchJobWithCV(jobDescription: string, cvText: string): Promise<number> {
  const client = getClient()
  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 256,
    messages: [{
      role: 'user',
      content: `Compare this CV with the job description and return ONLY a number from 0-100 representing match percentage. No explanation, just the number.

CV:
${cvText}

Job Description:
${jobDescription}`
    }]
  })

  const content = msg.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response')
  const num = parseInt(content.text.trim().replace(/\D/g, ''), 10)
  return isNaN(num) ? 50 : Math.min(100, Math.max(0, num))
}
