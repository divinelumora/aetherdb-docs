import Link from 'next/link'
import { Zap, Database, Key, Activity } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-3xl w-full text-center">

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
            <div className="w-4 h-4 rounded bg-cyan-400" />
          </div>
          <span className="text-3xl font-semibold text-slate-100">
            Aether<span className="text-cyan-400">DB</span>
          </span>
        </div>

        <h1 className="text-4xl font-semibold text-slate-100 mb-4">
          The AI-native database infrastructure
        </h1>
        <p className="text-slate-500 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          REST + gRPC + AI queries + pgvector + realtime — built for applications that need more than a database.
        </p>

        <div className="flex gap-4 justify-center mb-16">
          <Link href="/docs/quickstart"
            className="bg-cyan-400 text-slate-900 font-semibold px-6 py-3 rounded-lg hover:bg-cyan-300 transition-colors">
            Quickstart
          </Link>
          <Link href="/docs/api"
            className="bg-slate-900 border border-slate-800 text-slate-300 font-medium px-6 py-3 rounded-lg hover:border-slate-700 transition-colors">
            API reference
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 text-left">
          {[
            { icon: Database, title: 'Multi-tenant', desc: 'Every user gets their own isolated Postgres schema — auto-provisioned on signup.' },
            { icon: Zap, title: 'AI queries', desc: 'Ask questions in plain English. AetherDB generates and executes the SQL automatically.' },
            { icon: Key, title: 'API keys', desc: 'Generate scoped API keys per project. SHA-256 hashed, never stored in plaintext.' },
            { icon: Activity, title: 'Realtime', desc: 'Subscribe to database changes via SSE. Powered by Postgres LISTEN/NOTIFY.' },
          ].map(f => (
            <div key={f.title} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
              <f.icon size={18} className="text-cyan-400 mb-3" />
              <h3 className="text-sm font-semibold text-slate-200 mb-1">{f.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-5 text-left">
          <p className="text-xs text-slate-500 mb-3">Install the JavaScript SDK</p>
          <pre className="text-sm"><code className="text-cyan-400">npm install aetherdb-js</code></pre>
        </div>
      </div>
    </div>
  )
}
