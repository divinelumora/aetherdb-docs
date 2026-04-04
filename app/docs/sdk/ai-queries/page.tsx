export default function AIQueriesPage() {
  return (
    <>
      <h1>AI queries</h1>
      <p>AetherDB includes a built-in AI query engine powered by Groq. Ask questions in plain English and get back results — no SQL required.</p>

      <h2>How it works</h2>
      <p>When you call <code>db.ai()</code>, AetherDB inspects your schema, generates the appropriate SQL using an LLM, executes it against your isolated tenant database, and returns both the results and the generated SQL.</p>

      <h2>Basic usage</h2>
      <pre><code>{`import { AetherDB } from 'aetherdb-js'
const db = new AetherDB({ url: 'https://app.aetherdb.cloud', token: 'your-token' })

const result = await db.ai('how many users signed up this week?')
console.log(result.generated_sql)
// SELECT COUNT(*) FROM users WHERE created_at >= NOW() - INTERVAL '7 days'
console.log(result.rows)
// [{ count: '42' }]`}</code></pre>

      <h2>More examples</h2>
      <pre><code>{`await db.ai('what is the total revenue from completed orders?')
await db.ai('show me all products with stock below 10')
await db.ai('list the top 5 customers by total order value')
await db.ai('how many orders were placed yesterday?')
await db.ai('show monthly signups for the past 6 months')`}</code></pre>

      <h2>REST API</h2>
      <pre><code>{`POST https://app.aetherdb.cloud/tenant/ai/query
Authorization: Bearer <token>
Content-Type: application/json

{ "question": "show me the 10 most recent orders" }

// Response:
{
  "generated_sql": "SELECT * FROM orders ORDER BY created_at DESC LIMIT 10",
  "rows": [...]
}`}</code></pre>

      <h2>Tips for better results</h2>
      <ul>
        <li>Use descriptive table names like <code>orders</code>, <code>products</code>, <code>users</code></li>
        <li>Use descriptive column names like <code>created_at</code>, <code>total_price</code>, <code>is_active</code></li>
        <li>Always inspect <code>generated_sql</code> before using in production</li>
      </ul>

      <h2>Error handling</h2>
      <pre><code>{`const result = await db.ai('show all orders')
if (result.error) {
  console.error('AI query failed:', result.error)
} else {
  console.log(result.rows)
}`}</code></pre>
    </>
  )
}
