'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authClient } from '@/lib/auth-client'

export function AuthForm({ mode }: { mode: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault(); setError(''); setBusy(true)
    const result = mode === 'sign-up'
      ? await authClient.signUp.email({ name, email, password })
      : await authClient.signIn.email({ email, password })
    setBusy(false)
    if (result.error) { setError('We could not complete that request. Check your details and try again.'); return }
    window.location.assign('/vitals')
  }

  return <form className="auth-form" onSubmit={submit}>
    {mode === 'sign-up' && <label>Full name<input required value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>}
    <label>Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" /></label>
    <label>Password<input required minLength={8} type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === 'sign-up' ? 'new-password' : 'current-password'} /></label>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="primary-button" disabled={busy}>{busy ? 'Please wait…' : mode === 'sign-up' ? 'Create secure account' : 'Sign in securely'}</button>
  </form>
}
