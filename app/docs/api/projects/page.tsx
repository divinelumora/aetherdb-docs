export default function ProjectsPage() {
  return (
    <>
      <h1>Projects & API keys</h1>
      <p>Projects let you organise your work and generate scoped API keys for programmatic access.</p>

      <h2>List projects</h2>
      <pre><code>{`GET https://aetherdb.cloud/db/projects
Authorization: Bearer <token>`}</code></pre>

      <h2>Create project</h2>
      <pre><code>{`POST https://aetherdb.cloud/db/projects
Authorization: Bearer <token>
Content-Type: application/json

{ "name": "My App", "description": "Production database" }`}</code></pre>

      <h2>Delete project</h2>
      <pre><code>{`DELETE https://aetherdb.cloud/db/projects/{id}
Authorization: Bearer <token>`}</code></pre>

      <h2>List API keys</h2>
      <pre><code>{`GET https://aetherdb.cloud/db/projects/{id}/keys
Authorization: Bearer <token>

// Response 200:
{ "keys": [{ "id": 1, "name": "prod-key", "key": "adb_live_xxx", "created_at": "..." }] }`}</code></pre>

      <h2>Create API key</h2>
      <pre><code>{`POST https://aetherdb.cloud/db/projects/{id}/keys
Authorization: Bearer <token>
Content-Type: application/json

{ "name": "production-key" }

// Response 200:
{ "id": 1, "name": "production-key", "key": "adb_live_xxxxxxxxxxxx" }`}</code></pre>

      <h2>Revoke API key</h2>
      <pre><code>{`DELETE https://aetherdb.cloud/db/projects/{id}/keys/{keyId}
Authorization: Bearer <token>`}</code></pre>

      <h2>Using API keys</h2>
      <pre><code>{`// Use exactly like a JWT token
GET https://aetherdb.cloud/tenant/schema
Authorization: Bearer adb_live_xxxxxxxxxxxx`}</code></pre>
    </>
  )
}
