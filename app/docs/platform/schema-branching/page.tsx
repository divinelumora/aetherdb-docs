export default function SchemaBranchingPage() {
  return (
    <>
      <h1>Schema Branching</h1>
      <p>
        Schema Branching gives your database Git-style version control for schema changes. Create isolated branches, run migrations safely, diff changes between branches, and merge back to production — all without downtime or risk to live data.
      </p>

      <h2>Overview</h2>
      <p>
        Every AetherDB project supports multiple schema branches. A <strong>branch</strong> is a full copy of your schema (tables, indexes, constraints) in a separate Postgres schema namespace. Branches are cheap to create and can be deleted at any time.
      </p>
      <ul>
        <li>Branches are isolated — changes on a branch never affect other branches until merged</li>
        <li>Each branch has its own data, so you can seed test data without polluting production</li>
        <li>Diff shows you exactly which tables and columns changed between two branches</li>
        <li>Merge generates and applies the SQL migration to the target branch</li>
      </ul>

      <h2>API Reference</h2>

      <h3>Create a branch</h3>
      <pre><code>{`POST /schema-branches
Authorization: Bearer <token>

{
  "branch_name": "feature/add-user-preferences",
  "source_branch": "main"
}

// Response
{
  "id": "br_01J...",
  "branch_name": "feature/add-user-preferences",
  "source_branch": "main",
  "status": "active",
  "created_at": "2026-05-17T10:00:00Z"
}`}</code></pre>

      <h3>List branches</h3>
      <pre><code>{`GET /schema-branches
Authorization: Bearer <token>

// Response
{
  "branches": [
    { "id": "br_01J...", "branch_name": "main", "status": "active" },
    { "id": "br_02J...", "branch_name": "feature/add-user-preferences", "status": "active" }
  ]
}`}</code></pre>

      <h3>Diff two branches</h3>
      <pre><code>{`GET /schema-branches/diff?from=main&to=feature/add-user-preferences
Authorization: Bearer <token>

// Response
{
  "added_tables": ["user_preferences"],
  "modified_tables": ["users"],
  "dropped_tables": [],
  "changes": [
    {
      "type": "add_table",
      "table": "user_preferences",
      "sql": "CREATE TABLE user_preferences (id UUID PRIMARY KEY, user_id UUID REFERENCES users(id), theme TEXT, created_at TIMESTAMPTZ DEFAULT now())"
    },
    {
      "type": "add_column",
      "table": "users",
      "column": "last_seen_at",
      "sql": "ALTER TABLE users ADD COLUMN last_seen_at TIMESTAMPTZ"
    }
  ]
}`}</code></pre>

      <h3>Merge a branch</h3>
      <pre><code>{`POST /schema-branches/merge
Authorization: Bearer <token>

{
  "source": "feature/add-user-preferences",
  "target": "main",
  "squash": true
}

// Response
{
  "migration_id": "mig_01J...",
  "applied_statements": 2,
  "status": "merged"
}`}</code></pre>

      <h3>Delete a branch</h3>
      <pre><code>{`DELETE /schema-branches/:branch_name
Authorization: Bearer <token>

// Response 204 No Content`}</code></pre>

      <h2>Workflow example</h2>
      <pre><code>{`// 1. Create feature branch
POST /schema-branches
{ "branch_name": "feat/payments", "source_branch": "main" }

// 2. Run migrations on the branch
POST /tenant/query
{ "branch": "feat/payments", "sql": "CREATE TABLE payments (...)" }

// 3. Review diff before merging
GET /schema-branches/diff?from=main&to=feat/payments

// 4. Merge to production
POST /schema-branches/merge
{ "source": "feat/payments", "target": "main" }

// 5. Clean up
DELETE /schema-branches/feat/payments`}</code></pre>

      <h2>Limits</h2>
      <ul>
        <li>Free tier: up to 3 concurrent branches</li>
        <li>Pro tier: unlimited branches</li>
        <li>Branch data is not replicated to Multi-Cloud Replication targets until merged to main</li>
      </ul>
    </>
  )
}
