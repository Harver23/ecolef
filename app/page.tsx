'use client'

import { useState } from 'react'

const bands = [
  { label: 'Delta', value: '18.4 µV²', width: '58%' },
  { label: 'Theta', value: '12.1 µV²', width: '42%' },
  { label: 'Alpha', value: '9.8 µV²', width: '34%' },
  { label: 'Beta', value: '6.2 µV²', width: '23%' },
]

export default function Page() {
  const [fileName, setFileName] = useState('')

  return (
    <main className="app-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="NeuroMark home">
          <span className="brand-mark" aria-hidden="true">N</span>
          <span>NeuroMark</span>
        </a>
        <nav className="topnav" aria-label="Main navigation">
          <a href="#analysis">Analysis</a>
          <a href="#history">History</a>
          <a href="#about">About</a>
        </nav>
        <button className="profile-button" type="button" aria-label="Open profile">DR</button>
      </header>

      <div className="content-wrap" id="top">
        <section className="intro" id="analysis">
          <div>
            <p className="eyebrow">EEG ANALYSIS</p>
            <h1>Understand the signal.</h1>
            <p className="intro-copy">Upload an EEG recording to review signal quality and depression-related patterns.</p>
          </div>
          <div className="privacy-note"><span className="status-dot" /> Private workspace</div>
        </section>

        <section className="workspace-grid" aria-label="EEG analysis workspace">
          <div className="panel upload-panel">
            <div className="panel-heading">
              <div>
                <p className="section-label">01 / RECORDING</p>
                <h2>Upload EEG file</h2>
              </div>
              <span className="file-type">EDF · BDF</span>
            </div>
            <label className="dropzone">
              <input type="file" accept=".edf,.bdf" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')} />
              <span className="upload-icon" aria-hidden="true">↑</span>
              <strong>{fileName || 'Choose a recording'}</strong>
              <span>{fileName ? 'Ready for analysis' : 'or drag and drop it here'}</span>
            </label>
            <div className="upload-meta"><span>Max file size 500 MB</span><span>Data stays private</span></div>
            <button className="primary-button" type="button">Start analysis <span aria-hidden="true">→</span></button>
          </div>

          <div className="panel overview-panel">
            <div className="panel-heading">
              <div>
                <p className="section-label">02 / OVERVIEW</p>
                <h2>Latest analysis</h2>
              </div>
              <span className="quiet-label">Sample result</span>
            </div>
            <div className="result-state"><span className="result-dot" /><span>Analysis complete</span><time>Today, 13:42</time></div>
            <div className="score-row"><div><span className="metric-label">Pattern score</span><strong>0.68</strong></div><span className="score-caption">Moderate indication</span></div>
            <div className="meter"><span /></div>
            <p className="disclaimer">This score is a research signal, not a medical diagnosis.</p>
            <a className="text-link" href="#details">View detailed report <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <section className="lower-grid" id="history">
          <div className="panel signal-panel">
            <div className="panel-heading"><div><p className="section-label">SIGNAL PROFILE</p><h2>Frequency bands</h2></div><span className="quiet-label">Relative power</span></div>
            <div className="band-list">{bands.map((band) => <div className="band-row" key={band.label}><span>{band.label}</span><div className="band-track"><span style={{ width: band.width }} /></div><strong>{band.value}</strong></div>)}</div>
          </div>
          <aside className="panel history-panel">
            <p className="section-label">RECENT FILES</p>
            <h2>Analysis history</h2>
            <div className="history-item"><span className="file-icon">EDF</span><div><strong>session_04.edf</strong><small>Today · Complete</small></div><span className="history-score">0.68</span></div>
            <div className="history-item"><span className="file-icon">EDF</span><div><strong>baseline.edf</strong><small>Sep 24 · Complete</small></div><span className="history-score">0.41</span></div>
            <a className="text-link" href="#all-history">See all history <span aria-hidden="true">→</span></a>
          </aside>
        </section>

        <footer id="about"><span>NeuroMark · Research workspace</span><span>For research use only</span></footer>
      </div>
    </main>
  )
}
