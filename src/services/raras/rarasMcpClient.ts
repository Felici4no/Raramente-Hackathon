/**
 * Low-level JSON-RPC 2.0 client for the live raras.org MCP server, called
 * through the same-origin proxy (/api/raras/*, see vite.config.ts and
 * api/raras/[...path].js) since raras.org does not send permissive CORS
 * headers for direct browser requests.
 *
 * The server replies on the "streamable-http" transport, which wraps the
 * JSON-RPC payload in an SSE-style "event: message\ndata: {...}" envelope
 * even for a single-shot response — parseEnvelope() unwraps that.
 */

export class RarasMcpError extends Error {}

interface McpEnvelope {
  jsonrpc: '2.0'
  id: number
  result?: {
    content?: { type: string; text?: string }[]
    structuredContent?: unknown
    isError?: boolean
  }
  error?: { code: number; message: string }
}

function parseEnvelope(raw: string): McpEnvelope {
  const trimmed = raw.trim()
  if (trimmed.startsWith('{')) {
    return JSON.parse(trimmed)
  }
  const dataLines = trimmed
    .split('\n')
    .filter((line) => line.startsWith('data:'))
    .map((line) => line.slice(5).trim())
  if (dataLines.length === 0) {
    throw new RarasMcpError('Resposta MCP em formato inesperado')
  }
  return JSON.parse(dataLines.join(''))
}

let rpcId = 0

export interface McpToolResult {
  text: string
  structured: unknown
}

export async function callMcpTool(name: string, args: Record<string, unknown> = {}): Promise<McpToolResult> {
  const res = await fetch('/api/raras/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
    body: JSON.stringify({ jsonrpc: '2.0', id: ++rpcId, method: 'tools/call', params: { name, arguments: args } }),
  })

  if (!res.ok) {
    throw new RarasMcpError(`raras MCP respondeu HTTP ${res.status}`)
  }

  const envelope = parseEnvelope(await res.text())

  if (envelope.error) {
    throw new RarasMcpError(envelope.error.message)
  }

  const result = envelope.result
  const text = result?.content?.find((c) => c.type === 'text')?.text ?? ''

  if (result?.isError) {
    throw new RarasMcpError(text || `Ferramenta ${name} retornou erro`)
  }

  return { text, structured: result?.structuredContent }
}

/** Lightweight reachability probe — any HTTP response counts as online. */
export async function pingRarasEndpoint(path: string, init?: RequestInit): Promise<boolean> {
  try {
    const res = await fetch(`/api/raras/${path}`, { method: 'POST', ...init })
    return res.status > 0
  } catch {
    return false
  }
}
