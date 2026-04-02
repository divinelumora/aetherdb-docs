export default function SDKPage() {
  return (
    <>
      <h1>JavaScript / TypeScript SDK</h1>
      <p>The official AetherDB SDK for JavaScript and TypeScript — works in Node.js and the browser.</p>

      <h2>Installation</h2>
      <pre><code>npm install aetherdb-js</code></pre>

      <h2>Initialisation</h2>
      <pre><code>{`import { AetherDB } from 'aetherdb-js'

// With an existing token
const db = new AetherDB({
  url: 'https://aetherdb.cloud',
  token: 'your-jwt-token'
})

// Or sign in directly
const db = new AetherDB({ url: 'https://aetherdb.cloud' })
await db.signIn('you@example.com', 'your-password')`}</code></pre>

      <h2>Authentication methods</h2>

      <h3>register(email, password)</h3>
      <p>Create a new account. An isolated Postgres schema is provisioned automatically.</p>
      <pre><code>{`const user = await db.register('you@example.com', 'password')
// { id: 1, email: '...', schema: 'tenant_1' }`}</code></pre>

      <h3>signIn(email, password)</h3>
      <p>Sign in and automatically set the token for subsequent requests.</p>
      <pre><code>{`const { access_token, user } = await db.signIn('you@example.com', 'password')`}</code></pre>

      <h3>setToken(token)</h3>
      <p>Manually set a JWT token.</p>
      <pre><code>{`db.setToken('eyJhbGci...')`}</code></pre>

      <h2>Database methods</h2>

      <h3>from(table)</h3>
      <p>Returns a QueryBuilder for the given table in your isolated schema.</p>
      <pre><code>{`const { rows } = await db.from('products').select('*').execute()`}</code></pre>

      <h3>createTable(name, columns)</h3>
      <p>Create a new table in your schema.</p>
      <pre><code>{`await db.createTable('orders', [
  { name: 'product_id', type: 'BIGINT',  nullable: false },
  { name: 'quantity',   type: 'INTEGER', nullable: false },
  { name: 'total',      type: 'NUMERIC', nullable: false },
])`}</code></pre>

      <h3>query(sql)</h3>
      <p>Run a raw SELECT query in your isolated schema.</p>
      <pre><code>{`const { rows } = await db.query('SELECT COUNT(*) FROM products')`}</code></pre>

      <h3>ai(question)</h3>
      <p>Natural language query — generates and executes SQL automatically.</p>
      <pre><code>{`const result = await db.ai('how many orders were placed today?')
console.log(result.generated_sql)
console.log(result.rows)`}</code></pre>

      <h2>Tenant methods</h2>

      <h3>getTenantInfo()</h3>
      <pre><code>{`const info = await db.getTenantInfo()
// {
//   schema: 'tenant_42',
//   connection_string: 'postgres://...',
//   host: 'aetherdb.cloud',
//   port: 5432
// }`}</code></pre>

      <h3>getSchema()</h3>
      <pre><code>{`const { tables } = await db.getSchema()
// [{ name: 'products', columns: [...] }]`}</code></pre>

      <h2>TypeScript support</h2>
      <p>Full TypeScript support with generic query results.</p>
      <pre><code>{`interface Product {
  id: number
  title: string
  price: number
}

const { rows } = await db.from('products').select('*').execute<Product>()
// rows is Product[]`}</code></pre>
    </>
  )
}
