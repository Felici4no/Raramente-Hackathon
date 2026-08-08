import type { SourceHealth } from '@/types/raras'
import { callMcpTool } from './rarasMcpClient'

async function checkGraphql(): Promise<SourceHealth> {
  try {
    const res = await fetch('/api/raras/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '{__typename}' }),
    })
    return { name: 'Raras GraphQL', status: 'online', detail: `HTTP ${res.status}` }
  } catch {
    return { name: 'Raras GraphQL', status: 'offline', detail: 'Sem resposta' }
  }
}

async function checkSparql(): Promise<SourceHealth> {
  try {
    const res = await fetch('/api/raras/sparql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/sparql-query' },
      body: 'SELECT * WHERE { ?s ?p ?o } LIMIT 1',
    })
    return { name: 'Raras SPARQL', status: 'online', detail: `HTTP ${res.status}` }
  } catch {
    return { name: 'Raras SPARQL', status: 'offline', detail: 'Sem resposta' }
  }
}

async function checkMcp(): Promise<SourceHealth> {
  try {
    await callMcpTool('get_graph_stats', {})
    return { name: 'Raras MCP', status: 'online', detail: 'tools/call ok' }
  } catch (e) {
    return { name: 'Raras MCP', status: 'offline', detail: e instanceof Error ? e.message : 'erro' }
  }
}

export async function checkAllSources(): Promise<SourceHealth[]> {
  const [graphql, sparql, mcp] = await Promise.all([checkGraphql(), checkSparql(), checkMcp()])
  return [
    graphql,
    sparql,
    mcp,
    { name: 'QuaTiRare Journey', status: 'mock', detail: 'Sem backend assistencial real neste protótipo — dados de demonstração' },
  ]
}
