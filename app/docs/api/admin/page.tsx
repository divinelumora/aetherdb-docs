export default function AdminAPIPage() {
  return (
    <>
      <h1>Admin API</h1>
      <p>Platform-wide user management and monitoring. All admin routes require a JWT token with <code>role=admin</code>. Non-admin requests receive <code>403 Forbidden</code>.</p>
      <p>To grant admin access, set <code>role = &apos;admin&apos;</code> directly in the database for the desired user. Admin status cannot be self-assigned via the API.</p>

      <h2>GET /admin/stats</h2>
      <p>Returns platform-wide aggregate statistics.</p>
      <pre><code>{`GET /admin/stats
Authorization: Bearer <admin-token>

{
  "total_users": 248,
  "active_users": 241,
  "suspended_users": 7,
  "total_queries_today": 12483,
  "pro_subscribers": 38,
  "team_subscribers": 6,
  "total_file_size_mb": 4821.3
}`}</code></pre>

      <h2>GET /admin/users</h2>
      <p>Returns all users enriched with subscription and monthly usage data. Supports pagination via <code>?limit=50&amp;offset=0</code> (max limit 200).</p>
      <pre><code>{`GET /admin/users?limit=25&offset=0
Authorization: Bearer <admin-token>

{
  "total": 248,
  "users": [
    {
      "id": 1,
      "email": "alice@example.com",
      "plan_name": "pro",
      "sub_status": "active",
      "queries_month": 3412,
      "file_size_mb": 18.2,
      "suspended": false,
      "last_active": "2026-04-08T14:22:11Z"
    }
  ]
}`}</code></pre>

      <h2>POST /admin/users/:id/suspend</h2>
      <h2>POST /admin/users/:id/unsuspend</h2>
      <p>Suspended users receive <code>403 Forbidden</code> on all authenticated routes immediately. Suspension does not delete data.</p>
      <pre><code>{`POST /admin/users/42/suspend
→ { "status": "suspended" }

// SDK
await db.adminSuspendUser(42)
await db.adminUnsuspendUser(42)`}</code></pre>

      <h2>PATCH /admin/users/:id/plan</h2>
      <p>Manually set a user plan without going through Stripe — useful for granting free trials or correcting billing errors.</p>
      <pre><code>{`PATCH /admin/users/42/plan
Content-Type: application/json

{ "plan": "pro" }
→ { "plan": "pro" }

// SDK
await db.adminChangePlan(42, 'pro')`}</code></pre>

      <h2>DELETE /admin/users/:id</h2>
      <p>Permanently deletes a user and all their data (tenant rows, files, saved queries, webhooks, audit logs, subscription). <strong>Irreversible.</strong> Admins cannot delete their own account.</p>
      <pre><code>{`DELETE /admin/users/42
→ 204 No Content`}</code></pre>
    </>
  )
}
