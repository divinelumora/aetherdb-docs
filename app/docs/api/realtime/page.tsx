export default function RealtimePage() {
  return (
    <>
      <h1>Realtime</h1>
      <p>AetherDB supports realtime data subscriptions using Server-Sent Events (SSE). Subscribe to a table and receive live updates whenever rows are inserted, updated, or deleted.</p>

      <h2>Enable realtime on a table</h2>
      <pre><code>{`POST https://app.aetherdb.cloud/db/realtime/enable
Authorization: Bearer <token>
Content-Type: application/json

{ "table": "orders" }

// Response 200:
{ "message": "realtime enabled for orders" }`}</code></pre>

      <h2>Subscribe to changes</h2>
      <pre><code>{`GET https://app.aetherdb.cloud/db/realtime/subscribe?table=orders
Authorization: Bearer <token>

// Stream of events:
data: {"event":"INSERT","table":"orders","row":{"id":42,"total":99.99}}
data: {"event":"UPDATE","table":"orders","row":{"id":42,"status":"completed"}}
data: {"event":"DELETE","table":"orders","row":{"id":42}}`}</code></pre>

      <h2>Browser usage</h2>
      <pre><code>{`const token = localStorage.getItem('aether_token')
const source = new EventSource(
  \`https://app.aetherdb.cloud/db/realtime/subscribe?table=orders&token=\${token}\`
)
source.onmessage = (event) => {
  const { event: type, row } = JSON.parse(event.data)
  console.log(type, row)
}`}</code></pre>

      <h2>Node.js usage</h2>
      <pre><code>{`import EventSource from 'eventsource'
const source = new EventSource(
  'https://app.aetherdb.cloud/db/realtime/subscribe?table=orders',
  { headers: { Authorization: \`Bearer \${token}\` } }
)
source.onmessage = (e) => console.log(JSON.parse(e.data))`}</code></pre>

      <h2>Notes</h2>
      <ul>
        <li>Realtime must be explicitly enabled per table before subscribing</li>
        <li>Each subscription is scoped to your tenant schema</li>
        <li>Reconnect the EventSource if the connection drops</li>
      </ul>
    </>
  )
}
