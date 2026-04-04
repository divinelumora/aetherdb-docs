export default function ImportExportPage() {
  return (
    <>
      <h1>Import &amp; Export</h1>
      <p>Bulk-load data from CSV or JSON files, or stream any table as a downloadable file. All operations are scoped to your isolated tenant schema.</p>

      <h2>Import — POST /tenant/import</h2>
      <p>Upload a file via <code>multipart/form-data</code>. The table is auto-created with TEXT columns if it does not exist. Existing tables are appended to.</p>
      <pre><code>{`POST https://app.aetherdb.cloud/tenant/import
Authorization: Bearer <token>
Content-Type: multipart/form-data

fields:
  file     — CSV or JSON file (required)
  table    — target table name (optional; defaults to filename without extension)
  format   — "csv" or "json" (optional; inferred from filename)

// Response 200:
{
  "table": "customers",
  "columns": ["name", "email", "city"],
  "imported": 1250
}`}</code></pre>

      <h3>CSV format</h3>
      <p>The first row must be the header. Column names are slugified (spaces → underscores, special chars removed).</p>
      <pre><code>{`name,email,city
Alice,alice@example.com,London
Bob,bob@example.com,NYC`}</code></pre>

      <h3>JSON format</h3>
      <p>Either a JSON array or NDJSON (one object per line) is accepted.</p>
      <pre><code>{`[
  { "name": "Alice", "email": "alice@example.com" },
  { "name": "Bob",   "email": "bob@example.com" }
]`}</code></pre>

      <h2>Export — GET /tenant/export</h2>
      <pre><code>{`GET https://app.aetherdb.cloud/tenant/export?table=customers&format=csv
Authorization: Bearer <token>

// Response 200: file download stream
// Content-Disposition: attachment; filename="customers.csv"
// Limited to 100,000 rows.`}</code></pre>

      <h2>JavaScript SDK</h2>
      <pre><code>{`// Import from file input
const input = document.querySelector('input[type=file]')
const result = await db.importData(input.files[0], 'customers')
console.log(\`Imported \${result.imported} rows into \${result.table}\`)

// Export and trigger browser download
const blob = await db.exportData('customers', 'csv')
const url = URL.createObjectURL(blob)
const a = document.createElement('a')
a.href = url
a.download = 'customers.csv'
a.click()
URL.revokeObjectURL(url)`}</code></pre>

      <h2>Limits</h2>
      <ul>
        <li>Import: <strong>10 MB</strong> multipart form buffer (file content). Larger files should be split.</li>
        <li>Export: up to <strong>100 000 rows</strong> per request.</li>
        <li>Column names must be valid identifiers: letters, digits, underscores, starting with a letter.</li>
      </ul>
    </>
  )
}
