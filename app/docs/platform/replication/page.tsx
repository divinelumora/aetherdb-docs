export default function ReplicationPage() {
  return (
    <>
      <h1>Multi-Cloud Replication</h1>
      <p>
        Multi-Cloud Replication streams your AetherDB data to AWS RDS, Google Cloud SQL, and Azure Database simultaneously. Each target is independently managed — you can pause, resume, and monitor replication lag per cloud with a single API.
      </p>

      <h2>Overview</h2>
      <p>
        Replication uses logical decoding on the AetherDB Postgres primary. Change events (INSERT, UPDATE, DELETE) are streamed in real-time to each configured target using their native replication protocol. Targets can be:
      </p>
      <ul>
        <li><strong>AWS RDS</strong> — PostgreSQL RDS instance or Aurora PostgreSQL</li>
        <li><strong>Google Cloud SQL</strong> — Cloud SQL for PostgreSQL</li>
        <li><strong>Azure Database</strong> — Azure Database for PostgreSQL</li>
        <li><strong>Custom</strong> — any Postgres-compatible database with logical replication support</li>
      </ul>

      <h2>API Reference</h2>

      <h3>Add a replication target</h3>
      <pre><code>{`POST /replication/targets
Authorization: Bearer <token>

{
  "provider": "aws_rds",
  "label": "US-East production replica",
  "connection": {
    "host": "mydb.us-east-1.rds.amazonaws.com",
    "port": 5432,
    "database": "aetherdb_replica",
    "username": "replication_user",
    "password": "..."
  },
  "tables": ["*"]   // replicate all tables, or list specific ones
}

// Response
{
  "target_id": "tgt_01J...",
  "provider": "aws_rds",
  "label": "US-East production replica",
  "status": "initializing",
  "created_at": "2026-05-17T10:40:00Z"
}`}</code></pre>

      <h3>List all replication targets</h3>
      <pre><code>{`GET /replication/targets
Authorization: Bearer <token>

// Response
{
  "targets": [
    {
      "target_id": "tgt_01J...",
      "provider": "aws_rds",
      "label": "US-East production replica",
      "status": "active",
      "lag_seconds": 0.4,
      "last_synced_at": "2026-05-17T10:44:58Z"
    },
    {
      "target_id": "tgt_02J...",
      "provider": "gcp_cloud_sql",
      "label": "EU replica",
      "status": "active",
      "lag_seconds": 1.1,
      "last_synced_at": "2026-05-17T10:44:57Z"
    }
  ]
}`}</code></pre>

      <h3>Get replication status summary</h3>
      <pre><code>{`GET /replication/status
Authorization: Bearer <token>

// Response
{
  "active_targets": 2,
  "paused_targets": 0,
  "total_targets": 2,
  "avg_lag_seconds": 0.75,
  "max_lag_seconds": 1.1,
  "events_replicated_24h": 847293,
  "errors_24h": 0,
  "status": "healthy"
}`}</code></pre>

      <h3>Pause replication to a target</h3>
      <pre><code>{`POST /replication/targets/:target_id/pause
Authorization: Bearer <token>

// Response
{
  "target_id": "tgt_01J...",
  "status": "paused",
  "paused_at": "2026-05-17T11:00:00Z"
}`}</code></pre>

      <h3>Resume replication</h3>
      <pre><code>{`POST /replication/targets/:target_id/resume
Authorization: Bearer <token>

// Response
{
  "target_id": "tgt_01J...",
  "status": "active",
  "resumed_at": "2026-05-17T11:05:00Z",
  "catch_up_estimated_seconds": 12
}`}</code></pre>

      <h3>Remove a replication target</h3>
      <pre><code>{`DELETE /replication/targets/:target_id
Authorization: Bearer <token>

// Response 204 No Content`}</code></pre>

      <h2>Table filtering</h2>
      <p>
        Replicate specific tables or exclude tables using filter rules:
      </p>
      <pre><code>{`POST /replication/targets
{
  "tables": ["orders", "users", "products"],   // include only these
  // OR
  "tables_exclude": ["audit_logs", "sessions"] // replicate all except these
}`}</code></pre>

      <h2>Consistency guarantees</h2>
      <ul>
        <li>Replication is <strong>eventually consistent</strong> with typical lag under 2 seconds</li>
        <li>Transactions are replicated atomically — partial transactions are never applied</li>
        <li>If a target falls behind by more than 10 minutes, it is automatically paused and you are notified</li>
        <li>Schema changes (DDL) are replicated automatically — no manual intervention needed</li>
      </ul>

      <h2>Integration with Schema Branching</h2>
      <p>
        Replication only streams from the <code>main</code> branch. Changes on feature branches are not replicated until merged to main — keeping your replicas clean and production-only.
      </p>
    </>
  )
}
