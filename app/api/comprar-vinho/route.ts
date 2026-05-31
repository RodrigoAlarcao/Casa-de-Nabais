import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const url = process.env.APPS_SCRIPT_URL_VINHOS

  if (!url) {
    console.error('[comprar-vinho] APPS_SCRIPT_URL_VINHOS not set')
    return NextResponse.json({ error: 'APPS_SCRIPT_URL_VINHOS not configured' }, { status: 500 })
  }

  try {
    const body = await req.formData()
    const params = new URLSearchParams()
    body.forEach((value, key) => params.append(key, value.toString()))

    const response = await fetch(url, {
      method: 'POST',
      body: params,
    })

    console.log('[comprar-vinho] Apps Script response status:', response.status)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[comprar-vinho] fetch error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
