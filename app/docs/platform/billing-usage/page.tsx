export default function BillingUsagePage() {
  return (
    <>
      <h1>Billing &amp; Usage</h1>
      <p>How metering, limits, and Stripe billing work in AetherDB.</p>

      <h2>How usage is measured</h2>
      <p>AetherDB tracks four usage dimensions per billing period (calendar month):</p>
      <table>
        <thead><tr><th>Metric</th><th>How it is counted</th></tr></thead>
        <tbody>
          <tr><td>Queries</td><td>Every request to <code>/db/query</code>, <code>/tenant/query</code>, or saved query runs</td></tr>
          <tr><td>API calls</td><td>Every authenticated request to any endpoint</td></tr>
          <tr><td>AI calls</td><td>Requests to <code>/db/ai/query</code>, <code>/db/ai/migrate</code>, <code>/tenant/ai/insights</code></td></tr>
          <tr><td>File storage</td><td>Live sum of all file bytes stored under your account</td></tr>
        </tbody>
      </table>

      <h2>Plan limits</h2>
      <table>
        <thead><tr><th>Limit</th><th>Free</th><th>Pro</th><th>Team</th></tr></thead>
        <tbody>
          <tr><td>Queries / month</td><td>1,000</td><td>50,000</td><td>Unlimited</td></tr>
          <tr><td>Tenant storage</td><td>100 MB</td><td>10 GB</td><td>100 GB</td></tr>
          <tr><td>File storage</td><td>50 MB</td><td>500 MB</td><td>5 GB</td></tr>
          <tr><td>AI calls / month</td><td>10</td><td>500</td><td>Unlimited</td></tr>
        </tbody>
      </table>

      <h2>Upgrading</h2>
      <p>Upgrades go through Stripe Checkout. After payment Stripe fires a webhook and your new limits apply immediately.</p>
      <pre><code>{`const { url } = await db.createCheckoutSession('pro')
window.location.href = url`}</code></pre>

      <h2>Cancellations</h2>
      <p>Open the Stripe Customer Portal to cancel or downgrade. Cancellations are effective at the end of the current billing period — <code>cancel_at_period_end: true</code> is set. Your limits remain until the period ends, then downgrade to free.</p>
      <pre><code>{`const { url } = await db.createPortalSession()
window.location.href = url`}</code></pre>

      <h2>Setting up Stripe (self-hosted)</h2>
      <ol>
        <li>Create products and prices in your Stripe dashboard for Pro and Team.</li>
        <li>Set environment variables on your AetherDB backend: <code>STRIPE_SECRET_KEY</code>, <code>STRIPE_WEBHOOK_SECRET</code>, <code>STRIPE_PRICE_PRO</code>, <code>STRIPE_PRICE_TEAM</code>.</li>
        <li>Add a webhook endpoint in Stripe pointing to <code>https://app.aetherdb.cloud/billing/webhook</code>.</li>
        <li>Subscribe to: <code>checkout.session.completed</code>, <code>customer.subscription.updated</code>, <code>customer.subscription.deleted</code>, <code>invoice.payment_failed</code>.</li>
        <li>Restart AetherDB — migrations auto-create the plans table with seeded plan rows.</li>
      </ol>

      <h2>Admin plan overrides</h2>
      <p>Admins can manually change a user plan via <code>PATCH /admin/users/:id/plan</code> or the Admin panel — useful for granting trials without touching Stripe.</p>
    </>
  )
}
