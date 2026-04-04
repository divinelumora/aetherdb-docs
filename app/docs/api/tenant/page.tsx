export default function TenantPage() {
  return (
    <>
      <h1>Tenant database</h1>
      <p>Every AetherDB user gets a fully isolated PostgreSQL schema. All tenant endpoints operate exclusively within your schema.</p>

      <h2>Get tenant info</h2>
      <pre><code>{`GET https://app.aetherdb.cloud/tenant/info
Authorization: Bearer <token>

// Response 200:
{
  "schema": "tenant_42",
  "connection_string": "postgres://user:pass@aetherdb.cloud:5432/aetherdb?search_path=tenant_42",
  "host": "aetherdb.cloud",
  "port": 5432
}`}</code></pre>

      <h2>Get schema</h2>
      <pre><code>{`GET https://app.aetherdb.cloud/tenant/schema
Authorization: Bearer <token>

// Response 200:
{
  "tables": [
    {
      "name": "products",
      "columns": [
        { "name": "id",    "type": "bigint",  "nullable": false },
        { "name": "title", "type": "text",    "nullable": false },
        { "name": "price", "type": "numeric", "nullable": true  }
      ]
    }
  ]
}`}</code></pre>

      <h2>Create table</h2>
      <pre><code>{`POST https://app.aetherdb.cloud/tenant/tables
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "products",
  "columns": [
    { "name": "title", "type": "TEXT",    "nullable": false },
    { "name": "price", "type": "NUMERIC", "nullable": true  }
  ]
}`}</code></pre>

      <h2>Run a query</h2>
      <pre><code>{`POST https://app.aetherdb.cloud/tenant/query
Authorization: Bearer <token>
Content-Type: application/json

{ "sql": "SELECT * FROM products ORDER BY created_at DESC LIMIT 10" }

// Response 200:
{ "rows": [...], "rows_affected": 0 }`}</code></pre>

      <h2>Insert a row</h2>
      <pre><code>{`POST https://app.aetherdb.cloud/tenant/insert
Authorization: Bearer <token>
Content-Type: application/json

{ "table": "products", "data": { "title": "Keyboard", "price": 79.99 } }

// Response 200:
{ "id": 2, "message": "row inserted" }`}</code></pre>

      <h2>AI query</h2>
      <pre><code>{`POST https://app.aetherdb.cloud/tenant/ai/query
Authorization: Bearer <token>
Content-Type: application/json

{ "question": "what are the top 5 most expensive products?" }

// Response 200:
{ "generated_sql": "SELECT * FROM products ORDER BY price DESC LIMIT 5", "rows": [...] }`}</code></pre>
    </>
  )
}
