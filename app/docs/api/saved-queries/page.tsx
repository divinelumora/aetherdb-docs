export default function SavedQueriesPage() {
  return (
    <>
      <h1>Saved Queries</h1>
      <p>Saved queries let you name, store, tag, and instantly rerun SQL snippets. They persist across sessions and can optionally be made public so teammates can use them too.</p>

      <h2>Create a saved query</h2>
      <pre><code>{`POST https://app.aetherdb.cloud/db/queries/saved
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Monthly revenue",
  "sql": "SELECT sum(amount) FROM orders WHERE created_at > now() - interval '30 days'",
  "description": "Total revenue for the last 30 days",
  "is_public": false,
  "tags": ["finance", "reporting"]
}

// Response 201:
{
  "id": 1,
  "name": "Monthly revenue",
  "sql": "...",
  "run_count": 0,
  "tags": ["finance", "reporting"],
  "created_at": "2026-04-04T10:00:00Z"
}`}</code></pre>

      <h2>List saved queries</h2>
      <pre><code>{`GET https://app.aetherdb.cloud/db/queries/saved
Authorization: Bearer <token>

// Returns your queries + any public queries from other users.
{ "queries": [...], "count": 5 }`}</code></pre>

      <h2>Run a saved query</h2>
      <pre><code>{`POST https://app.aetherdb.cloud/db/queries/saved/{id}/run
Authorization: Bearer <token>

// Response 200:
{
  "rows": [{ "sum": 48320.50 }],
  "count": 1
}
// run_count is automatically incremented.`}</code></pre>

      <h2>Update / Delete</h2>
      <pre><code>{`PUT    /db/queries/saved/{id}   — update (owner only)
DELETE /db/queries/saved/{id}   — delete (owner only)
GET    /db/queries/saved/{id}   — get one`}</code></pre>

      <h2>JavaScript SDK</h2>
      <pre><code>{`// Save
const q = await db.saveQuery({
  name: 'Active users today',
  sql: "SELECT count(*) FROM users WHERE last_seen > now() - interval '1 day'",
  tags: ['users'],
})

// List
const { queries } = await db.listSavedQueries()

// Run
const { rows } = await db.runSavedQuery(q.id)

// Update
await db.updateSavedQuery(q.id, { ...q, is_public: true })

// Delete
await db.deleteSavedQuery(q.id)`}</code></pre>
    </>
  )
}
