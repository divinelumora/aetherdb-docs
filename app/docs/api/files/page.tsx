export default function FilesPage() {
  return (
    <>
      <h1>File Storage</h1>
      <p>AetherDB includes built-in file storage backed by PostgreSQL <code>BYTEA</code>. Upload, download, list and delete files without any extra infrastructure. Each file is scoped to the authenticated user.</p>

      <h2>Upload a file</h2>
      <pre><code>{`POST https://app.aetherdb.cloud/db/files/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

// form field: file = <binary>

// Response 200:
{
  "id": 7,
  "filename": "report.pdf",
  "content_type": "application/pdf",
  "size": 204800,
  "created_at": "2026-04-04T10:00:00Z"
}`}</code></pre>

      <h2>List files</h2>
      <pre><code>{`GET https://app.aetherdb.cloud/db/files
Authorization: Bearer <token>

// Response 200:
{
  "files": [
    { "id": 7, "filename": "report.pdf", "content_type": "application/pdf", "size": 204800, "created_at": "..." }
  ],
  "count": 1
}`}</code></pre>

      <h2>Download a file</h2>
      <pre><code>{`GET https://app.aetherdb.cloud/db/files/{id}
Authorization: Bearer <token>

// Response 200: binary stream with correct Content-Type header`}</code></pre>

      <h2>Delete a file</h2>
      <pre><code>{`DELETE https://app.aetherdb.cloud/db/files/{id}
Authorization: Bearer <token>

// Response 200:
{ "status": "deleted" }`}</code></pre>

      <h2>JavaScript SDK</h2>
      <pre><code>{`import { AetherDB } from 'aetherdb-js'
const db = new AetherDB({ url: 'https://app.aetherdb.cloud', token })

// Upload (browser)
const input = document.querySelector('input[type=file]')
const record = await db.uploadFile(input.files[0])
console.log(record.id) // 7

// List
const { files } = await db.listFiles()

// Download and trigger browser save
const blob = await db.downloadFile(7)
const url = URL.createObjectURL(blob)
const a = document.createElement('a'); a.href = url; a.download = 'report.pdf'; a.click()

// Delete
await db.deleteFile(7)`}</code></pre>

      <h2>Limits</h2>
      <ul>
        <li>Default maximum file size: <strong>50 MB</strong> (configurable via <code>MAX_FILE_SIZE_MB</code>).</li>
        <li>All other endpoints are limited to 2 MB request bodies.</li>
        <li>Files are stored as <code>BYTEA</code> in the shared Postgres instance — not on a CDN. Suitable for documents and data files, not media streaming.</li>
      </ul>
    </>
  )
}
