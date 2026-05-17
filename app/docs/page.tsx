export default function IntroPage() {
  return (
    <>
      <h1>Introduction</h1>
      <p>
        AetherDB is an AI-native database infrastructure platform — like Supabase or Neon, but built from the ground up for AI applications and agents, with <strong>10 industry-first database features</strong> that no other managed database offers.
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

      <h2>10 Industry-First Features</h2>
      <p>AetherDB ships capabilities that don't exist anywhere else in managed databases:</p>

      <h3>Tier 1 — Core Intelligence</h3>
      <ul>
        <li><strong><a href="/docs/platform/schema-branching">Schema Branching</a></strong> — Git-style branches for your database schema. Create, merge, and diff branches without touching production.</li>
        <li><strong><a href="/docs/platform/time-travel">Time Travel (AS OF)</a></strong> — Query any table as it existed at any past timestamp. Full row history with microsecond precision.</li>
        <li><strong><a href="/docs/platform/compliance">Compliance Autopilot</a></strong> — Automated PII detection, GDPR erasure workflows, and live compliance scoring built into the database layer.</li>
        <li><strong><a href="/docs/platform/ai-copilot">AI Query Co-Pilot</a></strong> — Every query is analyzed by an AI co-pilot that rewrites slow SQL, explains plans, and generates natural-language summaries.</li>
        <li><strong><a href="/docs/platform/scaling">Intent-Based Scaling</a></strong> — Describe your workload in natural language. AetherDB recommends and applies the optimal infrastructure configuration.</li>
      </ul>

      <h3>Tier 2+ — Advanced Capabilities</h3>
      <ul>
        <li><strong><a href="/docs/platform/semantic">Semantic Types</a></strong> — Store unstructured text and query it by meaning, not keywords. Built-in LLM ranker explains why each result matched.</li>
        <li><strong><a href="/docs/platform/schemadocs">Live Schema Docs</a></strong> — Auto-generated, always-current documentation for every table and column. AI-written descriptions update on every migration.</li>
        <li><strong><a href="/docs/platform/replication">Multi-Cloud Replication</a></strong> — Replicate to AWS RDS, Google Cloud SQL, and Azure Database simultaneously. Pause, resume, and monitor per-target.</li>
        <li><strong><a href="/docs/platform/workspaces">Collaborative Workspaces</a></strong> — Real-time shared query editors with SSE-based presence, inline annotations, and conflict-free collaboration.</li>
        <li><strong><a href="/docs/platform/sync">Offline-First Sync</a></strong> — LWW-CRDT sync engine for edge and mobile clients. Push local changes, pull remote state, auto-resolve conflicts.</li>
      </ul>

      <h2>Architecture</h2>
      <p>
        AetherDB is a multi-tenant Postgres platform built on NestJS, deployed on Railway. Each tenant gets an isolated schema within a shared Postgres instance. The API is organized into route groups:
      </p>
      <ul>
        <li><code>/auth</code> — JWT-based authentication and session management</li>
        <li><code>/tenant</code> — Tenant provisioning, AI queries, usage metrics</li>
        <li><code>/projects</code> — Project CRUD within a tenant schema</li>
        <li><code>/schema-branches</code> — Branch creation, merge, diff, delete</li>
        <li><code>/rows/history</code> — Time Travel AS OF queries and row audit log</li>
        <li><code>/compliance</code> — PII scan, GDPR erasure, compliance score</li>
        <li><code>/ai-copilot</code> — SQL analysis, natural-language-to-SQL, query explain</li>
        <li><code>/scaling</code> — Intent recommendation and configuration apply</li>
        <li><code>/semantic</code> — Semantic type ingest, NEAR search, LLM ranker</li>
        <li><code>/schema-docs</code> — Generate, retrieve, and update schema documentation</li>
        <li><code>/replication</code> — Multi-cloud target management and status</li>
        <li><code>/workspaces</code> — Collaborative sessions, SSE presence, annotations</li>
        <li><code>/sync</code> — Offline-first push/pull/resolve with CRDT conflict resolution</li>
      </ul>

      <h2>Quickstart</h2>
      <p>
        Head to the <a href="/docs/quickstart">Quickstart guide</a> to provision your first tenant and run your first query in under 5 minutes.
      </p>
    </>
  )
}
