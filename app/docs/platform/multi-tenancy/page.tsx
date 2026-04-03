export default function MultiTenancyPage() {
  return (
    <>
      <h1>Multi-tenancy</h1>
      <p>AetherDB uses PostgreSQL schema-level isolation. Every user gets their own dedicated schema — a completely separate namespace within the shared database.</p>

      <h2>How it works</h2>
      <p>When you register, AetherDB automatically:</p>
      <ul>
        <li>Creates a new PostgreSQL schema named <code>tenant_N</code> (e.g. <code>tenant_42</code>)</li>
        <li>Sets up row-level security policies on your schema</li>
        <li>Generates your connection string</li>
      </ul>

      <h2>Schema isolation</h2>
      <p>Every query is automatically scoped to your schema via the PostgreSQL <code>search_path</code>. Reference tables by their short name — not <code>tenant_42.products</code>, just <code>products</code>.</p>
      <pre><code>{`-- AetherDB automatically sets:
SET search_path TO tenant_42, public;

-- Your query:
SELECT * FROM products
-- Executes as:
SELECT * FROM tenant_42.products`}</code></pre>

      <h2>Row-level security</h2>
      <p>Each schema has PostgreSQL Row-Level Security (RLS) policies enabled. Even if a query references the wrong schema, RLS ensures only the authenticated user's rows are accessible.</p>

      <h2>Agent provisioning</h2>
      <p>New tenant schemas can be provisioned programmatically in under 500ms.</p>
      <pre><code>{`POST https://aetherdb.cloud/agent/provision
Content-Type: application/json

{ "email": "agent@yourdomain.com", "password": "secure-password" }

// Response — fully provisioned schema ready to use:
{ "token": "eyJhbGci...", "schema": "tenant_99", "connection_string": "postgres://..." }`}</code></pre>

      <h2>Direct Postgres access</h2>
      <pre><code>{`// Prisma
datasource db {
  provider = "postgresql"
  url      = "postgres://user:pass@aetherdb.cloud:5432/aetherdb?search_path=tenant_42"
}

// psql
psql "postgres://user:pass@aetherdb.cloud:5432/aetherdb?search_path=tenant_42"`}</code></pre>
    </>
  )
}
