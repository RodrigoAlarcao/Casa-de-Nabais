import type { IncomingMessage, ServerResponse } from 'http'

type AugmentedReq = IncomingMessage & { body?: Record<string, string> }

export default async function handler(req: AugmentedReq, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json')

  if (req.method !== 'POST') {
    res.writeHead(405)
    res.end(JSON.stringify({ error: 'Method not allowed' }))
    return
  }

  const url = process.env.APPS_SCRIPT_URL_VINHOS
  if (!url) {
    console.error('[comprar-vinho] APPS_SCRIPT_URL_VINHOS not set')
    res.writeHead(500)
    res.end(JSON.stringify({ error: 'APPS_SCRIPT_URL_VINHOS not configured' }))
    return
  }

  try {
    const body: Record<string, string> = req.body ?? await parseBody(req)
    const params = new URLSearchParams()
    Object.entries(body).forEach(([k, v]) => params.append(k, v))

    const response = await fetch(url, { method: 'POST', body: params })
    console.log('[comprar-vinho] Apps Script status:', response.status)

    res.writeHead(200)
    res.end(JSON.stringify({ ok: true }))
  } catch (err) {
    console.error('[comprar-vinho] error:', err)
    res.writeHead(500)
    res.end(JSON.stringify({ error: String(err) }))
  }
}

function parseBody(req: IncomingMessage): Promise<Record<string, string>> {
  return new Promise((resolve, reject) => {
    let raw = ''
    req.on('data', chunk => { raw += chunk })
    req.on('end', () => {
      try { resolve(JSON.parse(raw)) } catch { reject(new Error('Invalid JSON body')) }
    })
    req.on('error', reject)
  })
}
