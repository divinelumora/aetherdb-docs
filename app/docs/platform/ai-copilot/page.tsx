export default function AICopilotPage() {
  return (
    <>
      <h1>AI Query Co-Pilot</h1>
      <p>
        AI Query Co-Pilot analyzes every SQL query you run, rewrites slow queries automatically, explains execution plans in plain English, and converts natural language to SQL. It's an always-on intelligence layer built into the database.
      </p>

      <h2>Overview</h2>
      <p>
        Co-Pilot is powered by Groq (Llama 3 70B) with your schema as context. It operates in three modes:
      </p>
      <ul>
        <li><strong>Analysis</strong> — submit a SQL query, get back rewrites, plan explanation, and performance score</li>
        <li><strong>NL→SQL</strong> — describe what you want in plain English, get back executable SQL</li>
        <li><strong>Explain</strong> — paste an <code>EXPLAIN ANALYZE</code> output, get a human-readable breakdown</li>
      </ul>

      <h2>API Reference</h2>

      <h3>Analyze a SQL query</h3>
      <pre><code>{`POST /ai-copilot/analyze
Authorization: Bearer <token>

{
  "sql": "SELECT u.*, COUNT(o.id) FROM users u LEFT JOIN orders o ON o.user_id = u.id GROUP BY u.id",
  "context": "users table has 2M rows, orders has 15M rows"
}

// Response
{
  "original_sql": "SELECT u.*, COUNT(o.id) FROM ...",
  "rewritten_sql": "SELECT u.id, u.email, u.name, COUNT(o.id) AS order_count FROM users u LEFT JOIN orders o ON o.user_id = u.id GROUP BY u.id, u.email, u.name",
  "issues": [
    {
      "severity": "warning",
      "message": "SELECT u.* expands to all columns including large TEXT fields. Specify only needed columns.",
      "suggestion": "Replace u.* with explicit column list"
    }
  ],
  "performance_score": 72,
  "estimated_improvement": "~40% faster with explicit column selection",
  "explanation": "The query joins users to orders and counts orders per user. The main inefficiency is SELECT u.* which fetches all columns including potentially large fields. The rewrite selects only commonly needed columns."
}`}</code></pre>

      <h3>Natural language to SQL</h3>
      <pre><code>{`POST /ai-copilot/nl-to-sql
Authorization: Bearer <token>

{
  "prompt": "Give me the top 10 customers by total order value in the last 30 days, only include customers who have placed at least 3 orders"
}

// Response
{
  "sql": "SELECT u.id, u.email, u.name, SUM(o.amount) AS total_value, COUNT(o.id) AS order_count FROM users u JOIN orders o ON o.user_id = u.id WHERE o.created_at >= NOW() - INTERVAL '30 days' GROUP BY u.id, u.email, u.name HAVING COUNT(o.id) >= 3 ORDER BY total_value DESC LIMIT 10",
  "explanation": "Joins users to orders filtered to the last 30 days, groups by user, filters to those with 3+ orders, and sorts by total order value descending.",
  "confidence": 0.95,
  "tables_used": ["users", "orders"]
}`}</code></pre>

      <h3>Explain a query plan</h3>
      <pre><code>{`POST /ai-copilot/explain
Authorization: Bearer <token>

{
  "explain_output": "Seq Scan on orders (cost=0.00..45231.00 rows=2000000 width=120) (actual time=0.012..2341.5 rows=2000000 loops=1) Planning time: 0.8 ms Execution time: 2845.3 ms"
}

// Response
{
  "summary": "This query does a full sequential scan of the orders table (2M rows), taking 2.8 seconds. There is no index being used.",
  "bottlenecks": [
    {
      "node": "Seq Scan on orders",
      "issue": "Sequential scan on 2M rows — no index available for this filter",
      "fix": "Add an index: CREATE INDEX CONCURRENTLY idx_orders_created_at ON orders(created_at DESC)"
    }
  ],
  "suggested_indexes": [
    "CREATE INDEX CONCURRENTLY idx_orders_created_at ON orders(created_at DESC)"
  ],
  "expected_improvement": "Index scan would reduce execution time from ~2.8s to ~15ms (99.5% faster)"
}`}</code></pre>

      <h2>SDK usage</h2>
      <pre><code>{`import { AetherDB } from '@aetherdb/sdk'

const db = new AetherDB({ token: process.env.AETHERDB_TOKEN })

// Analyze before executing
const analysis = await db.copilot.analyze({
  sql: 'SELECT * FROM users WHERE email LIKE "%@gmail.com"'
})
console.log(analysis.rewritten_sql)
console.log(analysis.issues)

// Natural language query
const { sql } = await db.copilot.nlToSql(
  'Show me all failed payments from the last week grouped by error code'
)
const results = await db.raw(sql)`}</code></pre>

      <h2>Auto-analysis mode</h2>
      <p>
        Enable auto-analysis to have Co-Pilot automatically analyze every query above a configurable execution time threshold. Configure in your tenant settings:
      </p>
      <pre><code>{`PATCH /tenant/settings
{
  "copilot_auto_analyze": true,
  "copilot_threshold_ms": 100   // analyze queries slower than 100ms
}`}</code></pre>

      <h2>Rate limits</h2>
      <ul>
        <li>Free tier: 100 Co-Pilot requests/day</li>
        <li>Pro tier: 2,000 Co-Pilot requests/day</li>
        <li>Enterprise: unlimited</li>
      </ul>
    </>
  )
}
