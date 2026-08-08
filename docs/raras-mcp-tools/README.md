# Raras MCP — ferramentas disponíveis

Documentação das ferramentas expostas pelo servidor MCP de `raras.org`, usado
pelo QuaTiRare Research Core como fonte de dados reais. Não há documentação
pública oficial nem introspecção habilitada — tudo abaixo foi levantado por
sondagem manual (chamadas reais ao endpoint, uma por uma) durante o
desenvolvimento. Trate os formatos de resposta como "observados", não como
contrato garantido pelo fornecedor.

## Como funciona, por baixo dos panos

- **Protocolo:** JSON-RPC 2.0, método `tools/call`, parâmetros em
  `params: { name, arguments }`.
- **Transporte:** `streamable-http`. Mesmo numa chamada única (não
  streaming), o servidor responde no formato SSE `event: message\ndata:
  {...}\n\n` — é preciso extrair o JSON depois de `data:` antes de fazer
  `JSON.parse`. Ver `src/services/raras/rarasMcpClient.ts`.
- **Formato do resultado:** cada ferramenta devolve
  `result.content[0].text`, um bloco de **markdown pensado para ser lido por
  um LLM**, não um payload estruturado para UI. Só `get_evidence` também
  devolve `result.structuredContent` com campos já tipados — as demais
  precisam ser reconvertidas de markdown para dados estruturados via regex
  (`src/services/raras/rarasParsers.ts`).
- **CORS:** o servidor não envia cabeçalhos permissivos para chamadas
  cross-origin do navegador. O app nunca chama `raras.org` diretamente —
  passa por um proxy same-origin (`/api/raras/*`): proxy do Vite em dev
  (`vite.config.ts`) e uma função serverless da Vercel em produção
  (`api/raras/[...path].js`).
- **Nomenclatura de parâmetros é inconsistente entre ferramentas.** Algumas
  esperam `snake_case` (`hpo_ids`, `orpha_code`), outras `camelCase`
  (`orphaCode`). Os nomes corretos, verificados, estão na tabela abaixo —
  errar o nome não dá erro de conexão, dá erro de validação Zod dentro do
  próprio resultado (`isError: true`).
- **Endpoint:** `POST https://raras.org/api/mcp` (via proxy:
  `POST /api/raras/mcp`). O manifesto completo do servidor (nome, versão,
  lista de tools/resources/prompts) pode ser lido com um `GET` simples no
  mesmo endpoint.

## Status no app

- ✅ **Integrada** — o QuaTiRare chama essa ferramenta de verdade, com
  parser dedicado e fallback para dado de demonstração se a chamada falhar.
- 📄 **Documentada, não integrada** — existe no servidor, verificado que
  responde, mas o Core ainda não tem uma tela que a consome. Fica aqui como
  referência para expansão futura.

---

## Ferramentas

### `search_diseases` ✅
**O que faz:** busca textual livre (nome, sinônimo) em ~10.468 doenças
raras cadastradas.
**Parâmetros:** `{ query: string, limit?: number }`
**Resposta:** lista markdown, um bloco por doença —
`**Nome** (ORPHA:xxxxx · MONDO:xxxx · CID10:Xxx.x)` seguido de uma linha com
prevalência, `✅ SUS` quando há cobertura, `🧪 N trials` quando há ensaios
ativos, e um link `https://raras.org/doenca/{orpha}`.
**Onde é usado:** busca universal (Research Desk), Disease Comparator.

### `get_disease_detail` ✅
**O que faz:** ficha completa de uma doença: nome, IDs cruzados
(ORPHA/MONDO/OMIM/CID-10), prevalência, herança, descrição, lista de
fenótipos HPO com frequência (`Muito frequente 99-80%` etc.), genes
associados (símbolo + HGNC) e contagem de cobertura SUS.
**Parâmetros:** `{ orphaCode: string }`
**Resposta:** markdown com seções `# Nome`, `## Descrição`,
`## Fenótipos HPO`, `## Genes`, `## SUS`.
**Onde é usado:** Disease Comparator, Auto Research (detalhe de cada
candidato).

### `find_diseases_by_phenotypes` ✅
**O que faz:** o coração do Auto Research. Recebe uma lista de HPO IDs e
devolve doenças ordenadas por quantos desses fenótipos cada uma "explica".
**Parâmetros:** `{ hpo_ids: string[], limit?: number }` — atenção,
`hpo_ids` em snake_case (diferente da maioria).
**Resposta:** um bloco por doença candidata —
`**Nome** (ORPHA:xxxxx) — N/M (P%)` seguido de uma linha com os rótulos dos
fenótipos que bateram, separados por vírgula. Não devolve os HPO IDs dos
fenótipos que casaram, só os rótulos (por isso o app faz correspondência
"fuzzy" por palavras ao invés de comparar ID exato — ver
`src/utils/fuzzyMatch.ts`).
**Onde é usado:** Auto Research → Candidate Research Set.

