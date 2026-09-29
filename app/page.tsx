'use client'

import Link from 'next/link'
import { useState } from 'react'

const slides = [
  { number: '01', label: 'What is Ecolef?', title: 'A quieter way to review the signal.', copy: 'Ecolef is a private workspace for organizing EEG-related information, analysis results, and wellbeing research in one place.', kind: 'signal' },
  { number: '02', label: 'What we do', title: 'Signal review with human context.', copy: 'Review recordings, keep wellbeing context close, and explore research material without turning a signal into a diagnosis.', kind: 'cards' },
  { number: '03', label: 'How it works', title: 'From signal to understanding.', copy: 'Upload a file, review the available analysis, explore supporting information, then discuss medical concerns with a qualified professional.', kind: 'steps' },
  { number: '04', label: 'Privacy & safety', title: 'Your information stays personal.', copy: 'Your workspace is private by account. Ecolef is research and educational support, not medical diagnosis.', kind: 'privacy' },
]

export default function Home() {
  const [slide, setSlide] = useState(0)
  const current = slides[slide]

  return <main>
    <header className="public-nav">
      <Link className="brand" href="/"><span className="brand-mark">E</span><span>Ecolef</span></Link>
      <nav><a href="#how-it-works">How it works</a><a href="#safety">Safety</a><Link href="/sign-in">Sign in</Link><Link className="nav-cta" href="/sign-in">Enter Ecolef</Link></nav>
    </header>

    <section className="landing-hero">
      <div className="hero-copy"><p className="eyebrow">PRIVATE EEG & WELLBEING WORKSPACE</p><h1>Understand the signal.<br /><em>Keep care human.</em></h1><p className="hero-lede">Ecolef brings EEG review, wellbeing context, and careful research tools into one quiet workspace for individuals, researchers, and clinicians.</p><div className="hero-actions"><Link className="primary-button" href="/sign-in">Enter Ecolef <span>↗</span></Link><a className="text-link" href="#how-it-works">How Ecolef works <span>↓</span></a></div><div className="trust-row"><span><i className="status-dot" />Private by account</span><span>Research support, not diagnosis.</span></div></div>
      <div className="signal-hero" aria-label="Abstract EEG signal visualization"><div className="signal-label">LIVE SIGNAL / RESEARCH VIEW</div><svg viewBox="0 0 520 270" role="img" aria-label="Minimal waveform"><path d="M0 152 H70 L88 151 L101 146 L111 157 L122 149 L135 151 L146 150 L156 82 L168 218 L182 151 H228 L244 150 L258 152 L272 122 L286 179 L300 149 H350 L363 150 L376 95 L390 205 L405 150 H462 L476 148 L490 151 H520" /></svg><div className="signal-footer"><span>Signal review</span><span>01 / 04</span></div></div>
    </section>

    <section className="info-section" id="how-it-works"><div className="section-intro"><p className="eyebrow">A CLEARER START</p><h2>Built to make complex information feel considered.</h2><p>Move through Ecolef at your own pace. Each screen has one job, one clear next step, and the right amount of context.</p></div><div className="slide-frame"><div className="slide-top"><span>{current.number} / 04</span><span>{current.label}</span></div><div className={`slide-content ${current.kind}`}><div><h3>{current.title}</h3><p>{current.copy}</p></div>{current.kind === 'cards' && <div className="mini-cards"><span>EEG REVIEW</span><span>WELLBEING CONTEXT</span><span>RESEARCH TOOLS</span></div>}{current.kind === 'steps' && <div className="mini-steps"><span><b>01</b> Upload</span><span><b>02</b> Analyze</span><span><b>03</b> Review</span><span><b>04</b> Understand</span></div>}{current.kind === 'privacy' && <div className="privacy-note"><b>PRIVATE BY ACCOUNT</b><span>Secure storage · Safety first</span></div>}{current.kind === 'signal' && <svg className="slide-wave" viewBox="0 0 320 100"><path d="M0 54 H45 L59 53 L72 48 L82 60 L95 53 L110 54 L124 53 L137 18 L148 87 L160 54 H214 L230 52 L244 55 L259 37 L271 70 L286 53 H320" /></svg>}</div><div className="slide-controls"><button aria-label="Previous slide" onClick={() => setSlide((slide + 3) % 4)}>←</button><div className="slide-dots">{slides.map((item, index) => <button aria-label={`Go to slide ${index + 1}`} className={index === slide ? 'selected' : ''} key={item.number} onClick={() => setSlide(index)} />)}</div><button aria-label="Next slide" onClick={() => setSlide((slide + 1) % 4)}>→</button></div></div></section>

    <section className="principles" id="safety"><div><p className="eyebrow">THE ECOLEF PROMISE</p><h2>Scientific enough to be useful.<br /><em>Human enough to be safe.</em></h2></div><div className="principle-list"><div><b>01</b><span>Keep context close</span><p>Signals are reviewed alongside the information that gives them meaning.</p></div><div><b>02</b><span>Make uncertainty visible</span><p>Educational insights are never presented as certainty or diagnosis.</p></div><div><b>03</b><span>Protect the person first</span><p>Private accounts, safety resources, and human care stay at the centre.</p></div></div></section>
    <footer><Link className="brand" href="/"><span className="brand-mark">E</span><span>Ecolef</span></Link><span>EEG review & wellbeing research</span><span>© 2026 Ecolef</span></footer>
  </main>
}
