# Ecolef

## Private EEG & Wellbeing Workspace

Ecolef is a calm, privacy-focused workspace for reviewing EEG reports, organizing wellbeing context, and keeping research support close to human judgment.

> **Understand the signal. Keep care human.**

Ecolef is designed for individuals, researchers, and clinician-led workflows. It is not an autonomous diagnostic system and does not replace qualified medical care.

## Features

- Private email/password accounts
- Secure sign-in and sign-up flows
- Per-user analysis history
- EEG report review foundation
- Wellbeing and symptom context
- Emergency-contact support foundation
- Research-safe AI explanation direction
- Editorial, responsive interface
- Animated signal and neon-heart visual system
- Netlify deployment configuration

## Product Principles

- **Privacy first:** user workspaces and reports are account-scoped.
- **Human-led care:** AI can explain information, but should not make clinical decisions independently.
- **Clear uncertainty:** reports should communicate limitations, signal quality, and context.
- **Accessible calm:** the interface uses restrained motion, clear typography, and reduced-motion support.

## Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Better Auth
- Neon Postgres with Drizzle ORM
- Vercel AI SDK
- Lucide icons
- Netlify Next.js adapter

## Project Structure

```text
app/
├── page.tsx                    # Ecolef workspace homepage
├── sign-in/page.tsx            # Sign-in experience
├── sign-up/page.tsx            # Account creation experience
└── api/
    ├── auth/[...all]/route.ts  # Better Auth handler
    └── analysis/route.ts       # Analysis API foundation

components/
├── auth-form.tsx               # Shared sign-in/sign-up form
└── ui/                         # Reusable interface components

lib/
├── auth.ts                     # Better Auth server configuration
├── auth-client.ts              # Better Auth browser client
└── db/                         # Database schema and connection

public/
└── ecolef-neon-heart.png       # Background visual asset

netlify.toml                    # Netlify deployment configuration
```

## Getting Started

### Requirements

- Node.js 20 or newer
- pnpm
- Neon Postgres database

### Install

```bash
pnpm install
```

### Environment variables

Create a local `.env.local` file with the values for your development environment:

```env
DATABASE_URL=your_neon_database_url
BETTER_AUTH_SECRET=your_long_random_secret
```

Never commit secrets, database URLs, real EEG recordings, or private user data.

### Run locally

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
pnpm build
pnpm start
```

## Authentication

Ecolef uses Better Auth with email/password authentication. Passwords are handled by Better Auth and are never displayed to administrators or included in application responses.

User-owned data must remain scoped to the authenticated user in every database query.

## AI and Clinical Safety

Potential AI-assisted capabilities include:

- Explaining technical report language
- Summarizing findings in plain language
- Highlighting incomplete or low-quality signal data
- Suggesting questions for a qualified clinician

AI output must not be used as a diagnosis, prescription, emergency-monitoring service, or substitute for professional medical judgment. Any clinical implementation requires appropriate validation, consent, privacy controls, auditability, and regulatory review.

## Deployment

The repository includes `netlify.toml` and the Netlify Next.js adapter. Configure the required environment variables in the Netlify project settings before deploying.

The application can also be deployed through Vercel or installed into another Next.js environment.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a focused feature branch.
3. Keep user data scoped and secrets out of source control.
4. Run `pnpm build` before opening a pull request.
5. Describe security, accessibility, and clinical-safety implications where relevant.

## License

This project is currently intended as an open-source prototype. Add the project’s chosen license before distributing production deployments.

## Disclaimer

Ecolef is a research and wellbeing-support prototype. It is not a certified medical device and does not independently diagnose depression or any other condition. Emergency concerns should be directed to local emergency services or qualified healthcare professionals.

## Repository

[github.com/Harver23/ecolef](https://github.com/Harver23/ecolef)

Built to keep signal review thoughtful, private, and human.
