export default function IntroPage() {
  return (
    <>
      <h1>Introduction</h1>
      <p>
        AetherDB is an AI-native database infrastructure platform — like Supabase or Neon, but built from the ground up for AI applications and agents.
      </p>

      <h2>What makes AetherDB different</h2>
      <ul>
        <li><strong>Natural language queries</strong> — ask questions in plain English, AetherDB generates and executes SQL automatically using Groq</li>
        <li><strong>Multi-tenancy built in</strong> — every user gets their own isolated Postgres schema, auto-provisioned on signup</li>
        <li><strong>REST + gRPC</strong> — both protocols supported out of the box</li>
        <li><strong>MCP server</strong> — AI agents like Claude, Cursor, and Copilot can connect directly</li>
        <li><strong>pgvector</strong> — native embedding storage and similarity search</li>
        <li><strong>Realtime</strong> — database change streams via SSE, powered by Postgres LISTEN/NOTIFY</li>
      </ul>

      <h2>Architecture</h2>
      <p>
        AetherDB runs as a single Go binary that exposes both a REST API and a gRPC server. Each user gets their own isolated Postgres schema. The AI query engine connects to Groq to convert natural language to SQL.
      </p>

      <pre><code>{`Your App
  └── aetherdb-js SDK
        └── https://aetherdb.cloud
              ├── REST API (:8080)
              ├── gRPC (:50051)
              └── PostgreSQL
                    ├── tenant_1 (user A's schema)
                    ├── tenant_2 (user B's schema)
                    └── tenant_N ...`}</code></pre>

      <h2>Hosted vs self-hosted</h2>
      <p>
        AetherDB is available as a hosted service at <a href="https://aetherdb.cloud">aetherdb.cloud</a>. The source code is open and can be self-hosted on any Linux server.
      </p>

      <h2>Next steps</h2>
      <ul>
        <li><a href="/docs/quickstart">Quickstart</a> — get up and running in 5 minutes</li>
        <li><a href="/docs/sdk">JavaScript SDK</a> — install and use aetherdb-js</li>
        <li><a href="/docs/api">API reference</a> — full REST API documentation</li>
      </ul>
    </>
  )
}
