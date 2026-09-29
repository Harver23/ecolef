'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AuthForm } from '@/components/auth-form'

const slides = [
  { label: 'ECOLEF / 01', title: <>Start with<br /><em>your signal.</em></>, copy: 'A private place for EEG review, wellbeing context, and careful research.' },
  { label: 'ECOLEF / 02', title: <>Keep reports<br /><em>close to care.</em></>, copy: 'Save your work securely and return to it when you are ready.' },
  { label: 'ECOLEF / 03', title: <>Make room for<br /><em>human judgment.</em></>, copy: 'Ecolef supports research and clinician-led review. It does not diagnose on its own.' },
]

export default function SignUpPage() {
  const [slide, setSlide] = useState(0)
  const current = slides[slide]

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((value) => (value + 1) % slides.length), 5200)
    return () => window.clearInterval(timer)
  }, [])

  return <main className="auth-shell"><section className="auth-card"><div className="auth-brand"><span className="brand-mark">E</span><span>Ecolef <small>/ private workspace</small></span></div><div className="auth-intro"><p className="eyebrow">PRIVATE EEG & WELLBEING WORKSPACE</p><h1>Your private signal workspace.</h1><p className="muted">Create an account to keep reports private and make emergency support easier to reach.</p></div><AuthForm mode="sign-up" /><div className="auth-trust"><span className="trust-dot" /> Private by account from the first upload</div><p className="auth-switch">Already have an account? <Link href="/sign-in">Sign in</Link></p></section><aside className="auth-aside" aria-live="polite"><div className="slide-meta"><p className="eyebrow">{current.label}</p><span>{String(slide + 1).padStart(2, '0')} / 03</span></div><div className="slide-content"><h2>{current.title}</h2><p>{current.copy}</p></div><div className="slide-footer"><div className="slide-dots" aria-label="Signup message slides">{slides.map((item, index) => <button key={item.label} className={index === slide ? 'active' : ''} onClick={() => setSlide(index)} aria-label={`Show slide ${index + 1}`} />)}</div><div className="aside-line" /></div></aside></main>
}
