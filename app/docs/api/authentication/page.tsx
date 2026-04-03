export default function AuthenticationPage() {
  return (
    <>
      <h1>Authentication</h1>
      <p>AetherDB uses JWT-based authentication. Every request to a protected endpoint must include a valid token in the <code>Authorization</code> header.</p>

      <h2>Register</h2>
      <pre><code>{`POST https://aetherdb.cloud/auth/register
Content-Type: application/json

{ "email": "you@example.com", "password": "yourpassword" }

// Response 200:
{ "id": 1, "email": "you@example.com", "schema": "tenant_1", "created_at": "..." }`}</code></pre>

      <h2>Login</h2>
      <pre><code>{`POST https://aetherdb.cloud/auth/login
Content-Type: application/json

{ "email": "you@example.com", "password": "yourpassword" }

// Response 200:
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": 1, "email": "you@example.com", "schema": "tenant_1" }
}`}</code></pre>

      <h2>Using the token</h2>
      <pre><code>{`GET https://aetherdb.cloud/db/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`}</code></pre>

      <h2>Get current user</h2>
      <pre><code>{`GET https://aetherdb.cloud/db/me
Authorization: Bearer <token>

// Response 200:
{ "id": 1, "email": "you@example.com", "schema": "tenant_1", "created_at": "..." }`}</code></pre>

      <h2>Token expiry</h2>
      <p>Tokens expire after 24 hours. When a request returns <code>401 invalid or expired token</code>, re-authenticate using the login endpoint to get a new token.</p>

      <h2>SDK usage</h2>
      <pre><code>{`import { AetherDB } from 'aetherdb-js'
const db = new AetherDB({ url: 'https://aetherdb.cloud' })
await db.register('you@example.com', 'password')
const { access_token } = await db.signIn('you@example.com', 'password')
db.setToken(access_token)`}</code></pre>

      <h2>Error responses</h2>
      <pre><code>{`{ "error": "email and password are required" }   // 400
{ "error": "invalid or expired token" }           // 401
{ "error": "email already registered" }           // 409`}</code></pre>
    </>
  )
}
