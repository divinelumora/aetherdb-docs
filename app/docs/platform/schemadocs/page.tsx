export default function SchemaDocsPage() {
  return (
    <>
      <h1>Live Schema Docs</h1>
      <p>
        Live Schema Docs auto-generate human-readable documentation for every table and column in your database. Documentation is AI-written on every migration and always reflects your current schema — no manual upkeep.
      </p>

      <h2>Overview</h2>
      <p>
        When you run a migration (or call the generate endpoint manually), AetherDB inspects your schema — tables, columns, data types, constraints, foreign keys — and uses an LLM to write natural-language descriptions of what each entity does. Descriptions update automatically on schema changes.
      </p>
      <p>
        Docs are stored in AetherDB and served via API, making them easy to embed in your own internal developer portals, Notion pages, or Slack bots.
      </p>

      <h2>API Reference</h2>

      <h3>Generate docs for the entire schema</h3>
      <pre><code>{`POST /schema-docs/generate
Authorization: Bearer <token>

// Response
{
  "job_id": "job_01J...",
  "tables_processed": 12,
  "status": "completed",
  "generated_at": "2026-05-17T10:30:00Z"
}`}</code></pre>

      <h3>Generate docs for a specific table</h3>
      <pre><code>{`POST /schema-docs/generate/:table
Authorization: Bearer <token>

// Response
{
  "table": "orders",
  "description": "Represents a purchase transaction initiated by a user. Each order contains line items, a total amount, and a status that progresses through pending → paid → fulfilled → shipped. Orders are linked to users via user_id and may have associated refunds in the payments table.",
  "columns": {
    "id":           "Unique identifier for the order (UUID v4)",
    "user_id":      "Foreign key to the users table — the customer who placed the order",
    "status":       "Current lifecycle state: pending | paid | fulfilled | shipped | cancelled | refunded",
    "amount":       "Total order value in the tenant's configured currency (stored as DECIMAL(12,2))",
    "created_at":   "Timestamp when the order was created (UTC)",
    "fulfilled_at": "Timestamp when all items were fulfilled; NULL until fulfillment is complete"
  },
  "relationships": [
    { "type": "belongs_to", "table": "users",       "via": "user_id" },
    { "type": "has_many",   "table": "order_items",  "via": "order_id" },
    { "type": "has_many",   "table": "payments",     "via": "order_id" }
  ]
}`}</code></pre>

      <h3>Retrieve docs for the entire schema</h3>
      <pre><code>{`GET /schema-docs
Authorization: Bearer <token>

// Response
{
  "generated_at": "2026-05-17T10:30:00Z",
  "tables": {
    "users":   { "description": "...", "columns": {...}, "relationships": [...] },
    "orders":  { "description": "...", "columns": {...}, "relationships": [...] },
    "payments": { "description": "...", "columns": {...}, "relationships": [...] }
  }
}`}</code></pre>

      <h3>Retrieve docs for a specific table</h3>
      <pre><code>{`GET /schema-docs/:table
Authorization: Bearer <token>

// Response — same shape as the generate response above`}</code></pre>

      <h3>Update docs with custom description</h3>
      <pre><code>{`PATCH /schema-docs/:table
Authorization: Bearer <token>

{
  "description": "Custom description that overrides the AI-generated one.",
  "columns": {
    "status": "Custom column description for status field."
  }
}

// Response
{
  "table": "orders",
  "updated": true,
  "override_fields": ["description", "columns.status"]
}`}</code></pre>

      <h2>Auto-update on migration</h2>
      <p>
        Enable automatic doc regeneration whenever a migration is applied:
      </p>
      <pre><code>{`PATCH /tenant/settings
{
  "schema_docs_auto_update": true
}`}</code></pre>
      <p>
        When enabled, schema docs are regenerated in the background within ~30 seconds of any DDL change (CREATE TABLE, ALTER TABLE, DROP TABLE, etc.).
      </p>

      <h2>Embedding in your tools</h2>
      <pre><code>{`// Fetch and display in a Slack bot
const docs = await fetch('/schema-docs/orders', {
  headers: { Authorization: \`Bearer \${token}\` }
}).then(r => r.json())

const message = \`*orders table*\\n\${docs.description}\\n\\n\` +
  Object.entries(docs.columns)
    .map(([col, desc]) => \`• \`\${col}\`: \${desc}\`)
    .join('\\n')

await slackClient.chat.postMessage({ channel, text: message })`}</code></pre>

      <h2>Supported languages</h2>
      <p>
        AI-generated descriptions are written in English by default. Specify a language to receive docs in another language:
      </p>
      <pre><code>{`POST /schema-docs/generate
{ "language": "pt-BR" }   // Portuguese (Brazil)`}</code></pre>
      <p>Supported: <code>en</code>, <code>es</code>, <code>pt-BR</code>, <code>fr</code>, <code>de</code>, <code>ja</code>, <code>zh-CN</code></p>
    </>
  )
}