### `search_phenotypes` ✅
**O que faz:** busca de termos HPO por texto livre, em PT ou EN.
**Parâmetros:** `{ query: string, limit?: number }`
**Resposta:** lista simples `- **Rótulo** (HP:xxxxxxx)`.
**Onde é usado:** busca universal.

### `get_sus_coverage` ✅
**O que faz:** resume a integração de uma doença com o SUS —
medicamentos do componente CEAF e procedimentos SIGTAP vinculados.
**Parâmetros:** `{ orphaCode: string }`
**Resposta:** markdown curto: `# Cobertura SUS — Nome`,
`**Integração:** ...`, `- CEAF: N medicamentos`, `- SIGTAP: N
procedimentos`. PNTN (Política Nacional de Triagem Neonatal) é mencionado
na descrição da ferramenta mas não apareceu em nenhuma resposta observada.
**Onde é usado:** Disease Comparator, Auto Research (expandido).

### `find_reference_centers` ✅
**O que faz:** lista centros de referência (hospitais, ambulatórios,
APAEs) vinculados a uma doença.
**Parâmetros:** `{ orpha_code: string, uf?: string }` — snake_case aqui
também. **Observação importante:** passar só `uf` sem `orpha_code` não
filtra nada — devolve a lista nacional inteira sem filtro. O filtro por UF
só parece funcionar combinado com uma doença específica.
**Resposta:** lista `- **Nome do centro** — Cidade/UF · CNES:xxxxxxx` (CNES
nem sempre presente).
**Onde é usado:** Disease Comparator, Auto Research (expandido), Rarity
Map (camada "Centros de referência", como amostra por doença — não existe
endpoint de busca nacional por UF).

### `find_active_trials` ✅
**O que faz:** ensaios clínicos ativos para uma doença.
**Parâmetros:** `{ orphaCode: string }` (camelCase)
**Resposta:** texto livre — `Nenhum ensaio ativo.` quando vazio, ou uma
lista quando há resultados (formato exato dos itens não foi observado em
nenhuma doença testada; o parser trata o texto como resumo).
**Onde é usado:** Disease Comparator, Auto Research (expandido).

### `find_similar_diseases` 📄
**O que faz:** similaridade **semântica** entre doenças (embedding
vetorial), não por fenótipo compartilhado.
**Parâmetros:** não confirmados por teste direto.
**Observação:** ao chamar `find_phenotypically_similar` sem dado
pré-computado, o próprio servidor sugeriu esta ferramenta como alternativa
("Use find_similar_diseases para similaridade semântica").
**Status:** existe e responde no manifesto; não tem tela dedicada ainda.

### `find_phenotypically_similar` 📄
**O que faz:** similaridade entre doenças por sobreposição de fenótipos
HPO (métrica simGIC), diferente do matching direto de
`find_diseases_by_phenotypes`.
**Parâmetros:** `{ orphaCode: string, limit?: number }`
**Resposta observada:** para a doença testada (Duchenne, ORPHA:98896) veio
vazio — `"Nenhuma doença fenotipicamente similar pré-computada... (Use
find_similar_diseases para similaridade semântica.)"`, com `isError: true`.
Parece depender de um índice pré-computado que nem toda doença tem.
**Status:** integrada no client MCP mas sem consumidor de UI ainda —
candidata natural para uma seção "doenças relacionadas" no Disease
Comparator.

### `find_communities` 📄
**O que faz:** comunidades de pacientes/famílias da rede FEBRARARAS
associadas a uma doença.
**Status:** não testada diretamente; listada no manifesto.

### `get_graph_stats` ✅
**O que faz:** contagens totais do grafo de conhecimento — doenças,
fenótipos, genes, ensaios clínicos cadastrados.
**Parâmetros:** `{}` (sem argumentos)
**Resposta:** markdown curto com 4 números em negrito.
**Onde é usado:** Research Desk (card "Rarity Map" mostra o total de
doenças como prova de que a fonte está viva) e health check.

### `search_papers_semantic` ✅
**O que faz:** busca semântica (não por palavra-chave exata) sobre uma
base de ~424 mil papers do PubMed.
**Parâmetros:** `{ query: string, limit?: number }`
**Resposta:** mesmo formato de `find_papers_for_disease` — título, revista,
ano, score de similaridade, DOI.
**Onde é usado:** busca universal (categoria "PAPER").

