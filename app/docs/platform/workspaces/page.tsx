export default function WorkspacesPage() {
  return (
    <>
      <h1>Collaborative Workspaces</h1>
      <p>
        Collaborative Workspaces provide real-time shared query editors for teams. Multiple users can work in the same workspace simultaneously with SSE-based presence, inline query annotations, and conflict-free session management.
      </p>

      <h2>Overview</h2>
      <p>
        A <strong>workspace</strong> is a named session that holds a query editor state. Any number of users can join a workspace. Presence events (who is typing, who is viewing) are streamed in real-time via Server-Sent Events. Annotations let users leave comments on specific query lines without disrupting execution.
      </p>

      <h2>API Reference</h2>

      <h3>Create a workspace</h3>
      <pre><code>{`POST /workspaces
Authorization: Bearer <token>

{
  "name": "Q2 Revenue Analysis",
  "initial_query": "SELECT * FROM orders WHERE created_at >= '2026-04-01'"
}

// Response
{
  "workspace_id": "ws_01J...",
  "name": "Q2 Revenue Analysis",
  "share_url": "https://app.aetherdb.cloud/workspace/ws_01J...",
  "created_at": "2026-05-17T11:00:00Z"
}`}</code></pre>

      <h3>List workspaces</h3>
      <pre><code>{`GET /workspaces
Authorization: Bearer <token>

// Response
{
  "workspaces": [
    {
      "workspace_id": "ws_01J...",
      "name": "Q2 Revenue Analysis",
      "active_users": 2,
      "last_activity": "2026-05-17T11:05:00Z"
    }
  ]
}`}</code></pre>

      <h3>Join workspace presence (SSE)</h3>
      <pre><code>{`GET /workspaces/:workspace_id/presence
Authorization: Bearer <token>
Accept: text/event-stream

// SSE stream events:
event: join
data: {"user_id":"usr_abc","name":"Alice","joined_at":"2026-05-17T11:06:00Z"}

event: typing
data: {"user_id":"usr_abc","cursor_line":12,"cursor_col":8}

event: leave
data: {"user_id":"usr_xyz","left_at":"2026-05-17T11:10:00Z"}

event: query_update
data: {"user_id":"usr_abc","query":"SELECT * FROM orders WHERE status = 'paid' LIMIT 100","updated_at":"2026-05-17T11:08:00Z"}`}</code></pre>

      <h3>Update workspace query</h3>
      <pre><code>{`PATCH /workspaces/:workspace_id
Authorization: Bearer <token>

{
  "query": "SELECT id, user_id, amount, status FROM orders WHERE status = 'paid' AND created_at >= '2026-04-01' ORDER BY amount DESC LIMIT 50"
}

// Response
{
  "workspace_id": "ws_01J...",
  "query_updated": true,
  "version": 7
}`}</code></pre>

      <h3>Add an annotation</h3>
      <pre><code>{`POST /workspaces/:workspace_id/annotations
Authorization: Bearer <token>

{
  "line": 3,
  "text": "Note: this LIMIT might miss large orders — consider pagination"
}

// Response
{
  "annotation_id": "ann_01J...",
  "workspace_id": "ws_01J...",
  "line": 3,
  "text": "Note: this LIMIT might miss large orders — consider pagination",
  "author": "usr_abc",
  "created_at": "2026-05-17T11:09:00Z"
}`}</code></pre>

      <h3>Get annotations for a workspace</h3>
      <pre><code>{`GET /workspaces/:workspace_id/annotations
Authorization: Bearer <token>

// Response
{
  "annotations": [
    {
      "annotation_id": "ann_01J...",
      "line": 3,
      "text": "Note: this LIMIT might miss large orders — consider pagination",
      "author": "Alice",
      "created_at": "2026-05-17T11:09:00Z"
    }
  ]
}`}</code></pre>

      <h3>Delete a workspace</h3>
      <pre><code>{`DELETE /workspaces/:workspace_id
Authorization: Bearer <token>

// Response 204 No Content`}</code></pre>

      <h2>Client-side SSE example</h2>
      <pre><code>{`const token = 'your-token'
const workspaceId = 'ws_01J...'

const es = new EventSource(
  \`https://api.aetherdb.cloud/workspaces/\${workspaceId}/presence\`,
  { headers: { Authorization: \`Bearer \${token}\` } }
)

es.addEventListener('join', (e) => {
  const { name } = JSON.parse(e.data)
  console.log(\`\${name} joined the workspace\`)
})

es.addEventListener('query_update', (e) => {
  const { user_id, query } = JSON.parse(e.data)
  updateEditorContent(query)
})

es.addEventListener('typing', (e) => {
  const { user_id, cursor_line } = JSON.parse(e.data)
  showCursorIndicator(user_id, cursor_line)
})`}</code></pre>

      <h2>Permissions</h2>
      <ul>
        <li>Workspace creator can invite users by email or share the <code>share_url</code></li>
        <li>All workspace members can read, update the query, and add annotations</li>
        <li>Only the creator can delete a workspace</li>
        <li>Workspaces are scoped to a tenant — users from other tenants cannot join</li>
      </ul>
    </>
  )
}
