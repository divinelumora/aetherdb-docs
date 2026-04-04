export default function AIPlatformPage() {
  return (
    <>
      <h1>AI Features</h1>
      <p>AetherDB ships with three AI-powered capabilities built on Groq (Llama 3.3 70B). All features require <code>GROQ_API_KEY</code> to be set; if absent, endpoints return <code>503 Service Unavailable</code>.</p>

      <h2>Natural language queries</h2>
      <p>Ask questions in plain English. AetherDB fetches your live schema, generates SQL via the LLM, validates it through the safety checker, and executes it.</p>
      <pre><code>{`POST /tenant/ai/query   — query your isolated tenant schema
POST /db/ai/query       — query the shared database schema

Body: { "question": "how many orders were placed this week?" }

// Response:
{
  "question": "how many orders were placed this week?",
  "generated_sql": "SELECT count(*) FROM orders WHERE created_at > now() - interval '7 days'",
  "rows": [{ "count": 142 }],
  "row_count": 1,
  "execution_time_ms": 34
}`}</code></pre>

      <h2>AI schema migration</h2>
      <p>Convert a plain-English instruction into DDL SQL (ALTER TABLE, CREATE TABLE, ADD COLUMN, etc.). The SQL is returned for review — it is <strong>never auto-executed</strong>. Run it yourself via <code>POST /db/query</code> after review.</p>
      <pre><code>{`POST /db/ai/migrate
Authorization: Bearer <token>

{ "instruction": "Add a nullable 'discount_pct' numeric column to the orders table" }

// Response:
{
  "instruction": "Add a nullable 'discount_pct' numeric column to the orders table",
  "generated_sql": "ALTER TABLE orders ADD COLUMN discount_pct NUMERIC;",
  "warning": "Review this SQL carefully before executing. Use POST /db/query to run it."
}`}</code></pre>

      <h2>AI data insights</h2>
      <p>Sample up to 500 rows from a tenant table and get an AI-generated analysis report covering statistics, patterns, anomalies, and recommendations.</p>
      <pre><code>{`POST /tenant/ai/insights
Authorization: Bearer <token>

{ "table": "orders", "sample_size": 200 }

// Response:
{
  "table": "orders",
  "sample_rows": 200,
  "insights": "The orders table contains 200 sampled rows spanning April 2025 to April 2026...\\n1. Summary: avg order value $84.20, median $62...\\n2. Patterns: 68% of orders placed Mon–Wed...\\n..."
}`}</code></pre>

      <h2>SDK usage</h2>
      <pre><code>{`// NL query
const result = await db.ai('top 5 customers by total spend')
console.log(result.generated_sql)
console.log(result.rows)

// Schema migration (review before running)
const migration = await db.aiMigrate('add a phone_number column to the users table')
console.log(migration.generated_sql)
// Then execute: await db.query(migration.generated_sql)

// Data insights
const report = await db.aiInsights('orders', 200)
console.log(report.insights)`}</code></pre>

      <h2>Safety</h2>
      <p>All AI-generated SQL passes through AetherDB&apos;s keyword blocklist before execution. Dangerous statements (DROP, TRUNCATE, DELETE without WHERE, etc.) are rejected even if the LLM generates them.</p>
    </>
  )
}
