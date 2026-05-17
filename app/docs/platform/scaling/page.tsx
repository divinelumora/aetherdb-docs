export default function ScalingPage() {
  return (
    <>
      <h1>Intent-Based Scaling</h1>
      <p>
        Intent-Based Scaling lets you describe your workload in natural language. AetherDB's AI analyzes your description along with your current usage metrics and recommends the optimal infrastructure configuration — which you can apply with a single API call.
      </p>

      <h2>Overview</h2>
      <p>
        Instead of manually tuning connection pools, read replicas, and cache sizes, you tell AetherDB what you need: <em>"We're launching a marketing campaign expecting 10× traffic spike in 2 hours"</em> or <em>"Batch job reads 50M rows overnight, writes are minimal"</em>. The system translates intent to configuration.
      </p>

      <h2>API Reference</h2>

      <h3>Get a scaling recommendation</h3>
      <pre><code>{`POST /scaling/recommend
Authorization: Bearer <token>

{
  "intent": "We're launching a product hunt campaign tomorrow. Expecting 5,000 concurrent users, heavy read traffic on the products and reviews tables. Writes will be low — maybe 50 new users per minute."
}

// Response
{
  "recommendation_id": "rec_01J...",
  "intent_parsed": {
    "workload_type": "read_heavy",
    "expected_concurrency": 5000,
    "peak_duration_hours": 6,
    "write_rate": "low"
  },
  "recommended_config": {
    "read_replicas": 2,
    "connection_pool_size": 200,
    "cache_ttl_seconds": 300,
    "autoscale_trigger_cpu": 70,
    "query_timeout_ms": 5000
  },
  "rationale": "Read-heavy spike workload with 5K concurrent users needs read replicas to distribute load. Connection pool of 200 handles concurrent connections with headroom. 5-minute cache TTL reduces repeat product/review queries by ~80%.",
  "estimated_cost_delta": "+$12/day during peak",
  "confidence": 0.91
}`}</code></pre>

      <h3>Apply a recommendation</h3>
      <pre><code>{`POST /scaling/apply
Authorization: Bearer <token>

{
  "recommendation_id": "rec_01J..."
}

// Response
{
  "apply_id": "apl_01J...",
  "status": "applying",
  "changes": [
    { "setting": "read_replicas",      "from": 0,    "to": 2   },
    { "setting": "connection_pool",    "from": 50,   "to": 200 },
    { "setting": "cache_ttl_seconds",  "from": 60,   "to": 300 }
  ],
  "estimated_completion_seconds": 45
}`}</code></pre>

      <h3>Get apply status</h3>
      <pre><code>{`GET /scaling/apply/:apply_id
Authorization: Bearer <token>

// Response
{
  "apply_id": "apl_01J...",
  "status": "completed",   // "applying" | "completed" | "failed"
  "completed_at": "2026-05-17T10:10:45Z",
  "active_config": {
    "read_replicas": 2,
    "connection_pool_size": 200,
    "cache_ttl_seconds": 300
  }
}`}</code></pre>

      <h3>Compare configs</h3>
      <pre><code>{`GET /scaling/compare?a=rec_01J...&b=current
Authorization: Bearer <token>

// Response
{
  "config_a": { "label": "Product Hunt recommendation", "read_replicas": 2, "connection_pool_size": 200 },
  "config_b": { "label": "Current config",              "read_replicas": 0, "connection_pool_size": 50  },
  "differences": [
    { "setting": "read_replicas",     "a": 2,   "b": 0,  "impact": "2× read throughput" },
    { "setting": "connection_pool",   "a": 200, "b": 50, "impact": "4× concurrent connections" }
  ]
}`}</code></pre>

      <h3>Get current configuration</h3>
      <pre><code>{`GET /scaling/config
Authorization: Bearer <token>

// Response
{
  "read_replicas": 0,
  "connection_pool_size": 50,
  "cache_ttl_seconds": 60,
  "autoscale_trigger_cpu": 80,
  "query_timeout_ms": 10000,
  "last_updated": "2026-05-10T08:00:00Z"
}`}</code></pre>

      <h2>Scheduling config changes</h2>
      <p>
        You can schedule a recommendation to apply at a future time and automatically revert after a duration:
      </p>
      <pre><code>{`POST /scaling/apply
{
  "recommendation_id": "rec_01J...",
  "schedule_at": "2026-05-18T08:00:00Z",
  "revert_after_hours": 8
}`}</code></pre>

      <h2>Intent examples</h2>
      <ul>
        <li><em>"Heavy batch ETL job runs Sunday 2–6am, reads entire dataset sequentially"</em> → connection pool reduction, sequential scan optimization, no read replicas needed</li>
        <li><em>"Real-time dashboard refreshed by 500 analysts every 30 seconds"</em> → aggressive caching, read replicas, query result cache</li>
        <li><em>"Multi-region SaaS with users in EU and US, latency sensitive"</em> → multi-region read replicas, connection routing by geography</li>
        <li><em>"Write-heavy IoT ingestion, 100K inserts/second bursts"</em> → connection pool increase, write buffer tuning, autovacuum adjustment</li>
      </ul>
    </>
  )
}
