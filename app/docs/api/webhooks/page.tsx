export default function WebhooksPage() {
  return (
    <>
      <h1>Webhooks</h1>
      <p>Webhooks let you receive HTTP callbacks whenever data changes in your tenant database. Register a URL for a table and AetherDB will POST a signed JSON payload after every insert, update, or delete.</p>

      <h2>Register a webhook</h2>
      <pre><code>{`POST https://app.aetherdb.cloud/tenant/webhooks
Authorization: Bearer <token>
Content-Type: application/json

{
  "table_name": "orders",
  "events": ["insert", "update"],
  "url": "https://your-app.com/webhook/orders",
  "secret": "supersecretkey"
}

// Response 201:
{
  "id": 1,
  "table_name": "orders",
  "events": ["insert", "update"],
  "url": "https://your-app.com/webhook/orders",
  "is_active": true,
  "fail_count": 0,
  "created_at": "2026-04-04T10:00:00Z"
}`}</code></pre>

      <h2>Webhook payload</h2>
      <p>AetherDB sends a POST request to your URL with the following JSON body:</p>
      <pre><code>{`{
  "event": "insert",
  "table": "orders",
  "data": { "id": 42, "total": 99.99, "status": "pending" },
  "timestamp": "2026-04-04T10:00:00Z"
}`}</code></pre>

      <h2>Verifying signatures</h2>
      <p>If a secret is set, every request includes an <code>X-AetherDB-Signature</code> header:</p>
      <pre><code>{`X-AetherDB-Signature: sha256=<hex-digest>

// Verify in Node.js:
import { createHmac } from 'crypto'

function verifySignature(body, secret, header) {
  const expected = 'sha256=' + createHmac('sha256', secret).update(body).digest('hex')
  return expected === header
}`}</code></pre>

      <h2>Enable / Disable</h2>
      <pre><code>{`POST https://app.aetherdb.cloud/tenant/webhooks/{id}/toggle
Authorization: Bearer <token>
Content-Type: application/json

{ "active": false }

// Response 200:
{ "active": false }`}</code></pre>

      <h2>List / Delete</h2>
      <pre><code>{`GET    /tenant/webhooks        — list your webhooks
DELETE /tenant/webhooks/{id}   — delete a webhook`}</code></pre>

      <h2>Reliability</h2>
      <ul>
        <li>Webhooks are dispatched <strong>asynchronously</strong> — they never block the write request.</li>
        <li>Each delivery has a <strong>10-second timeout</strong>.</li>
        <li>A webhook is <strong>auto-disabled</strong> after 10 consecutive failures. Re-enable with the toggle endpoint.</li>
        <li>There is no automatic retry — implement idempotency in your handler.</li>
      </ul>

      <h2>JavaScript SDK</h2>
      <pre><code>{`// Register
const wh = await db.createWebhook({
  table_name: 'orders',
  events: ['insert', 'update', 'delete'],
  url: 'https://your-app.com/webhook',
  secret: 'mysecret',
})

// List
const { webhooks } = await db.listWebhooks()

// Toggle
await db.toggleWebhook(wh.id, false) // disable

// Delete
await db.deleteWebhook(wh.id)`}</code></pre>
    </>
  )
}
