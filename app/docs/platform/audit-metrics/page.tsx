export default function AuditMetricsPage() {
  return (
    <>
      <h1>Audit Logs &amp; Metrics</h1>
      <p>Every HTTP request to the AetherDB API is automatically logged to <code>audit_logs</code>. The metrics endpoint aggregates these into dashboard-ready stats.</p>

      <h2>Audit logs</h2>
      <pre><code>{`GET /db/audit?limit=100&offset=0
Authorization: Bearer <token>

// Regular users see only their own entries.
// Admins can filter by user_id: ?user_id=42

// Response:
{
  "logs": [
    {
      "id": 60,
      "user_id": 4,
      "ip": "203.0.113.1",
      "method": "POST",
      "path": "/tenant/ai/insights",
      "status": 200,
      "duration_ms": 1513,
      "created_at": "2026-04-04T15:13:21Z"
    }
  ],
  "count": 1
}`}</code></pre>

      <h2>Metrics</h2>
      <pre><code>{`GET /db/metrics
Authorization: Bearer <token>

// Response:
{
  "queries_24h": 142,
  "queries_1h": 12,
  "avg_duration_ms": 18.4,
  "errors_24h": 2,
  "error_rate": 0.014,
  "db_size_bytes": 9221823,
  "db_size_pretty": "9006 kB",
  "active_connections": 3,
  "total_files": 7,
  "storage_used_bytes": 204800,
  "top_paths": [
    { "path": "/tenant/query", "count": 80, "avg_ms": 12.1 },
    { "path": "/db/ai/query", "count": 20, "avg_ms": 840.5 }
  ]
}`}</code></pre>
      <p>Admin users additionally receive <code>total_users</code> and <code>total_projects</code> fields.</p>

      <h2>SDK usage</h2>
      <pre><code>{`// Audit logs
const { logs, count } = await db.getAuditLogs(50, 0)
logs.forEach(l => console.log(l.method, l.path, l.status, l.duration_ms + 'ms'))

// Metrics
const m = await db.getMetrics()
console.log(\`\${m.queries_24h} queries in the last 24h, avg \${m.avg_duration_ms}ms\`)
console.log(\`Error rate: \${(m.error_rate * 100).toFixed(1)}%\`)
console.log(\`DB size: \${m.db_size_pretty}\`)`}</code></pre>

      <h2>Retention</h2>
      <p>Audit logs are retained indefinitely. Use <code>limit</code> + <code>offset</code> to paginate. For long-term storage, export periodically via the Export API or stream to an external SIEM.</p>
    </>
  )
}
