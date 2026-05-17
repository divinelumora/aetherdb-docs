export default function SyncPage() {
  return (
    <>
      <h1>Offline-First Sync</h1>
      <p>
        Offline-First Sync enables edge and mobile clients to work without an internet connection. Local changes are queued and pushed when connectivity returns. Conflicting edits are resolved automatically using Last-Write-Wins CRDT semantics, with a manual override API for custom conflict resolution.
      </p>

      <h2>Overview</h2>
      <p>
        AetherDB's sync engine uses a <strong>Last-Write-Wins (LWW) CRDT</strong> model. Each row carries a monotonic <code>_sync_clock</code> counter. When changes from an offline client arrive, the engine compares clocks to determine which version wins. For fields updated simultaneously on two clients, the latest clock wins. All conflicts are logged and queryable.
      </p>

      <h2>API Reference</h2>

      <h3>Push local changes to server</h3>
      <pre><code>{`POST /sync/push
Authorization: Bearer <token>

{
  "client_id": "device_mobile_01",
  "changes": [
    {
      "table": "notes",
      "operation": "UPDATE",
      "row_id": "note_01J...",
      "data": { "content": "Updated note content from mobile", "updated_at": "2026-05-17T08:00:00Z" },
      "client_clock": 42
    },
    {
      "table": "tasks",
      "operation": "INSERT",
      "row_id": "task_new_01",
      "data": { "title": "New task created offline", "done": false },
      "client_clock": 43
    }
  ]
}

// Response
{
  "accepted": 2,
  "conflicts": 0,
  "server_clock": 1891,
  "processed_at": "2026-05-17T11:15:00Z"
}`}</code></pre>

      <h3>Pull server changes to client</h3>
      <pre><code>{`POST /sync/pull
Authorization: Bearer <token>

{
  "client_id": "device_mobile_01",
  "last_sync_clock": 1800,
  "tables": ["notes", "tasks"]
}

// Response
{
  "changes": [
    {
      "table": "notes",
      "operation": "UPDATE",
      "row_id": "note_01J...",
      "data": { "content": "Updated by web client", "updated_at": "2026-05-17T09:00:00Z" },
      "server_clock": 1850
    },
    {
      "table": "tasks",
      "operation": "DELETE",
      "row_id": "task_02J...",
      "server_clock": 1855
    }
  ],
  "current_server_clock": 1891,
  "changes_count": 2
}`}</code></pre>

      <h3>List unresolved conflicts</h3>
      <pre><code>{`GET /sync/conflicts?status=unresolved
Authorization: Bearer <token>

// Response
{
  "conflicts": [
    {
      "conflict_id": "con_01J...",
      "table": "notes",
      "row_id": "note_05J...",
      "client_version": {
        "client_id": "device_mobile_01",
        "data": { "content": "Mobile version of note" },
        "client_clock": 44
      },
      "server_version": {
        "data": { "content": "Web version of note" },
        "server_clock": 1860
      },
      "auto_resolution": "server_wins",
      "created_at": "2026-05-17T10:55:00Z",
      "status": "unresolved"
    }
  ],
  "total": 1
}`}</code></pre>

      <h3>Resolve a conflict manually</h3>
      <pre><code>{`POST /sync/conflicts/:conflict_id/resolve
Authorization: Bearer <token>

{
  "resolution": "client_wins",
  // OR use a custom merged value:
  "resolved_data": {
    "content": "Manually merged: Mobile version + Web additions"
  }
}

// Response
{
  "conflict_id": "con_01J...",
  "resolved": true,
  "resolution": "custom",
  "applied_at": "2026-05-17T11:20:00Z"
}`}</code></pre>

      <h3>Get sync status for a client</h3>
      <pre><code>{`GET /sync/status/:client_id
Authorization: Bearer <token>

// Response
{
  "client_id": "device_mobile_01",
  "last_push_at": "2026-05-17T11:15:00Z",
  "last_pull_at": "2026-05-17T11:16:00Z",
  "pending_conflicts": 0,
  "client_clock": 43,
  "server_clock": 1891,
  "in_sync": true
}`}</code></pre>

      <h2>Client SDK usage</h2>
      <pre><code>{`import { AetherSync } from '@aetherdb/sync'

const sync = new AetherSync({
  token: process.env.AETHERDB_TOKEN,
  clientId: 'device_' + deviceId,
  tables: ['notes', 'tasks']
})

// Write locally — works offline
await sync.local('notes').update('note_01J...', {
  content: 'Updated content'
})

// Sync when connection is available
sync.onOnline(async () => {
  const result = await sync.push()
  console.log(\`Pushed \${result.accepted} changes\`)

  await sync.pull()
  console.log('Pulled latest from server')
})`}</code></pre>

      <h2>CRDT conflict rules</h2>
      <ul>
        <li><strong>Last-Write-Wins (LWW)</strong>: higher <code>client_clock</code> or <code>server_clock</code> wins field-level conflicts</li>
        <li><strong>INSERT wins over DELETE</strong>: if a client inserts a row that another client deleted, the insert is preserved (tombstone cleared)</li>
        <li><strong>Field-level granularity</strong>: only conflicting fields are flagged — non-conflicting fields from both versions are merged automatically</li>
        <li><strong>Manual override</strong>: use the resolve API to supply a custom merged value for any conflict</li>
      </ul>

      <h2>Use cases</h2>
      <ul>
        <li>Mobile apps that must work without connectivity (flights, remote locations)</li>
        <li>Edge devices (IoT sensors, retail POS) that batch writes periodically</li>
        <li>Progressive Web Apps with offline-first architecture</li>
        <li>Multi-device personal apps where the same user works across phone and desktop</li>
      </ul>
    </>
  )
}
