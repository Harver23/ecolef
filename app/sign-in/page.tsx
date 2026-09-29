'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AuthForm } from '@/components/auth-form'

const slides = [
  { label: 'ECOLEF / 01', title: <>Understand the signal.<br /><em>Keep care human.</em></>, copy: 'Research support for EEG review, wellbeing context, and careful next steps.' },
  { label: 'ECOLEF / 02', title: <>See patterns.<br /><em>Keep context close.</em></>, copy: 'Review signal quality, frequency bands, and wellbeing notes in one private workspace.' },
  { label: 'ECOLEF / 03', title: <>Make room for<br /><em>human judgment.</em></>, copy: 'Ecolef supports research and clinician-led review. It does not diagnose on its own.' },
]

export default function SignInPage() {
  const [slide, setSlide] = useState(0)
  const current = slides[slide]

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((value) => (value + 1) % slides.length), 5200)
    return () => window.clearInterval(timer)
  }, [])

  return <main className="auth-shell"><section className="auth-card"><div className="auth-brand-row"><Link className="auth-brand" href="/" aria-label="Return to Ecolef home"><span className="brand-mark">E</span><span>Ecolef <small>/ private workspace</small></span></Link><Link className="auth-back" href="/"><span aria-hidden="true">←</span> Back to Ecolef</Link></div><div className="auth-intro"><p className="eyebrow">PRIVATE EEG & WELLBEING WORKSPACE</p><h1>Welcome back.</h1><p className="muted">Sign in to review your EEG reports and saved safety contacts.</p></div><AuthForm mode="sign-in" /><div className="auth-trust"><span className="trust-dot" /> Your data stays private by account</div><p className="auth-switch">New to Ecolef? <Link href="/sign-up">Create an account</Link></p></section><aside className="auth-aside" aria-live="polite"><div className="slide-meta"><p className="eyebrow">{current.label}</p><span>{String(slide + 1).padStart(2, '0')} / 03</span></div><div className="slide-content"><h2>{current.title}</h2><p>{current.copy}</p></div><div className="slide-footer"><div className="slide-dots" aria-label="Login message slides">{slides.map((item, index) => <button key={item.label} className={index === slide ? 'active' : ''} onClick={() => setSlide(index)} aria-label={`Show slide ${index + 1}`} />)}</div><div className="aside-line" /></div></aside></main>
}
