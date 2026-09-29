'use client'

import { useState } from 'react'
import Link from 'next/link'

const bands = [
  ['Delta', '0.8–4 Hz', 'Stable'],
  ['Theta', '4–8 Hz', 'Review'],
  ['Alpha', '8–13 Hz', 'Stable'],
  ['Beta', '13–30 Hz', 'Stable'],
]

const modules = [
  ['EEG review', 'Inspect recordings, quality, and frequency bands.'],
  ['Wellbeing log', 'Add mood, sleep, and symptom context over time.'],
  ['Research studies', 'Organise cohorts, labels, and consented datasets.'],
]

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [message, setMessage] = useState('')
  const [activeView, setActiveView] = useState<'overview' | 'history' | 'safety' | 'admin'>('overview')

  async function analyze() {
    if (!file) return setMessage('Choose an EEG file first.')
    setAnalyzing(true)
    setMessage('Preparing a private report…')
    await new Promise((resolve) => setTimeout(resolve, 900))
    setAnalyzing(false)
    setMessage('Analysis queued. Your report will appear in History when ready.')
  }

  function emergency() {
    const fallback = () => window.open('https://www.google.com/maps/search/nearest+hospital', '_blank')
    if (!navigator.geolocation) return fallback()
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => window.open(`https://www.google.com/maps/search/hospital/@${coords.latitude},${coords.longitude},14z`, '_blank'),
      fallback,
    )
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <Link className="brand" href="/"><span className="brand-mark">E</span><span>Ecolef</span></Link>
        <nav aria-label="Primary navigation"><a href="#analysis">Analysis</a><button onClick={() => setActiveView('history')}>History</button><a href="#about">About</a><button onClick={() => setActiveView('admin')}>Admin demo</button></nav>
        <div className="top-actions"><Link href="/sign-in" className="text-button">Sign in</Link><button className="outline-button" onClick={emergency}>Find help nearby</button></div>
      </header>

      <section className="hero">
        <div><p className="eyebrow">PRIVATE EEG AND WELLBEING WORKSPACE</p><h1>Understand the signal.<br /><em>Keep care human.</em></h1><p className="hero-copy">Ecolef brings EEG review, wellbeing context, and careful research tools into one quiet workspace for individuals, researchers, and clinicians.</p></div>
        <aside className="safety-note"><span className="status-dot" /> Private by account<br /><small>Research support, not diagnosis.</small></aside>
      </section>

      <div className="workspace-tabs" role="tablist" aria-label="Workspace sections">
        <button className={activeView === 'overview' ? 'active' : ''} onClick={() => setActiveView('overview')}>Overview</button>
        <button className={activeView === 'history' ? 'active' : ''} onClick={() => setActiveView('history')}>History</button>
        <button className={activeView === 'safety' ? 'active' : ''} onClick={() => setActiveView('safety')}>Safety centre</button><button className={activeView === 'admin' ? 'active' : ''} onClick={() => setActiveView('admin')}>Admin demo</button>
      </div>

      {activeView === 'overview' && <>
        <section className="workspace" id="analysis"><div className="section-heading"><div><p className="eyebrow">01 / NEW ANALYSIS</p><h2>Upload a recording</h2></div><span className="format-note">EDF or BDF · max 200 MB</span></div><label className="upload-box"><input type="file" accept=".edf,.bdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} /><strong>{file ? file.name : 'Choose an EEG recording'}</strong><span>{file ? 'Ready for private analysis' : 'or drop your EDF / BDF file here'}</span></label><div className="action-row"><button className="primary-button" onClick={analyze} disabled={analyzing}>{analyzing ? 'Preparing…' : 'Start analysis'}</button><button className="emergency-button" onClick={emergency}>I need urgent help</button></div>{message && <p className="inline-message" role="status">{message}</p>}</section>
        <section className="overview"><div className="section-heading"><div><p className="eyebrow">02 / SIGNAL OVERVIEW</p><h2>Latest report</h2></div><span className="report-date">No report selected</span></div><div className="overview-grid"><div className="score-panel"><span className="muted">Research signal index</span><strong>—</strong><p>Upload a recording to generate supportive context. Ecolef does not diagnose or replace clinical care.</p></div><div className="bands">{bands.map(([name, hz, state]) => <div className="band-row" key={name}><span><b>{name}</b><small>{hz}</small></span><i className={state === 'Review' ? 'review' : ''}>{state}</i></div>)}</div></div></section>
        <section className="module-section" id="about"><div className="section-heading"><div><p className="eyebrow">03 / MORE CONTEXT</p><h2>One workspace, three ways to go deeper.</h2></div></div><div className="module-grid">{modules.map(([title, copy]) => <article className="module" key={title}><h3>{title}</h3><p>{copy}</p><span>Coming next</span></article>)}</div></section>
      </>}

      {activeView === 'history' && <section className="workspace view-panel"><p className="eyebrow">REPORT HISTORY</p><h2>Your private timeline</h2><p className="muted">Sign in to see reports scoped to your account. AI summaries will be clearly marked as generated support, with the original report always available.</p><Link className="primary-link" href="/sign-in">Open secure history</Link></section>}

      {activeView === 'safety' && <section className="workspace view-panel"><p className="eyebrow">SAFETY CENTRE</p><h2>Help is always a human decision.</h2><p className="muted">If you may be in immediate danger, contact local emergency services now. Ecolef can help you find nearby hospitals and prepare trusted contacts, but it cannot monitor emergencies.</p><div className="safety-actions"><button className="primary-button" onClick={emergency}>Find nearby hospital</button><Link className="outline-button" href="/sign-in">Manage trusted contacts</Link></div></section>}

      {activeView === 'admin' && <section className="workspace view-panel"><p className="eyebrow">PUBLIC-SAFE ADMIN PREVIEW</p><h2>Manage access, never passwords.</h2><p className="muted">This portfolio preview shows the control model without exposing real users or credentials. In production, Better Auth stores password hashes that even the master cannot read.</p><div className="admin-grid"><div className="admin-stat"><span>Active accounts</span><strong>128</strong><small>Demo data only</small></div><div className="admin-stat"><span>Reports this month</span><strong>346</strong><small>Aggregated view</small></div><div className="admin-stat"><span>Audit events</span><strong>1,904</strong><small>Access reviewed</small></div></div><div className="admin-table"><div><b>Account</b><b>Role</b><b>Status</b><b>Action</b></div><div><span>demo.researcher@ecolef.test</span><span>Researcher</span><span className="admin-safe">Active</span><button className="text-button">Review access</button></div><div><span>demo.clinician@ecolef.test</span><span>Clinician</span><span className="admin-safe">Active</span><button className="text-button">Review access</button></div></div><p className="admin-footnote">Admin actions are audited. Passwords are never displayed, exported, or recoverable.</p></section>}

      <footer><span>© 2026 Ecolef</span><span>Encrypted account workspace · Research support, not diagnosis.</span><button onClick={emergency}>Emergency support</button></footer>
    </main>
  )
}
