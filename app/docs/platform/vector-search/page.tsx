export default function VectorSearchPage() {
  return (
    <>
      <h1>Vector search</h1>
      <p>AetherDB supports semantic vector search using pgvector. Store embeddings alongside your data and query by similarity — enabling AI-powered search, recommendations, and RAG.</p>

      <h2>Add a vector column</h2>
      <pre><code>{`POST https://aetherdb.cloud/db/vector/column
Authorization: Bearer <token>
Content-Type: application/json

{ "table": "products", "column": "embedding", "dimensions": 1536 }

// Response: { "message": "vector column added" }`}</code></pre>

      <h2>Common embedding dimensions</h2>
      <ul>
        <li><code>1536</code> — OpenAI <code>text-embedding-3-small</code> / <code>ada-002</code></li>
        <li><code>3072</code> — OpenAI <code>text-embedding-3-large</code></li>
        <li><code>768</code>  — Many open-source models</li>
      </ul>

      <h2>Upsert an embedding</h2>
      <pre><code>{`POST https://aetherdb.cloud/db/vector/upsert
Authorization: Bearer <token>
Content-Type: application/json

{ "table": "products", "column": "embedding", "id": 42, "embedding": [0.021, -0.134, ...] }`}</code></pre>

      <h2>Semantic search</h2>
      <pre><code>{`POST https://aetherdb.cloud/db/vector/search
Authorization: Bearer <token>
Content-Type: application/json

{ "table": "products", "column": "embedding", "embedding": [...], "limit": 5 }

// Response:
{ "rows": [
  { "id": 42, "title": "Wireless Mouse",     "similarity": 0.97 },
  { "id": 17, "title": "Bluetooth Keyboard", "similarity": 0.91 }
]}`}</code></pre>

      <h2>Full example with OpenAI</h2>
      <pre><code>{`import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// 1. Generate embedding for query
const { data } = await openai.embeddings.create({
  model: 'text-embedding-3-small',
  input: 'wireless accessories for home office',
})

// 2. Search AetherDB
const res = await fetch('https://aetherdb.cloud/db/vector/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Authorization: \`Bearer \${token}\` },
  body: JSON.stringify({ table: 'products', column: 'embedding', embedding: data[0].embedding, limit: 5 }),
})
const { rows } = await res.json()`}</code></pre>
    </>
  )
}
