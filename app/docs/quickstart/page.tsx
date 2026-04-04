export default function QuickstartPage() {
  return (
    <>
      <h1>Quickstart</h1>
      <p>Get up and running with AetherDB in under 5 minutes.</p>

      <h2>1. Install the SDK</h2>
      <pre><code>npm install aetherdb-js</code></pre>

      <h2>2. Create an account</h2>
      <p>Register a new account. Your isolated database schema is provisioned automatically.</p>
      <pre><code>{`import { AetherDB } from 'aetherdb-js'

const db = new AetherDB({ url: 'https://app.aetherdb.cloud' })

// Register — your isolated schema is created instantly
const user = await db.register('you@example.com', 'your-password')
console.log(user.schema) // tenant_42`}</code></pre>

      <h2>3. Sign in</h2>
      <pre><code>{`const { access_token, user } = await db.signIn('you@example.com', 'your-password')
console.log(user.schema) // tenant_42`}</code></pre>

      <h2>4. Create a table</h2>
      <pre><code>{`await db.createTable('products', [
  { name: 'title',       type: 'TEXT',    nullable: false },
  { name: 'price',       type: 'NUMERIC', nullable: false },
  { name: 'description', type: 'TEXT',    nullable: true  },
])`}</code></pre>

      <h2>5. Insert data</h2>
      <pre><code>{`const { id } = await db.from('products').insert({
  title: 'Pro Plan',
  price: 29.99,
  description: 'Full access to all features'
})
console.log(id) // 1`}</code></pre>

      <h2>6. Query your data</h2>
      <pre><code>{`// Standard query
const { rows } = await db.from('products').select('*').execute()

// AI query — plain English
const result = await db.ai('show me all products under $30')
console.log(result.generated_sql) // SELECT * FROM products WHERE price < 30 LIMIT 100
console.log(result.rows)          // your data`}</code></pre>

      <h2>7. Get your connection string</h2>
      <p>Connect directly to your isolated schema with any Postgres client.</p>
      <pre><code>{`const info = await db.getTenantInfo()
console.log(info.connection_string)
// postgres://user:pass@aetherdb.cloud:5432/aetherdb?search_path=tenant_42`}</code></pre>

      <h2>Next steps</h2>
      <ul>
        <li><a href="/docs/sdk">Full SDK reference</a></li>
        <li><a href="/docs/sdk/ai-queries">AI queries in depth</a></li>
        <li><a href="/docs/api">REST API reference</a></li>
      </ul>
    </>
  )
}