### `find_papers_for_disease` ✅
**O que faz:** literatura relacionada a uma doença específica.
**Parâmetros:** `{ orphaCode: string, limit?: number }`
**Resposta:** lista de blocos —
```
- **Título do artigo.**
  _Revista, Ano_ — sim 0.929
  https://doi.org/...
```
**Onde é usado:** Disease Comparator, Auto Research (expandido).

### `analyze_clinical_case` 📄
**O que faz:** segundo a descrição do manifesto, recebe um caso clínico em
texto livre e devolve doenças candidatas + literatura relacionada — é
essencialmente uma versão "tudo em um" do pipeline que o Auto Research
monta manualmente (fenótipos → `find_diseases_by_phenotypes` →
`find_papers_for_disease`).
**Status:** não testada; o Core prefere o pipeline explícito e auditável
(mostrando cada etapa) a uma chamada única de caixa-preta.

### `get_schema` 📄
**O que faz:** devolve os labels de nó e tipos de relação existentes no
subgrafo público — útil para descobrir a "gramática" do grafo sem
introspecção GraphQL.
**Status:** não testada; seria a fonte natural para popular dinamicamente
os filtros do Data Explorer em vez de derivá-los dos dados carregados.

### `get_evidence` ✅
**O que faz:** proveniência formal de uma doença — cross-references para
fontes de autoridade (Orphanet, MONDO, OMIM, MeSH, GARD, UMLS, PubTator3),
status de verificação, e PMIDs da literatura que sustenta o registro.
**Parâmetros:** `{ orphaCode: string }`
**Resposta:** **a única ferramenta observada com `structuredContent`**
além do texto markdown — `{ orphaCode, name, xrefs: {...} }`. O parser usa
o campo estruturado quando presente e cai para regex no texto como
reforço (PMIDs, status).
**Onde é usado:** botão "Abrir evidência" nos cards de candidato do Auto
Research; painel "Como sabemos disso?".

### `get_recent_updates` 📄
**O que faz:** "Disease Twins com evidência nova" — parece ser um
mecanismo de polling para descobrir o que mudou no grafo desde a última
consulta.
**Status:** não testada; candidata a alimentar um indicador de "novidades"
no Research Desk.

### `get_research_log` 📄
**O que faz:** um diário de pesquisa contínua que o próprio agente por trás
do Raras mantém por doença — sugere que há um processo automatizado
rodando no lado do servidor, não só um banco estático.
**Status:** não testada.

### `get_hypotheses` 📄
**O que faz:** hipóteses de reposicionamento de fármacos por
"guilt-by-association" — o próprio manifesto frisa que **não é
recomendação clínica**.
**Status:** não testada. Se algum dia for exibida, precisa do mesmo
tratamento de linguagem não-conclusiva que o resto do Core já aplica a
fenótipos e doenças candidatas.

### `get_literature_relations` 📄
**O que faz:** relações tipadas minerado da literatura via PubTator3 —
gene × predicado × fármaco, com publicações de suporte.
**Status:** não testada.

### `explain_relation` 📄
**O que faz:** "MedGraphRAG" — reconstrói o caminho de evidência multi-hop
entre duas entidades do grafo, com proveniência em cada salto. É a
ferramenta mais sofisticada do servidor; provavelmente a peça que falta
para um "Why this matters" que explique automaticamente uma cadeia
gene → fenótipo → doença → literatura, ao invés do texto fixo que o Core
usa hoje para o caso #9104.
**Status:** não testada.

---

## Recursos e prompts (fora do escopo de `tools/call`)

O manifesto também expõe:
- **Resources:** `disease://{orphaCode}` (Disease Twin endereçável, com
  sufixos `/sus`, `/trials`, `/evidence`) e `ui://disease/{orphaCode}`
  (cartão HTML interativo com "chips de citação clicáveis" — pensado para
  MCP Apps, não para consumo via `fetch` comum).
- **Prompts:** `disease_twin` — configura um agente de IA como "o gêmeo
  digital" de uma doença específica.

Nenhum dos dois foi explorado; ambos ficam fora do escopo do client atual
(`src/services/raras/rarasMcpClient.ts`), que só implementa `tools/call`.

## Onde olhar no código

| Camada | Arquivo |
| --- | --- |
| Cliente JSON-RPC baixo nível | `src/services/raras/rarasMcpClient.ts` |
| Parsers markdown → dados tipados | `src/services/raras/rarasParsers.ts` |
| Serviço de alto nível (com fallback) | `src/services/raras/rarasRealService.ts` |
| Health check (GraphQL/SPARQL/MCP) | `src/services/raras/rarasHealth.ts` |
| Hooks React Query | `src/hooks/useRarasData.ts` |
| Dados de demonstração (fallback) | `src/mocks/rarasFallback.ts` |
| Proxy same-origin (dev) | `vite.config.ts` |
| Proxy same-origin (produção) | `api/raras/[...path].js` |
