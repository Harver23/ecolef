'use client'

import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'

type Reading = { id: string; heartRate: number | null; spo2: number | null; systolic: number | null; diastolic: number | null; note: string | null; measuredAt: string }

export default function VitalsPage() {
  const [readings, setReadings] = useState<Reading[]>([])
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { fetch('/api/vitals').then(async (response) => response.ok ? setReadings((await response.json()).readings) : null) }, [])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSaving(true)
    setMessage('')
    const form = new FormData(event.currentTarget)
    const response = await fetch('/api/vitals', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(form)) })
    const result = await response.json()
    if (!response.ok) setMessage(result.error ?? 'Could not save this reading.')
    else { setMessage('Reading saved privately.'); event.currentTarget.reset(); const latest = await fetch('/api/vitals'); if (latest.ok) setReadings((await latest.json()).readings) }
    setSaving(false)
  }

  return <main className="vitals-page"><header className="workspace-nav"><Link className="brand" href="/"><span className="brand-mark">E</span><span>Ecolef</span></Link><Link className="back-link" href="/">← Home</Link></header><section className="vitals-intro"><p className="eyebrow">PRIVATE WELLBEING LOG</p><h1>Notice the body.<br /><em>Keep context close.</em></h1><p>Record readings from your fingertip monitor and blood-pressure device. These measurements are for personal context, not diagnosis.</p><div className="measurement-guide"><span className="status-dot" /> Take readings while seated and rested, then save the context around them.</div></section><section className="vitals-grid"><form className="vitals-form" onSubmit={submit}><div className="panel-heading"><p className="eyebrow">NEW READING</p><span>Manual entry</span></div><div className="field-grid"><label>Heart rate <span>bpm</span><input name="heartRate" type="number" inputMode="numeric" min="25" max="240" placeholder="72" aria-label="Heart rate in beats per minute" /></label><label>SpO₂ <span>%</span><input name="spo2" type="number" inputMode="numeric" min="50" max="100" placeholder="98" aria-label="Blood oxygen saturation percentage" /></label><label>Systolic <span>mmHg</span><input name="systolic" type="number" inputMode="numeric" min="50" max="260" placeholder="120" aria-label="Systolic blood pressure" /></label><label>Diastolic <span>mmHg</span><input name="diastolic" type="number" inputMode="numeric" min="30" max="180" placeholder="80" aria-label="Diastolic blood pressure" /></label></div><div className="measurement-tips"><p className="eyebrow">BEFORE YOU SAVE</p><ul><li>Rest quietly for five minutes.</li><li>Keep your arm supported for blood pressure.</li><li>Save one reading at a time.</li></ul></div><label className="note-field">Context note <span>optional</span><textarea name="note" placeholder="Resting, after activity, symptoms, medication…" rows={3} /></label><button className="primary-button" disabled={saving}>{saving ? 'Saving…' : 'Save private reading'} <span>↗</span></button>{message && <p className="form-message" role="status">{message}</p>}</form><div className="history-panel"><div className="panel-heading"><p className="eyebrow">RECENT READINGS</p><span>{readings.length} saved</span></div>{readings.length === 0 ? <div className="empty-reading"><strong>Your first reading will appear here.</strong><p>Use the devices you have, then add the surrounding context so changes are easier to notice.</p></div> : <div className="reading-list">{readings.map((reading) => <article key={reading.id}><time>{new Date(reading.measuredAt).toLocaleString()}</time><div><b>{reading.heartRate ? `${reading.heartRate} bpm` : '—'}</b><b>{reading.spo2 ? `${reading.spo2}% SpO₂` : '—'}</b><b>{reading.systolic && reading.diastolic ? `${reading.systolic}/${reading.diastolic}` : '—'} <small>mmHg</small></b></div>{reading.note && <p>{reading.note}</p>}</article>)}</div>}</div></section><p className="safety-note"><span className="status-dot" /> Ecolef stores readings for your private workspace. If you feel unwell or are worried about a reading, contact a qualified healthcare professional or local emergency services.</p></main>
}
