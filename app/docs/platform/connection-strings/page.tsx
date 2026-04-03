export default function ConnectionStringsPage() {
  return (
    <>
      <h1>Connection strings</h1>
      <p>AetherDB provides a standard PostgreSQL connection string for each tenant. Use it to connect any Postgres-compatible client, ORM, or tool directly to your isolated schema.</p>

      <h2>Get your connection string</h2>
      <pre><code>{`GET https://aetherdb.cloud/tenant/info
Authorization: Bearer <token>

// Response:
{
  "schema": "tenant_42",
  "connection_string": "postgres://adb_user:password@aetherdb.cloud:5432/aetherdb?search_path=tenant_42",
  "host": "aetherdb.cloud",
  "port": 5432
}`}</code></pre>

      <h2>Using with ORMs</h2>

      <h3>Prisma</h3>
      <pre><code>{`DATABASE_URL="postgres://user:pass@aetherdb.cloud:5432/aetherdb?search_path=tenant_42"`}</code></pre>

      <h3>Drizzle ORM</h3>
      <pre><code>{`import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
const db = drizzle(postgres(process.env.DATABASE_URL!))`}</code></pre>

      <h3>TypeORM</h3>
      <pre><code>{`{ type: 'postgres', url: process.env.DATABASE_URL, schema: 'tenant_42' }`}</code></pre>

      <h2>Using with psql</h2>
      <pre><code>{`psql "postgres://user:pass@aetherdb.cloud:5432/aetherdb?search_path=tenant_42"`}</code></pre>

      <h2>Using with pgAdmin or TablePlus</h2>
      <ul>
        <li>Host: <code>aetherdb.cloud</code></li>
        <li>Port: <code>5432</code></li>
        <li>Database: <code>aetherdb</code></li>
        <li>Schema (search_path): your tenant schema, e.g. <code>tenant_42</code></li>
      </ul>
    </>
  )
}
