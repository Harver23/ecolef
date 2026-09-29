import { generateText } from 'ai'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db'
import { sql } from 'drizzle-orm'

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() })
  if (!session?.user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await request.json().catch(() => null)
  const fileName = typeof body?.fileName === 'string' ? body.fileName.slice(0, 255) : ''
  if (!fileName || !/\.(edf|bdf)$/i.test(fileName)) return NextResponse.json({ error: 'Only EDF and BDF files are supported.' }, { status: 400 })

  const { text } = await generateText({
    model: 'openai/gpt-4o-mini',
    prompt: `Write one cautious sentence explaining that the EEG file ${fileName} has been received for clinician-reviewed research analysis. Do not diagnose depression or infer a medical condition.`,
  })
  const id = crypto.randomUUID()
  await db.execute(sql`INSERT INTO "analysis" ("id", "userId", "fileName", "status", "summary") VALUES (${id}, ${session.user.id}, ${fileName}, 'complete', ${text.slice(0, 500)})`)
  return NextResponse.json({ id, status: 'complete', summary: text })
}
