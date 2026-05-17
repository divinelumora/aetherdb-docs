export default function TimeTravelPage() {
  return (
    <>
      <h1>Time Travel (AS OF)</h1>
      <p>
        Time Travel lets you query any table as it existed at any point in the past. Every row write (INSERT, UPDATE, DELETE) is preserved in an append-only history log. Use <code>AS OF</code> queries to reconstruct exact past states for debugging, compliance audits, or data recovery.
      </p>

      <h2>How it works</h2>
      <p>
        AetherDB maintains a <code>row_history</code> table per project that captures a full snapshot of every row on every change. Each entry stores the previous value, new value, operation type, and microsecond timestamp. When you issue an <code>AS OF</code> query, AetherDB reconstructs the table state at the requested timestamp by replaying history entries.
      </p>

      <h2>API Reference</h2>

      <h3>Query a table AS OF a timestamp</h3>
      <pre><code>{`GET /rows/history/as-of?table=orders&timestamp=2026-05-01T00:00:00Z
Authorization: Bearer <token>

// Response
{
  "table": "orders",
  "as_of": "2026-05-01T00:00:00Z",
  "rows": [
    { "id": "ord_01J...", "status": "pending", "amount": 99.00, "created_at": "2026-04-30T..." },
    { "id": "ord_02J...", "status": "paid",    "amount": 149.00, "created_at": "2026-04-28T..." }
  ],
  "row_count": 2
}`}</code></pre>

      <h3>Get full row history for a specific row</h3>
      <pre><code>{`GET /rows/history/:table/:row_id
Authorization: Bearer <token>

// Response
{
  "table": "orders",
  "row_id": "ord_01J...",
  "history": [
    {
      "version": 1,
      "operation": "INSERT",
      "data": { "status": "pending", "amount": 99.00 },
      "changed_at": "2026-04-30T09:12:00.000123Z",
      "changed_by": "usr_abc"
    },
    {
      "version": 2,
      "operation": "UPDATE",
      "previous": { "status": "pending" },
      "data": { "status": "paid" },
      "changed_at": "2026-05-02T14:30:00.000456Z",
      "changed_by": "usr_xyz"
    }
  ]
}`}</code></pre>

      <h3>List all row history for a table (paginated)</h3>
      <pre><code>{`GET /rows/history/:table?limit=50&cursor=<next_cursor>
Authorization: Bearer <token>

// Response
{
  "table": "orders",
  "entries": [...],
  "next_cursor": "cur_01J...",
  "has_more": true
}`}</code></pre>

      <h3>Restore a row to a past state</h3>
      <pre><code>{`POST /rows/history/restore
Authorization: Bearer <token>

{
  "table": "orders",
  "row_id": "ord_01J...",
  "restore_to": "2026-04-30T09:12:00Z"
}

// Response
{
  "restored": true,
  "row_id": "ord_01J...",
  "snapshot": { "status": "pending", "amount": 99.00 }
}`}</code></pre>

      <h2>Using AS OF in the SDK</h2>
      <pre><code>{`import { AetherDB } from '@aetherdb/sdk'

const db = new AetherDB({ token: process.env.AETHERDB_TOKEN })

// Query orders as they were on May 1st
const snapshot = await db
  .from('orders')
  .asOf('2026-05-01T00:00:00Z')
  .select('*')

// Get full changelog for a row
const history = await db
  .from('orders')
  .history('ord_01J...')`}</code></pre>

      <h2>Retention policy</h2>
      <ul>
        <li>Free tier: 7-day history retention</li>
        <li>Pro tier: 90-day history retention</li>
        <li>Enterprise: configurable, up to unlimited</li>
        <li>History entries are stored in compressed columnar format — storage overhead is typically 2–4× the live table size</li>
      </ul>

      <h2>Compliance use case</h2>
      <p>
        Time Travel is designed to work alongside <a href="/docs/platform/compliance">Compliance Autopilot</a>. GDPR erasure requests remove PII from live rows, but the history log retains a <em>redacted</em> tombstone showing that data existed and was erased — satisfying audit requirements without retaining raw PII.
      </p>
    </>
  )
}
