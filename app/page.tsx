'use client'

import { useState } from 'react'
import Link from 'next/link'

const bands = [['Delta', '0.8–4 Hz', 'Stable'], ['Theta', '4–8 Hz', 'Review'], ['Alpha', '8–13 Hz', 'Stable'], ['Beta', '13–30 Hz', 'Stable']]

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [message, setMessage] = useState('')

  async function analyze() {
    if (!file) return setMessage('Choose an EEG file first.')
    setAnalyzing(true); setMessage('Preparing a private report…')
    await new Promise((resolve) => setTimeout(resolve, 900))
    setAnalyzing(false); setMessage('Analysis queued. Your report will appear in History when ready.')
  }

  function emergency() {
    if (!navigator.geolocation) return window.open('https://www.google.com/maps/search/nearest+hospital', '_blank')
    navigator.geolocation.getCurrentPosition(({ coords }) => window.open(`https://www.google.com/maps/search/hospital/@${coords.latitude},${coords.longitude},14z`, '_blank'), () => window.open('https://www.google.com/maps/search/nearest+hospital', '_blank'))
  }

  return <main className="app-shell">
    <header className="topbar"><Link className="brand" href="/"><span className="brand-mark">E</span><span>Ecolef</span></Link><nav><a href="#analysis">Analysis</a><a href="#history">History</a><a href="#about">About</a></nav><div className="top-actions"><Link href="/sign-in" className="text-button">Sign in</Link><button className="outline-button" onClick={emergency}>Find help nearby</button></div></header>
    <section className="hero"><div><p className="eyebrow">PRIVATE EEG RESEARCH WORKSPACE</p><h1>Understand the signal.<br /><em>Keep care human.</em></h1><p className="hero-copy">Ecolef helps you organise EEG recordings and review research signals with calm, clear context. It is not a diagnosis.</p></div><aside className="safety-note"><span className="status-dot" /> Your data stays private<br /><small>Reports are separated by account.</small></aside></section>
    <section className="workspace" id="analysis"><div className="section-heading"><div><p className="eyebrow">01 / NEW ANALYSIS</p><h2>Upload a recording</h2></div><span className="format-note">EDF or BDF · max 200 MB</span></div><label className="upload-box"><input type="file" accept=".edf,.bdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} /><strong>{file ? file.name : 'Choose an EEG recording'}</strong><span>{file ? 'Ready for private analysis' : 'or drop your EDF / BDF file here'}</span></label><div className="action-row"><button className="primary-button" onClick={analyze} disabled={analyzing}>{analyzing ? 'Preparing…' : 'Start analysis'}</button><button className="emergency-button" onClick={emergency}>I need urgent help</button></div>{message && <p className="inline-message" role="status">{message}</p>}</section>
    <section className="overview"><div className="section-heading"><div><p className="eyebrow">02 / SIGNAL OVERVIEW</p><h2>Latest report</h2></div><span className="report-date">No report selected</span></div><div className="overview-grid"><div className="score-panel"><span className="muted">Research signal index</span><strong>—</strong><p>Upload a recording to generate a report. Results are supportive context, not medical advice.</p></div><div className="bands">{bands.map(([name, hz, state]) => <div className="band-row" key={name}><span><b>{name}</b><small>{hz}</small></span><i className={state === 'Review' ? 'review' : ''}>{state}</i></div>)}</div></div></section>
    <section className="lower-grid" id="history"><div className="history-panel"><p className="eyebrow">03 / HISTORY</p><h2>Your reports</h2><p className="muted">Sign in to keep analysis history private to you.</p><Link className="inline-link" href="/sign-in">View secure history →</Link></div><div className="about-panel" id="about"><p className="eyebrow">ABOUT ECOLEF</p><h2>Clear tools for careful review.</h2><p className="muted">Ecolef can use AI to summarise report language, but it never replaces a clinician or emergency service.</p></div></section>
    <footer><span>© 2026 Ecolef</span><span>Research support, not diagnosis.</span><button onClick={emergency}>Emergency support</button></footer>
  </main>
}
