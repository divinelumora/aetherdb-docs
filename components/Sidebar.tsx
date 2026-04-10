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
      { href: '/docs/api/authentication', label: 'Authentication' },
      { href: '/docs/api/tenant', label: 'Tenant database' },
      { href: '/docs/api/projects', label: 'Projects & API keys' },
      { href: '/docs/api/files', label: 'File storage' },
      { href: '/docs/api/saved-queries', label: 'Saved queries' },
      { href: '/docs/api/webhooks', label: 'Webhooks' },
      { href: '/docs/api/import-export', label: 'Import & Export' },
      { href: '/docs/api/realtime', label: 'Realtime' },
      { href: '/docs/api/mcp', label: 'MCP server' },
      { href: '/docs/api/billing', label: 'Billing' },
      { href: '/docs/api/admin', label: 'Admin' },
    ]
  },
  {
    section: 'Platform',
    links: [
      { href: '/docs/platform/multi-tenancy', label: 'Multi-tenancy' },
      { href: '/docs/platform/connection-strings', label: 'Connection strings' },
      { href: '/docs/platform/vector-search', label: 'Vector search' },
      { href: '/docs/platform/ai', label: 'AI features' },
      { href: '/docs/platform/audit-metrics', label: 'Audit & Metrics' },
      { href: '/docs/platform/billing-usage', label: 'Billing & Usage' },
    ]
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-60 shrink-0 border-r border-slate-800 h-screen sticky top-0 overflow-y-auto py-8 px-4">
      <div className="mb-8" style={{ background: '#0f172a' }}>
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="AetherDB"
            style={{ height: '56px', width: 'auto', mixBlendMode: 'screen', display: 'block' }}
          />
        </Link>
      </div>

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
        <a href="https://app.aetherdb.cloud/health" target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 code">
          app.aetherdb.cloud
        </a>
      </div>
    </aside>
  )
}
