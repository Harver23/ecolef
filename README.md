# 🧠 Ecolef

### Private EEG & Wellbeing Workspace

> **Understand the signal. Keep care human.**

Ecolef is a calm, privacy-focused workspace for reviewing EEG reports, organizing wellbeing context, and keeping research support close to human judgment. It's built for individuals, researchers, and clinician-led workflows — not as an autonomous diagnostic system, and never as a replacement for qualified medical care.

## 💡 Why This Exists

EEG and wellbeing data is deeply personal, and most tooling around it is either clinical-grade and inaccessible, or generic and careless with privacy. Ecolef exists to sit in between: a private, account-scoped space where someone can review their own signal data, get plain-language explanations of what it means, and keep a qualified clinician in the loop — without the data or the decision-making ever leaving human hands.

## ✨ Features

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

## 🧭 Product Principles

- **Privacy first** — user workspaces and reports are account-scoped
- **Human-led care** — AI can explain information, but should not make clinical decisions independently
- **Clear uncertainty** — reports communicate limitations, signal quality, and context
- **Accessible calm** — restrained motion, clear typography, and reduced-motion support

## 🧩 Core Modules

| Module | Responsibility |
|---|---|
| `app/` | Next.js App Router pages — workspace home, sign-in/sign-up, API routes |
| `components/` | Shared UI, including the sign-in/sign-up form |
| `lib/auth.ts` | Better Auth server configuration |
| `lib/auth-client.ts` | Better Auth browser client |
| `lib/db/` | Database schema and connection (Neon Postgres + Drizzle) |

## 🛠️ Tech Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Better Auth
- Neon Postgres with Drizzle ORM
- Vercel AI SDK
- Lucide icons
- Netlify Next.js adapter

## 📁 Project Structure

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

## 🚀 Getting Started

### Requirements

- Node.js 20 or newer
- pnpm
- A Neon Postgres database

### Install

```bash
pnpm install
```

### Environment variables

Create a local `.env.local` file:

```env
DATABASE_URL=your_neon_database_url
BETTER_AUTH_SECRET=your_long_random_secret
```

Never commit secrets, database URLs, real EEG recordings, or private user data.

### Run locally

```bash
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
pnpm build
pnpm start
```

## ✅ Testing

There's no automated test suite yet — the main safety net right now is `pnpm build`, which type-checks the whole app and catches broken routes or auth wiring before deploy. Run it before every PR:

```bash
pnpm build
```

Planned: unit tests around the auth flow and the analysis API foundation once those modules stabilize.

## 🔐 Authentication

Ecolef uses Better Auth with email/password authentication. Passwords are handled by Better Auth and are never displayed to administrators or included in application responses.

User-owned data must remain scoped to the authenticated user in every database query.

## 🤖 AI and Clinical Safety

Potential AI-assisted capabilities include:

- Explaining technical report language
- Summarizing findings in plain language
- Highlighting incomplete or low-quality signal data
- Suggesting questions for a qualified clinician

AI output must not be used as a diagnosis, prescription, emergency-monitoring service, or substitute for professional medical judgment. Any clinical implementation requires appropriate validation, consent, privacy controls, auditability, and regulatory review.

## ☁️ Deployment

The repository includes `netlify.toml` and the Netlify Next.js adapter. Configure the required environment variables in the Netlify project settings before deploying.

The app can also be deployed through Vercel or installed into another Next.js environment.

## 🗺️ Roadmap

- [ ] Wire the analysis API foundation to real EEG report parsing
- [ ] Add automated tests around auth and analysis routes
- [ ] Build out emergency-contact support into a real notification flow
- [ ] Expand per-user analysis history into a searchable timeline
- [ ] Add a chosen open-source license ahead of any production deployment

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a focused feature branch.
3. Keep user data scoped and secrets out of source control.
4. Run `pnpm build` before opening a pull request.
5. Describe security, accessibility, and clinical-safety implications where relevant.

## 📄 License

This project is currently intended as an open-source prototype. Add the project's chosen license before distributing production deployments.

## ⚠️ Disclaimer

Ecolef is a research and wellbeing-support prototype. It is not a certified medical device and does not independently diagnose depression or any other condition. Emergency concerns should be directed to local emergency services or qualified healthcare professionals.

## 🧑‍💻 Maintainer

**Harender Singh** ([@Harver23](https://github.com/Harver23))

Built to keep signal review thoughtful, private, and human.
