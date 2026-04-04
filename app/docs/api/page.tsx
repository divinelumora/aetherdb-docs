export default function APIPage() {
  return (
    <>
      <h1>API reference</h1>
      <p>
        AetherDB exposes a REST API at <code>https://app.aetherdb.cloud</code> and a gRPC server on port 50051.
        All protected endpoints require a JWT Bearer token.
      </p>

      <h2>Base URL</h2>
      <pre><code>https://app.aetherdb.cloud</code></pre>

      <h2>Authentication</h2>
      <p>Include your JWT token in the Authorization header:</p>
      <pre><code>{`Authorization: Bearer eyJhbGci...`}</code></pre>

      <h2>Endpoints overview</h2>

      <h3>Public</h3>
      <pre><code>{`GET  /health              — Server health check
POST /auth/register       — Create account + provision schema
POST /auth/login          — Sign in, get JWT token`}</code></pre>

      <h3>Protected (JWT required)</h3>
      <pre><code>{`GET  /db/me               — Current user info
GET  /db/schema           — System schema

POST /db/query            — Raw SQL query (system)
POST /db/ai/query         — AI natural language query (system)

GET  /tenant/info         — Your connection string
GET  /tenant/schema       — Your tables
POST /tenant/tables       — Create a table
POST /tenant/query        — Query your data
POST /tenant/insert       — Insert into your tables
POST /tenant/ai/query     — AI query on your data

GET  /db/projects         — List projects
POST /db/projects         — Create project
POST /db/projects/:id/keys — Generate API key
DELETE /db/projects/:id/keys/:keyId — Revoke key

GET  /db/realtime/subscribe — SSE stream
POST /db/realtime/enable    — Enable realtime on a table

GET  /mcp/tools           — List MCP tools (public)
POST /mcp/call            — Call an MCP tool (public)`}</code></pre>

      <h2>Response format</h2>
      <p>All responses are JSON. Errors follow this format:</p>
      <pre><code>{`{ "error": "description of what went wrong" }`}</code></pre>

      <h2>Rate limits</h2>
      <p>Currently no rate limits are enforced. This will change when billing is introduced.</p>
    </>
  )
}
