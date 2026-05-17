export default function CompliancePage() {
  return (
    <>
      <h1>Compliance Autopilot</h1>
      <p>
        Compliance Autopilot automates the hardest parts of data privacy compliance — PII detection, GDPR erasure, and continuous compliance scoring — directly in the database layer. No third-party tools, no manual audits.
      </p>

      <h2>Overview</h2>
      <p>
        AetherDB scans your tables for personally identifiable information using pattern matching and ML classifiers. When a GDPR erasure request arrives, the API handles redaction across all relevant rows and tables automatically. A live compliance score tracks your posture over time.
      </p>

      <h2>API Reference</h2>

      <h3>Scan a table for PII</h3>
      <pre><code>{`POST /compliance/pii-scan
Authorization: Bearer <token>

{
  "table": "users"
}

// Response
{
  "table": "users",
  "scanned_columns": 12,
  "pii_detected": [
    { "column": "email",   "type": "email_address",  "confidence": 0.99 },
    { "column": "phone",   "type": "phone_number",   "confidence": 0.97 },
    { "column": "ip_addr", "type": "ip_address",     "confidence": 0.91 }
  ],
  "clean_columns": 9,
  "scan_id": "scan_01J..."
}`}</code></pre>

      <h3>Scan entire tenant schema</h3>
      <pre><code>{`POST /compliance/pii-scan/full
Authorization: Bearer <token>

// Response
{
  "tables_scanned": 8,
  "total_pii_columns": 14,
  "by_table": {
    "users":    { "pii_columns": 3, "risk": "high" },
    "orders":   { "pii_columns": 2, "risk": "medium" },
    "payments": { "pii_columns": 4, "risk": "high" }
  },
  "scan_id": "scan_02J..."
}`}</code></pre>

      <h3>Execute GDPR erasure for a user</h3>
      <pre><code>{`POST /compliance/gdpr-erase
Authorization: Bearer <token>

{
  "user_id": "usr_01J...",
  "tables": ["users", "orders", "payments"],
  "strategy": "redact"   // "redact" | "delete"
}

// Response
{
  "erasure_id": "era_01J...",
  "user_id": "usr_01J...",
  "tables_processed": 3,
  "rows_affected": 47,
  "strategy": "redact",
  "completed_at": "2026-05-17T10:05:00Z",
  "audit_trail": "https://aetherdb.cloud/compliance/audit/era_01J..."
}`}</code></pre>

      <h3>Get compliance score</h3>
      <pre><code>{`GET /compliance/score
Authorization: Bearer <token>

// Response
{
  "score": 84,
  "grade": "B+",
  "checks": {
    "pii_labelled":          { "passed": true,  "score": 20 },
    "erasure_policy_set":    { "passed": true,  "score": 20 },
    "encryption_at_rest":    { "passed": true,  "score": 20 },
    "retention_policy":      { "passed": false, "score": 0, "reason": "No retention policy configured for audit_logs table" },
    "access_logs_enabled":   { "passed": true,  "score": 15 },
    "last_scan_recent":      { "passed": true,  "score": 9  }
  },
  "last_updated": "2026-05-17T09:00:00Z"
}`}</code></pre>

      <h3>List erasure history</h3>
      <pre><code>{`GET /compliance/gdpr-erase/history?limit=20
Authorization: Bearer <token>

// Response
{
  "erasures": [
    {
      "erasure_id": "era_01J...",
      "user_id": "usr_01J...",
      "rows_affected": 47,
      "completed_at": "2026-05-17T10:05:00Z"
    }
  ],
  "total": 1
}`}</code></pre>

      <h2>PII detection classifiers</h2>
      <p>AetherDB detects the following PII types automatically:</p>
      <ul>
        <li>Email addresses</li>
        <li>Phone numbers (E.164 and common formats)</li>
        <li>IP addresses (IPv4 and IPv6)</li>
        <li>Credit card numbers (Luhn-validated)</li>
        <li>Social security numbers</li>
        <li>Passport numbers</li>
        <li>Date of birth patterns</li>
        <li>Full names (NER-based, 80%+ confidence)</li>
        <li>Physical addresses (street, zip, country combinations)</li>
      </ul>

      <h2>Erasure strategies</h2>
      <ul>
        <li><strong>redact</strong> — replaces PII values with <code>[REDACTED]</code> tombstones. Row remains in the table. History log records the erasure event. Preferred for audit trails.</li>
        <li><strong>delete</strong> — hard-deletes the rows entirely. Cannot be recovered. Use only when required by regulation.</li>
      </ul>

      <h2>Integration with Time Travel</h2>
      <p>
        When a row is redacted, the <a href="/docs/platform/time-travel">Time Travel</a> history log retains a tombstone entry showing that data existed and was erased under a GDPR request — without retaining the raw PII values. This satisfies Article 17 erasure requirements while preserving a defensible audit trail.
      </p>
    </>
  )
}
