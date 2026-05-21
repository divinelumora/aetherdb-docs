import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AetherDB — AI-Native Database Infrastructure',
  description:
    '10 industry-first database features: Schema Branching, Time Travel, Compliance Autopilot, AI Co-Pilot, Intent-Based Scaling, Semantic Types, Live Schema Docs, Multi-Cloud Replication, Collaborative Workspaces, and Offline-First Sync.',
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
      {children}
    </span>
  )
}

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-900 transition-all group">
      <div className="text-2xl mb-4">{icon}</div>
      <h3 className="text-sm font-semibold text-slate-200 mb-2">{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-3xl font-semibold text-cyan-400 mb-1">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080B0F] text-slate-200 overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 bg-[#050810]/95 backdrop-blur-md border-b border-slate-800/60" style={{ height: '80px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="AetherDB" style={{ height: '64px', width: 'auto', display: 'block' }} />
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
          <Link href="/docs" className="hover:text-slate-100 transition-colors">Docs</Link>
          <Link href="/docs/api" className="hover:text-slate-100 transition-colors">API</Link>
          <Link href="/docs/sdk" className="hover:text-slate-100 transition-colors">SDK</Link>
          <Link href="/docs/quickstart" className="hover:text-slate-100 transition-colors">Quickstart</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="https://app.aetherdb.cloud/login" className="text-sm text-slate-400 hover:text-slate-100 transition-colors hidden md:block font-medium">Sign in</Link>
          <Link href="https://app.aetherdb.cloud/login" className="text-sm px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-slate-900 font-bold rounded-xl transition-all shadow-lg shadow-cyan-500/20">
            Get started free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-28 pb-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-500/8 rounded-full blur-[120px]" />
          <div className="absolute top-20 left-1/4 w-[350px] h-[350px] bg-purple-600/8 rounded-full blur-[100px]" />
          <div className="absolute top-10 right-1/4 w-[250px] h-[250px] bg-blue-500/8 rounded-full blur-[80px]" />
        </div>
        <div className="relative max-w-5xl mx-auto">
          <Badge>10 industry firsts · Now in production</Badge>
          <h1 className="mt-8 text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight">
            The database with<br />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              10 industry firsts.
            </span>
          </h1>
          <p className="mt-6 text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Schema branching. Time travel. Compliance autopilot. Semantic NEAR queries. Multi-cloud replication.
            Collaborative workspaces. Offline-first sync. Features no other database has shipped — all production-ready.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link href="https://app.aetherdb.cloud/login"
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 text-slate-900 font-bold rounded-xl text-base transition-all shadow-xl shadow-cyan-500/25">
              Start building free →
            </Link>
            <Link href="/docs/quickstart"
              className="px-8 py-4 bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-semibold rounded-xl text-base transition-all">
              Read the docs
            </Link>
          </div>
          <div className="mt-14 bg-[#0D1117] border border-slate-800 rounded-2xl p-6 text-left max-w-2xl mx-auto shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              <span className="ml-2 text-xs text-slate-600 font-mono">aetherdb-features.ts</span>
            </div>
            <pre className="text-sm font-mono leading-relaxed overflow-x-auto" style={{ background: 'none', border: 'none', padding: 0 }}>
              <code>{`// Time Travel — query data AS OF any past timestamp
GET /rowhistory/history/orders?as_of=2026-01-15T00:00:00Z

// Semantic NEAR query — LLM-ranked, no embeddings API
POST /semantic/search
{ "tableName": "users", "columnName": "bio",
  "query": "early adopter, technical background" }

// AI Co-Pilot — natural language to SQL
POST /copilot/generate
{ "prompt": "Top 10 customers by revenue last 30 days" }

// Schema Branch — safe schema changes
POST /branches/:id/migrate
{ "sql": "ALTER TABLE users ADD COLUMN prefs JSONB" }`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-slate-800/60">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          <Stat value="10+" label="Industry firsts" />
          <Stat value="&lt; 4ms" label="P99 query latency" />
          <Stat value="3-Cloud" label="Replication support" />
          <Stat value="100%" label="Sovereign architecture" />
        </div>
      </section>

      {/* Tier 1 */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-4">
              Tier 1 · Industry Firsts
            </span>
            <h2 className="text-3xl font-semibold text-slate-100">5 features no database has.</h2>
            <p className="mt-3 text-slate-500 text-sm max-w-xl mx-auto">Not on a roadmap — shipped to production today.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard icon="🌿" title="Schema Branching" desc="Git-like branches for your live schema. Create, migrate, merge, and roll back schema changes with zero downtime." />
            <FeatureCard icon="⏳" title="Time Travel AS OF" desc="Query any table AS OF a past timestamp. Full row-level change history — replay your entire database state at any point in time." />
            <FeatureCard icon="🛡️" title="Compliance Autopilot" desc="AI-powered PII detection, GDPR right-to-erasure queue, and real-time compliance score. Privacy at the database layer." />
            <FeatureCard icon="🤖" title="AI Query Co-Pilot" desc="Pre-execution SQL risk analysis, missing index detection, optimized rewrite. Plus NL→SQL generation from plain English." />
            <FeatureCard icon="📐" title="Intent-Based Scaling" desc="Describe your workload in English → full resource config: replicas, pool size, cache, vCPU, memory, estimated cost." />
          </div>
        </div>
      </section>

      {/* Tier 2+ */}
      <section className="py-24 px-6 bg-slate-900/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4"
              style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.3)', color: '#a78bfa' }}>
              Tier 2+ · New Database Primitives
            </span>
            <h2 className="text-3xl font-semibold text-slate-100">5 new database primitives.</h2>
            <p className="mt-3 text-slate-500 text-sm max-w-xl mx-auto">Capabilities that didn&apos;t exist in any database before AetherDB.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard icon="🔍" title="Semantic Types" desc="First-class semantic columns. Run plain-English NEAR queries on any text column — LLM-ranked, no embedding API required." />
            <FeatureCard icon="📖" title="Live Schema Docs" desc="AI-generated documentation always in sync with your live schema. Every table and column documented automatically." />
            <FeatureCard icon="🌐" title="Multi-Cloud Replication" desc="Zero vendor lock-in. Replicate simultaneously to AWS RDS, Google Cloud SQL, and Azure Database with live lag monitoring." />
            <FeatureCard icon="👥" title="Collaborative Workspaces" desc="Shared SQL notebooks with real-time SSE sync. Your whole team runs queries, stores results, and annotates — live." />
            <FeatureCard icon="📴" title="Offline-First Sync" desc="CRDT-based conflict resolution so your app works fully offline. LWW merging with manual override for every conflict." />
            <FeatureCard icon="📜" title="Row History" desc="Automatic row-level change tracking for every INSERT, UPDATE, and DELETE. Reconstruct table state at any timestamp." />
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-semibold text-slate-100">Everything else your app needs</h2>
            <p className="mt-3 text-slate-500 text-sm max-w-xl mx-auto">The full platform stack — beyond the 10 industry firsts.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard icon="🗄️" title="Multi-tenant PostgreSQL" desc="Every user gets an isolated Postgres schema (tenant_N) auto-provisioned on signup. Full RLS, no cross-tenant data leakage." />
            <FeatureCard icon="🧠" title="Natural language queries" desc="Ask questions in plain English. AetherDB generates and executes SQL automatically using Groq LLaMA 70B." />
            <FeatureCard icon="🔷" title="pgvector embeddings" desc="Store and query vector embeddings natively. Semantic search, RAG pipelines, and similarity scoring built in." />
            <FeatureCard icon="⚡" title="Realtime subscriptions" desc="Subscribe to any table via SSE using Postgres LISTEN/NOTIFY. Live updates with no polling, no external broker." />
            <FeatureCard icon="🔗" title="REST + gRPC dual transport" desc="Full REST API for browser clients. gRPC for high-throughput server-to-server workloads." />
            <FeatureCard icon="🪝" title="Webhooks" desc="Register HTTP callbacks on insert, update, or delete. HMAC-SHA256 signed. Auto-disabled after 10 failures." />
            <FeatureCard icon="📁" title="File storage" desc="Upload, download, and delete files up to 50 MB. Stored in Postgres BYTEA — no S3 bucket needed." />
            <FeatureCard icon="📥" title="CSV / JSON import" desc="Bulk-load data from CSV or JSON files. Tables auto-created with correct columns." />
            <FeatureCard icon="🤝" title="MCP server" desc="Plug AetherDB into Claude, Cursor, and any MCP-compatible AI agent." />
          </div>
        </div>
      </section>

      {/* SDK */}
      <section className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge>JavaScript SDK</Badge>
            <h2 className="mt-4 text-3xl font-semibold text-slate-100 leading-snug">Fully typed.<br />Zero config.</h2>
            <p className="mt-4 text-slate-500 text-sm leading-relaxed">
              Install <code className="text-cyan-400 bg-slate-800 px-1.5 py-0.5 rounded text-xs">aetherdb-js</code> and get
              a complete client with query builder, file upload, webhooks, AI queries — all typed with TypeScript generics.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-400">
              {['Works in Node.js, browsers, and edge runtimes', 'Fluent query builder with SQL injection prevention', 'Automatic token refresh with no extra code', 'Full TypeScript generics on all query results'].map(item => (
                <li key={item} className="flex items-start gap-2"><span className="text-cyan-400 mt-0.5">✓</span>{item}</li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <Link href="/docs/sdk" className="text-sm px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-semibold rounded-lg transition-colors">SDK docs</Link>
              <Link href="/docs/sdk/query-builder" className="text-sm px-4 py-2 border border-slate-700 hover:border-slate-600 text-slate-300 rounded-lg transition-colors">Query builder</Link>
            </div>
          </div>
          <div className="bg-[#0D1117] border border-slate-800 rounded-2xl p-6 font-mono text-sm leading-relaxed overflow-x-auto">
            <pre style={{ background: 'none', border: 'none', padding: 0 }}>
              <code>{`const db = new AetherDB({ url, token })

const { rows } = await db
  .from('orders').select('id, total')
  .eq('status', 'pending')
  .order('total', 'DESC').limit(10).execute()

const result = await db.ai(
  'top 5 customers by spend this month'
)

const file = await db.uploadFile(myFile)
const m    = await db.getMetrics()`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-slate-100">How AetherDB compares</h2>
            <p className="mt-3 text-slate-500 text-sm">10 features the competition doesn&apos;t have.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-3 px-4 text-slate-400 font-medium w-48">Feature</th>
                  <th className="py-3 px-4 text-cyan-400 font-semibold">AetherDB</th>
                  <th className="py-3 px-4 text-slate-500 font-medium">Supabase</th>
                  <th className="py-3 px-4 text-slate-500 font-medium">Neon</th>
                  <th className="py-3 px-4 text-slate-500 font-medium">PlanetScale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50">
                {[
                  ['Schema Branching', '✓', '✗', '✗', '✓'],
                  ['Time Travel AS OF', '✓', '✗', '✗', '✓'],
                  ['Compliance Autopilot', '✓', '✗', '✗', '✗'],
                  ['AI Query Co-Pilot', '✓', '✗', '✗', '✗'],
                  ['Intent-Based Scaling', '✓', '✗', '✗', '✗'],
                  ['Semantic NEAR Queries', '✓', '✗', '✗', '✗'],
                  ['Live Schema Docs', '✓', '✗', '✗', '✗'],
                  ['Multi-Cloud Replication', '✓', '✗', '✗', '✗'],
                  ['Collaborative Workspaces', '✓', '✗', '✗', '✗'],
                  ['Offline-First CRDT Sync', '✓', '✗', '✗', '✗'],
                  ['NL → SQL (AI queries)', '✓', '✗', '✗', '✗'],
                  ['Multi-tenant schemas', '✓', 'Partial', '✗', '✗'],
                  ['pgvector embeddings', '✓', '✓', '✓', '✗'],
                  ['MCP server (AI agents)', '✓', '✗', '✗', '✗'],
                  ['Audit logs', '✓', '✓', '✗', '✓'],
                ].map(([feature, ...vals]) => (
                  <tr key={feature} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 text-slate-400">{feature}</td>
                    {vals.map((v, i) => (
                      <td key={i} className={`py-3 px-4 text-center ${v === '✓' ? 'text-emerald-400' : v === '✗' ? 'text-slate-700' : 'text-amber-400'}`}>{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-b from-slate-900 to-slate-900/50 border border-slate-800 rounded-3xl px-8 py-16">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-6">
              <div className="w-5 h-5 rounded bg-cyan-400" />
            </div>
            <h2 className="text-3xl font-semibold text-slate-100 mb-4">The future of databases is sovereign.</h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">10 industry-first features. Free tier. No credit card. Your data stays yours — always.</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="https://app.aetherdb.cloud/login"
                className="px-8 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-cyan-500/20">
                Create free account →
              </Link>
              <Link href="/docs/quickstart"
                className="px-8 py-3.5 bg-transparent border border-slate-700 hover:border-slate-600 text-slate-300 rounded-xl text-sm transition-colors">
                View quickstart
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 rounded bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-sm bg-cyan-400" />
                </div>
                <span className="font-semibold text-sm text-slate-300">AetherDB</span>
              </div>
              <p className="text-xs text-slate-600 max-w-xs leading-relaxed">AI-native database infrastructure with 10 industry-first features.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
              <div>
                <p className="text-slate-400 font-medium mb-3">Product</p>
                <ul className="space-y-2">
                  <li><Link href="/docs/quickstart" className="text-slate-600 hover:text-slate-300 transition-colors">Quickstart</Link></li>
                  <li><Link href="/docs/api" className="text-slate-600 hover:text-slate-300 transition-colors">API reference</Link></li>
                  <li><Link href="/docs/sdk" className="text-slate-600 hover:text-slate-300 transition-colors">JavaScript SDK</Link></li>
                  <li><Link href="https://app.aetherdb.cloud/docs" className="text-slate-600 hover:text-slate-300 transition-colors">Swagger UI</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-slate-400 font-medium mb-3">Features</p>
                <ul className="space-y-2">
                  <li><Link href="/docs/platform/schema-branching" className="text-slate-600 hover:text-slate-300 transition-colors">Schema Branching</Link></li>
                  <li><Link href="/docs/platform/time-travel" className="text-slate-600 hover:text-slate-300 transition-colors">Time Travel</Link></li>
                  <li><Link href="/docs/platform/compliance" className="text-slate-600 hover:text-slate-300 transition-colors">Compliance Autopilot</Link></li>
                  <li><Link href="/docs/platform/semantic" className="text-slate-600 hover:text-slate-300 transition-colors">Semantic Types</Link></li>
                  <li><Link href="/docs/platform/replication" className="text-slate-600 hover:text-slate-300 transition-colors">Multi-Cloud Replication</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-slate-400 font-medium mb-3">Platform</p>
                <ul className="space-y-2">
                  <li><Link href="https://app.aetherdb.cloud" className="text-slate-600 hover:text-slate-300 transition-colors">Dashboard</Link></li>
                  <li><Link href="/docs/platform/workspaces" className="text-slate-600 hover:text-slate-300 transition-colors">Workspaces</Link></li>
                  <li><Link href="/docs/platform/sync" className="text-slate-600 hover:text-slate-300 transition-colors">Offline Sync</Link></li>
                  <li><Link href="/docs/api/mcp" className="text-slate-600 hover:text-slate-300 transition-colors">MCP server</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-slate-800/40 flex items-center justify-between text-xs text-slate-700">
            <span>© 2026 AetherDB. All rights reserved.</span>
            <span>Built with Next.js · Deployed on Vercel</span>
          </div>
        </div>
      </footer>

    </div>
  )
}
