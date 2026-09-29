import Link from 'next/link'
import { AuthForm } from '@/components/auth-form'

export default function SignInPage() { return <main className="auth-shell"><section className="auth-card"><p className="eyebrow">Ecolef / private workspace</p><h1>Welcome back.</h1><p className="muted">Sign in to review your EEG reports and saved safety contacts.</p><AuthForm mode="sign-in" /><p className="auth-switch">New to Ecolef? <Link href="/sign-up">Create an account</Link></p></section></main> }
