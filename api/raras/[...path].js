// Same-origin proxy to raras.org, mirroring the Vite dev proxy (vite.config.ts)
// so the browser never needs raras.org's own CORS policy. Vercel serverless
// function: deployed automatically from /api/**.
export default async function handler(req, res) {
  const segments = Array.isArray(req.query.path) ? req.query.path : [req.query.path].filter(Boolean)
  const upstreamUrl = `https://raras.org/api/${segments.join('/')}`

  try {
    const upstreamRes = await fetch(upstreamUrl, {
      method: req.method,
      headers: {
        'Content-Type': req.headers['content-type'] || 'application/json',
        Accept: req.headers['accept'] || 'application/json, text/event-stream',
      },
      body: ['GET', 'HEAD'].includes(req.method) ? undefined : JSON.stringify(req.body),
    })

    const text = await upstreamRes.text()
    res.status(upstreamRes.status)
    res.setHeader('Content-Type', upstreamRes.headers.get('content-type') || 'application/json')
    res.send(text)
  } catch (error) {
    res.status(502).json({ error: 'raras_upstream_unreachable', message: String(error?.message || error) })
  }
}
