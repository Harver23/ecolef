import Link from 'next/link'
import { AuthForm } from '@/components/auth-form'

export default function SignUpPage() { return <main className="auth-shell"><section className="auth-card"><p className="eyebrow">Ecolef / start safely</p><h1>Your private signal workspace.</h1><p className="muted">Create an account to keep reports private and make emergency support easier to reach.</p><AuthForm mode="sign-up" /><p className="auth-switch">Already have an account? <Link href="/sign-in">Sign in</Link></p></section></main> }
