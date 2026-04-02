'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const nav = [
  {
    section: 'Getting started',
    links: [
      { href: '/docs', label: 'Introduction' },
      { href: '/docs/quickstart', label: 'Quickstart' },
    ]
  },
  {
    section: 'SDK',
    links: [
      { href: '/docs/sdk', label: 'JavaScript / TypeScript' },
      { href: '/docs/sdk/query-builder', label: 'Query builder' },
      { href: '/docs/sdk/ai-queries', label: 'AI queries' },
    ]
  },
  {
    section: 'API reference',
    links: [
      { href: '/docs/api', label: 'Overview' },
      { href: '/docs/api/auth', label: 'Authentication' },
      { href: '/docs/api/tenant', label: 'Tenant database' },
      { href: '/docs/api/projects', label: 'Projects & API keys' },
      { href: '/docs/api/realtime', label: 'Realtime' },
      { href: '/docs/api/mcp', label: 'MCP server' },
    ]
  },
  {
    section: 'Platform',
    links: [
      { href: '/docs/multi-tenancy', label: 'Multi-tenancy' },
      { href: '/docs/connection-strings', label: 'Connection strings' },
      { href: '/docs/pgvector', label: 'Vector search' },
    ]
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 shrink-0 border-r border-slate-800 h-screen sticky top-0 overflow-y-auto py-8 px-4">
      <Link href="/" className="flex items-center gap-2 mb-8 px-2">
        <div className="w-6 h-6 rounded bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-sm bg-cyan-400" />
        </div>
        <span className="font-semibold text-sm text-slate-100">
          Aether<span className="text-cyan-400">DB</span>
          <span className="text-slate-600 font-normal ml-1">docs</span>
        </span>
      </Link>

      {nav.map(group => (
        <div key={group.section} className="mb-6">
          <p className="text-xs text-slate-600 uppercase tracking-widest font-medium px-3 mb-2">
            {group.section}
          </p>
          {group.links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`sidebar-link ${pathname === link.href ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      ))}

      <div className="mt-8 px-3 py-3 bg-slate-900 border border-slate-800 rounded-lg">
        <p className="text-xs text-slate-500 mb-2">Backend API</p>
        <a href="https://aetherdb.cloud/health" target="_blank" className="text-xs text-cyan-400 code">
          aetherdb.cloud
        </a>
      </div>
    </aside>
  )
}
