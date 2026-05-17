export default function SemanticPage() {
  return (
    <>
      <h1>Semantic Types</h1>
      <p>
        Semantic Types let you store unstructured text and query it by meaning — not keywords. Every semantic column is backed by a vector embedding. A built-in LLM ranker explains exactly why each result matched your query.
      </p>

      <h2>Overview</h2>
      <p>
        A <strong>semantic column</strong> is a text column with an associated vector embedding (generated automatically on write). When you run a <code>NEAR</code> query, AetherDB performs cosine similarity search against the embeddings, then passes top candidates through an LLM ranker that produces a relevance explanation for each result.
      </p>
      <p>
        Semantic Types use <strong>pgvector</strong> under the hood with HNSW indexing for sub-10ms search at millions of rows.
      </p>

      <h2>API Reference</h2>

      <h3>Ingest text into a semantic column</h3>
      <pre><code>{`POST /semantic/ingest
Authorization: Bearer <token>

{
  "table": "support_tickets",
  "column": "description",
  "rows": [
    { "id": "tkt_01", "text": "The payment gateway times out when processing refunds over $500" },
    { "id": "tkt_02", "text": "Users can't log in after password reset on mobile Safari" },
    { "id": "tkt_03", "text": "Dashboard shows wrong currency symbol for Brazilian users" }
  ]
}

// Response
{
  "ingested": 3,
  "embedding_model": "text-embedding-3-small",
  "dimensions": 1536,
  "index_updated": true
}`}</code></pre>

      <h3>NEAR query — search by meaning</h3>
      <pre><code>{`POST /semantic/search
Authorization: Bearer <token>

{
  "table": "support_tickets",
  "column": "description",
  "query": "authentication problems on mobile devices",
  "top_k": 5,
  "explain": true
}

// Response
{
  "results": [
    {
      "id": "tkt_02",
      "text": "Users can't log in after password reset on mobile Safari",
      "score": 0.94,
      "explanation": "This ticket is highly relevant because it describes a login (authentication) failure occurring specifically on a mobile browser (Safari), matching both 'authentication problems' and 'mobile devices' in the query."
    },
    {
      "id": "tkt_01",
      "text": "The payment gateway times out when processing refunds over $500",
      "score": 0.31,
      "explanation": "Low relevance — this ticket is about payment processing, not authentication or mobile devices."
    }
  ],
  "query_vector_ms": 4,
  "rerank_ms": 280
}`}</code></pre>

      <h3>Bulk ingest from existing table column</h3>
      <pre><code>{`POST /semantic/ingest/table
Authorization: Bearer <token>

{
  "table": "support_tickets",
  "id_column": "id",
  "text_column": "description",
  "batch_size": 500
}

// Response (async job)
{
  "job_id": "job_01J...",
  "total_rows": 24500,
  "status": "processing",
  "estimated_seconds": 120
}`}</code></pre>

      <h3>Get ingest job status</h3>
      <pre><code>{`GET /semantic/ingest/status/:job_id
Authorization: Bearer <token>

// Response
{
  "job_id": "job_01J...",
  "status": "completed",
  "processed": 24500,
  "failed": 0,
  "completed_at": "2026-05-17T10:25:00Z"
}`}</code></pre>

      <h3>Delete embeddings for rows</h3>
      <pre><code>{`DELETE /semantic/vectors
Authorization: Bearer <token>

{
  "table": "support_tickets",
  "column": "description",
  "ids": ["tkt_01", "tkt_02"]
}

// Response 200
{ "deleted": 2 }`}</code></pre>

      <h2>SDK usage</h2>
      <pre><code>{`import { AetherDB } from '@aetherdb/sdk'

const db = new AetherDB({ token: process.env.AETHERDB_TOKEN })

// Ingest new content
await db.semantic('support_tickets').ingest('description', [
  { id: 'tkt_04', text: 'App crashes on Android 13 when uploading images' }
])

// Search by meaning
const results = await db.semantic('support_tickets').near({
  column: 'description',
  query: 'mobile crash on image upload',
  topK: 10,
  explain: true
})`}</code></pre>

      <h2>Supported embedding models</h2>
      <ul>
        <li><code>text-embedding-3-small</code> (default) — 1536 dimensions, fast, low cost</li>
        <li><code>text-embedding-3-large</code> — 3072 dimensions, higher accuracy, higher cost</li>
        <li>Custom OpenAI-compatible endpoint — bring your own embedding model</li>
      </ul>

      <h2>Performance</h2>
      <ul>
        <li>HNSW index: sub-10ms vector search at 10M rows</li>
        <li>LLM reranker adds 200–400ms per query (disable with <code>"explain": false</code>)</li>
        <li>Embeddings are generated asynchronously — bulk ingest does not block your API</li>
      </ul>
    </>
  )
}
