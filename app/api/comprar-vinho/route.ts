import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData()
    const url = process.env.APPS_SCRIPT_URL_VINHOS

    if (!url) {
      return NextResponse.json({ error: 'Not configured' }, { status: 500 })
    }

    const params = new URLSearchParams()
    body.forEach((value, key) => params.append(key, value.toString()))

    await fetch(url, {
      method: 'POST',
      body: params,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
