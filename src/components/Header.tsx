import { useState } from 'react'
import { Settings, X, Upload, Eye, EyeOff } from 'lucide-react'
import type { Language } from '../types'
import { t } from '../i18n'

interface Props {
  lang: Language
  setLang: (l: Language) => void
  cvText: string
  setCvText: (s: string) => void
}

export function Header({ lang, setLang, cvText, setCvText }: Props) {
  const tr = t[lang]
  const [open, setOpen] = useState(false)
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('nevlio_apikey') || '')
  const [showKey, setShowKey] = useState(false)
  const [betaEmail, setBetaEmail] = useState('')
  const [betaJoined, setBetaJoined] = useState(false)

  const saveKey = () => {
    localStorage.setItem('nevlio_apikey', apiKey)
    setOpen(false)
  }

  const handleCV = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setCvText(ev.target?.result as string || '')
    reader.readAsText(file)
  }

  return (
    <header className="border-b border-[#1E2D4A] bg-[#0A0F1E]/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">N</span>
          </div>
          <span className="text-white font-semibold text-base">{tr.appName}</span>
          <span className="text-xs text-slate-500 hidden sm:block">— {tr.tagline}</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-[#1E2D4A] overflow-hidden">
            {(['tr', 'en'] as Language[]).map(l => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2.5 py-1 text-xs font-medium transition-colors ${lang === l ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button onClick={() => setOpen(true)}
            className="p-2 text-slate-400 hover:text-white transition-colors">
            <Settings size={16} />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0F1629] border border-[#1E2D4A] rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-[#1E2D4A]">
              <h2 className="text-lg font-semibold text-white">{tr.settings}</h2>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
            </div>

            <div className="p-5 space-y-5">
              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">{tr.enterApiKey}</label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type={showKey ? 'text' : 'password'}
                      className="input-field pr-9 text-sm"
                      value={apiKey}
                      onChange={e => setApiKey(e.target.value)}
                      placeholder="sk-ant-..."
                    />
                    <button onClick={() => setShowKey(!showKey)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                      {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  <button onClick={saveKey}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 rounded-lg text-sm font-medium transition-colors">
                    {tr.saveApiKey}
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-1">{tr.apiKeyInfo}</p>
              </div>

              <div>
                <label className="text-xs text-slate-400 mb-1.5 block">{tr.uploadCV}</label>
                <label className="flex items-center gap-2 border border-dashed border-[#1E2D4A] hover:border-blue-500 rounded-lg p-3 cursor-pointer transition-colors">
                  <Upload size={16} className="text-blue-400" />
                  <span className="text-sm text-slate-300">
                    {cvText ? '✓ CV yüklendi' : 'CV dosyası seç (.txt, .pdf)'}
                  </span>
                  <input type="file" accept=".txt,.pdf" className="hidden" onChange={handleCV} />
                </label>
              </div>

              <div className="border-t border-[#1E2D4A] pt-5">
                <h3 className="text-sm font-medium text-white mb-1">{tr.betaAccess}</h3>
                <p className="text-xs text-slate-400 mb-3">{tr.betaDesc}</p>
                {betaJoined ? (
                  <p className="text-sm text-green-400">{tr.thankYou}</p>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="email"
                      className="input-field flex-1 text-sm"
                      placeholder={tr.email}
                      value={betaEmail}
                      onChange={e => setBetaEmail(e.target.value)}
                    />
                    <button
                      onClick={() => betaEmail && setBetaJoined(true)}
                      className="bg-blue-600 hover:bg-blue-500 text-white px-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                    >
                      {tr.joinBeta}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
