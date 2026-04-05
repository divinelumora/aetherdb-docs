import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AetherDB — AI-Native Database Infrastructure',
  description:
    'The database built for AI-first applications. Multi-tenant PostgreSQL with REST, gRPC, natural language queries, pgvector, realtime subscriptions, and a full JavaScript SDK.',
}

// ── Reusable primitives ───────────────────────────────────────────────────────

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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080B0F] text-slate-200 overflow-x-hidden">

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 bg-[#080B0F]/80 backdrop-blur-md border-b border-slate-800/60">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
            <div className="w-3 h-3 rounded-sm bg-cyan-400" />
          </div>
          <span className="font-semibold text-slate-100">
            Aether<span className="text-cyan-400">DB</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
          <Link href="/docs" className="hover:text-slate-200 transition-colors">Docs</Link>
          <Link href="/docs/api" className="hover:text-slate-200 transition-colors">API</Link>
          <Link href="/docs/sdk" className="hover:text-slate-200 transition-colors">SDK</Link>
          <Link href="/docs/quickstart" className="hover:text-slate-200 transition-colors">Quickstart</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="https://app.aetherdb.cloud/login" className="text-sm text-slate-400 hover:text-slate-200 transition-colors hidden md:block">
            Sign in
          </Link>
          <Link href="https://app.aetherdb.cloud/login" className="text-sm px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-semibold rounded-lg transition-colors">
            Get started free
          </Link>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <Badge>Now in production · April 2026</Badge>

          <h1 className="mt-8 text-5xl md:text-6xl font-semibold text-slate-100 leading-tight tracking-tight">
            The database built<br />
            <span className="text-cyan-400">for AI-first apps</span>
          </h1>

          <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Multi-tenant PostgreSQL with REST &amp; gRPC, natural language queries, pgvector embeddings,
            realtime SSE, file storage, webhooks, and a full JavaScript SDK — all in one platform.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              href="https://app.aetherdb.cloud/login"
              className="px-7 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-cyan-500/20"
            >
              Start building free →
            </Link>
            <Link
              href="/docs/quickstart"
              className="px-7 py-3.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium rounded-xl text-sm transition-colors"
            >
              Read the docs
            </Link>
          </div>

          {/* Code preview */}
          <div className="mt-14 bg-[#0D1117] border border-slate-800 rounded-2xl p-6 text-left max-w-2xl mx-auto shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              <span className="ml-2 text-xs text-slate-600 font-mono">quickstart.ts</span>
            </div>
            <pre className="text-sm font-mono leading-relaxed overflow-x-auto" style={{ background: 'none', border: 'none', padding: 0 }}>
              <code>{`import { AetherDB } from 'aetherdb-js'

const db = new AetherDB({
  url: 'https://app.aetherdb.cloud',
  token: process.env.AETHERDB_TOKEN,
})

// Natural language → SQL → results
const result = await db.ai(
  'top 5 customers by total spend this month'
)
console.log(result.generated_sql, result.rows)

// Fluent query builder
const { rows } = await db
  .from('orders')
  .select('id, total, status')
  .eq('status', 'pending')
  .order('total', 'DESC')
  .limit(10)
  .execute()`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────────────── */}
      <section className="py-16 border-y border-slate-800/60">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
          <Stat value="25+" label="API endpoints" />
          <Stat value="&lt; 20ms" label="Median query latency" />
          <Stat value="50 MB" label="Max file upload" />
          <Stat value="100%" label="TypeScript coverage" />
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-semibold text-slate-100">Everything your app needs</h2>
            <p className="mt-3 text-slate-500 text-sm max-w-xl mx-auto">
              Stop stitching together 5 services. AetherDB ships every layer your AI application requires.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard
              icon="🗄️"
              title="Multi-tenant PostgreSQL"
              desc="Every user gets an isolated Postgres schema (tenant_N) auto-provisioned on signup. Full RLS, no cross-tenant data leakage."
            />
            <FeatureCard
              icon="🤖"
              title="Natural language queries"
              desc="Ask questions in plain English. AetherDB fetches your live schema, generates SQL via Groq LLaMA 70B, validates it, and executes it."
            />
            <FeatureCard
              icon="🔷"
              title="pgvector embeddings"
              desc="Store and query vector embeddings natively. Semantic search, RAG pipelines, and similarity scoring built in."
            />
            <FeatureCard
              icon="⚡"
              title="Realtime subscriptions"
              desc="Subscribe to any table via SSE using Postgres LISTEN/NOTIFY. Live updates with no polling, no external broker."
            />
            <FeatureCard
              icon="🔗"
              title="REST + gRPC dual transport"
              desc="Full REST API for browser clients. gRPC for high-throughput server-to-server workloads. Same operations, your choice."
            />
            <FeatureCard
              icon="🪝"
              title="Webhooks"
              desc="Register HTTP callbacks on insert, update, or delete. HMAC-SHA256 signed. Auto-disabled after 10 failures."
            />
            <FeatureCard
              icon="📁"
              title="File storage"
              desc="Upload, download, and delete files up to 50 MB. Stored in Postgres BYTEA — no S3 bucket configuration needed."
            />
            <FeatureCard
              icon="📥"
              title="CSV / JSON import"
              desc="Bulk-load data from CSV or JSON files. Tables auto-created with correct columns. Export any table as CSV or JSON."
            />
            <FeatureCard
              icon="🔖"
              title="Saved queries"
              desc="Name, tag, and share SQL snippets across your team. Track run counts, share publicly, and run with one API call."
            />
            <FeatureCard
              icon="🧠"
              title="AI schema migration"
              desc="Describe a schema change in English. AetherDB generates the DDL for review — you stay in control of what runs."
            />
            <FeatureCard
              icon="📊"
              title="Metrics & audit logs"
              desc="Every request logged. Per-user query counts, error rates, DB size, storage used, and top endpoints — live."
            />
            <FeatureCard
              icon="🤝"
              title="MCP server"
              desc="Plug AetherDB into Claude, Cursor, and any MCP-compatible AI agent. Query, insert, and search from your AI tools."
            />
          </div>
        </div>
      </section>

      {/* ── SDK highlight ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge>JavaScript SDK</Badge>
            <h2 className="mt-4 text-3xl font-semibold text-slate-100 leading-snug">
              Fully typed.<br />Zero config.
            </h2>
            <p className="mt-4 text-slate-500 text-sm leading-relaxed">
              Install <code className="text-cyan-400 bg-slate-800 px-1.5 py-0.5 rounded text-xs">aetherdb-js</code> and get
              a complete client with query builder, file upload, webhooks, AI queries, and import/export — all typed with TypeScript generics.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-400">
              {[
                'Works in Node.js, browsers, and edge runtimes',
                'Fluent query builder with SQL injection prevention',
                'Automatic token refresh with no extra code',
                'Full TypeScript generics on all query results',
              ].map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <Link href="/docs/sdk" className="text-sm px-4 py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-semibold rounded-lg transition-colors">
                SDK docs
              </Link>
              <Link href="/docs/sdk/query-builder" className="text-sm px-4 py-2 border border-slate-700 hover:border-slate-600 text-slate-300 rounded-lg transition-colors">
                Query builder
              </Link>
            </div>
          </div>

          <div className="bg-[#0D1117] border border-slate-800 rounded-2xl p-6 font-mono text-sm leading-relaxed overflow-x-auto">
            <pre style={{ background: 'none', border: 'none', padding: 0 }}>
              <code>{`// Upload a file
const record = await db.uploadFile(file)

// Register a webhook
await db.createWebhook({
  table_name: 'orders',
  events: ['insert'],
  url: 'https://app.co/hook',
  secret: 'mysecret',
})

// Import CSV
const result = await db.importData(
  csvFile, 'customers'
)
// { imported: 1250, table: 'customers' }

// AI insights on your data
const report = await db.aiInsights('orders')
console.log(report.insights)

// Get metrics
const m = await db.getMetrics()
// { queries_24h: 142, error_rate: 0.01 }`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* ── Comparison ──────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-slate-100">How AetherDB compares</h2>
            <p className="mt-3 text-slate-500 text-sm">Built for the era of AI applications — not just CRUD.</p>
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
                  ['NL → SQL (AI queries)', '✓', '✗', '✗', '✗'],
                  ['Multi-tenant schemas', '✓', 'Partial', '✗', '✗'],
                  ['pgvector embeddings', '✓', '✓', '✓', '✗'],
                  ['Built-in file storage', '✓', '✓', '✗', '✗'],
                  ['Data webhooks', '✓', '✓', '✗', '✗'],
                  ['CSV/JSON import', '✓', '✗', '✗', '✗'],
                  ['AI schema migration', '✓', '✗', '✗', '✗'],
                  ['AI data insights', '✓', '✗', '✗', '✗'],
                  ['MCP server (AI agents)', '✓', '✗', '✗', '✗'],
                  ['gRPC transport', '✓', '✗', '✗', '✗'],
                  ['Saved queries', '✓', '✗', '✗', '✗'],
                  ['Audit logs', '✓', '✓', '✗', '✓'],
                ].map(([feature, ...vals]) => (
                  <tr key={feature} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 text-slate-400">{feature}</td>
                    {vals.map((v, i) => (
                      <td key={i} className={`py-3 px-4 text-center ${v === '✓' ? 'text-emerald-400' : v === '✗' ? 'text-slate-700' : 'text-amber-400'}`}>
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-b from-slate-900 to-slate-900/50 border border-slate-800 rounded-3xl px-8 py-16">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-6">
              <div className="w-5 h-5 rounded bg-cyan-400" />
            </div>
            <h2 className="text-3xl font-semibold text-slate-100 mb-4">
              Ready to ship faster?
            </h2>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
              Sign up, provision your isolated database, and make your first AI query in under 2 minutes.
              No credit card required.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="https://app.aetherdb.cloud/login"
                className="px-8 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-semibold rounded-xl text-sm transition-colors shadow-lg shadow-cyan-500/20"
              >
                Create free account →
              </Link>
              <Link
                href="/docs/quickstart"
                className="px-8 py-3.5 bg-transparent border border-slate-700 hover:border-slate-600 text-slate-300 rounded-xl text-sm transition-colors"
              >
                View quickstart
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
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
              <p className="text-xs text-slate-600 max-w-xs leading-relaxed">
                AI-native database infrastructure for the next generation of applications.
              </p>
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
                  <li><Link href="/docs/platform/multi-tenancy" className="text-slate-600 hover:text-slate-300 transition-colors">Multi-tenancy</Link></li>
                  <li><Link href="/docs/platform/vector-search" className="text-slate-600 hover:text-slate-300 transition-colors">Vector search</Link></li>
                  <li><Link href="/docs/platform/ai" className="text-slate-600 hover:text-slate-300 transition-colors">AI features</Link></li>
                  <li><Link href="/docs/api/realtime" className="text-slate-600 hover:text-slate-300 transition-colors">Realtime</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-slate-400 font-medium mb-3">Platform</p>
                <ul className="space-y-2">
                  <li><Link href="https://app.aetherdb.cloud" className="text-slate-600 hover:text-slate-300 transition-colors">Dashboard</Link></li>
                  <li><Link href="/docs/api/audit-metrics" className="text-slate-600 hover:text-slate-300 transition-colors">Audit logs</Link></li>
                  <li><Link href="/docs/api/webhooks" className="text-slate-600 hover:text-slate-300 transition-colors">Webhooks</Link></li>
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
