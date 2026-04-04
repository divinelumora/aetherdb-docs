export default function QueryBuilderPage() {
  return (
    <>
      <h1>Query builder</h1>
      <p>The AetherDB query builder provides a fluent, chainable API for constructing SQL queries without writing raw SQL.</p>

      <h2>Basic usage</h2>
      <pre><code>{`import { AetherDB } from 'aetherdb-js'
const db = new AetherDB({ url: 'https://app.aetherdb.cloud', token: 'your-token' })

const { rows } = await db.from('products').select('*').execute()`}</code></pre>

      <h2>select(columns)</h2>
      <p>Specify which columns to return. Accepts a comma-separated string or an array.</p>
      <pre><code>{`// All columns
await db.from('products').select('*').execute()

// Specific columns
await db.from('products').select('id, title, price').execute()`}</code></pre>

      <h2>where(column, operator, value)</h2>
      <p>Filter rows by a condition. Supports all standard SQL operators.</p>
      <pre><code>{`await db.from('products')
  .select('*')
  .where('price', '>', 100)
  .execute()

// Multiple conditions chained with AND
await db.from('orders')
  .select('*')
  .where('status', '=', 'active')
  .where('total', '>=', 50)
  .execute()`}</code></pre>

      <h2>order(column, direction)</h2>
      <p>Sort results. Direction is <code>'ASC'</code> or <code>'DESC'</code> (default <code>'ASC'</code>).</p>
      <pre><code>{`await db.from('products')
  .select('*')
  .order('created_at', 'DESC')
  .execute()`}</code></pre>

      <h2>limit(n) / offset(n)</h2>
      <p>Paginate results.</p>
      <pre><code>{`// Page 1
await db.from('products').select('*').limit(20).offset(0).execute()
// Page 2
await db.from('products').select('*').limit(20).offset(20).execute()`}</code></pre>

      <h2>insert(data)</h2>
      <pre><code>{`await db.from('products').insert({
  title: 'Wireless Mouse',
  price: 29.99,
  stock: 100,
})`}</code></pre>

      <h2>update(data)</h2>
      <pre><code>{`await db.from('products')
  .where('id', '=', 42)
  .update({ price: 24.99 })`}</code></pre>

      <h2>delete()</h2>
      <pre><code>{`await db.from('products')
  .where('id', '=', 42)
  .delete()`}</code></pre>

      <h2>TypeScript generics</h2>
      <pre><code>{`interface Order { id: number; total: number; status: string }
const { rows } = await db.from('orders').select('*').execute<Order>()
// rows is typed as Order[]`}</code></pre>
    </>
  )
}
