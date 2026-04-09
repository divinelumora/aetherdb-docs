export default function BillingAPIPage() {
  return (
    <>
      <h1>Billing API</h1>
      <p>Manage plans, subscriptions, and Stripe checkout sessions. All billing endpoints require a valid JWT Bearer token except <code>POST /billing/webhook</code>.</p>

      <h2>Plans</h2>
      <table>
        <thead><tr><th>Plan</th><th>Price</th><th>Queries/mo</th><th>Storage</th><th>AI calls</th></tr></thead>
        <tbody>
          <tr><td>free</td><td>$0</td><td>1,000</td><td>100 MB</td><td>10</td></tr>
          <tr><td>pro</td><td>$29</td><td>50,000</td><td>10 GB</td><td>500</td></tr>
          <tr><td>team</td><td>$99</td><td>Unlimited</td><td>100 GB</td><td>Unlimited</td></tr>
        </tbody>
      </table>

      <h2>GET /billing/plans</h2>
      <p>Returns all available plans. No authentication required.</p>
      <pre><code>{`GET /billing/plans

[
  { "id": 1, "name": "free", "price_monthly": 0, "query_limit": 1000, ... },
  { "id": 2, "name": "pro",  "price_monthly": 29, "query_limit": 50000, ... },
  { "id": 3, "name": "team", "price_monthly": 99, "query_limit": -1, ... }
]`}</code></pre>

      <h2>GET /billing/subscription</h2>
      <p>Returns the current user subscription. A free subscription is auto-created on first call.</p>
      <pre><code>{`GET /billing/subscription
Authorization: Bearer <token>

{
  "plan_name": "pro",
  "status": "active",
  "current_period_start": "2026-04-01T00:00:00Z",
  "current_period_end": "2026-05-01T00:00:00Z",
  "cancel_at_period_end": false,
  "query_limit": 50000,
  "ai_calls_limit": 500
}`}</code></pre>

      <h2>GET /billing/usage</h2>
      <p>Returns live usage counters for the current billing period.</p>
      <pre><code>{`GET /billing/usage
Authorization: Bearer <token>

{
  "queries_used": 412,
  "api_calls": 834,
  "ai_calls": 7,
  "file_size_mb": 22.4,
  "query_limit": 1000,
  "ai_calls_limit": 10
}`}</code></pre>

      <h2>POST /billing/checkout</h2>
      <p>Creates a Stripe Checkout session. Redirect the user to the returned URL to complete payment.</p>
      <pre><code>{`POST /billing/checkout
Authorization: Bearer <token>
Content-Type: application/json

{ "plan": "pro" }

→ { "url": "https://checkout.stripe.com/pay/cs_live_..." }`}</code></pre>
      <pre><code>{`// SDK
const { url } = await db.createCheckoutSession('pro')
window.location.href = url`}</code></pre>

      <h2>POST /billing/portal</h2>
      <p>Creates a Stripe Customer Portal session for managing or canceling a subscription.</p>
      <pre><code>{`POST /billing/portal
Authorization: Bearer <token>

→ { "url": "https://billing.stripe.com/session/..." }`}</code></pre>

      <h2>POST /billing/webhook</h2>
      <p>Stripe calls this endpoint for payment lifecycle events. Verified with HMAC-SHA256 using <code>STRIPE_WEBHOOK_SECRET</code>. Handled events: <code>checkout.session.completed</code>, <code>customer.subscription.updated</code>, <code>customer.subscription.deleted</code>, <code>invoice.payment_failed</code>.</p>

      <h2>Environment variables</h2>
      <table>
        <thead><tr><th>Variable</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><code>STRIPE_SECRET_KEY</code></td><td>Stripe secret key (sk_live_... or sk_test_...)</td></tr>
          <tr><td><code>STRIPE_WEBHOOK_SECRET</code></td><td>Webhook signing secret from Stripe dashboard</td></tr>
          <tr><td><code>STRIPE_PRICE_PRO</code></td><td>Stripe Price ID for the Pro plan</td></tr>
          <tr><td><code>STRIPE_PRICE_TEAM</code></td><td>Stripe Price ID for the Team plan</td></tr>
        </tbody>
      </table>
    </>
  )
}
