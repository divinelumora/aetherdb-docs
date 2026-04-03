export default function MCPPage() {
  return (
    <>
      <h1>MCP server</h1>
      <p>AetherDB exposes a Model Context Protocol (MCP) server, allowing AI agents and LLMs to interact with your database using natural language tool calls. 10 tools are available out of the box.</p>

      <h2>Endpoints</h2>
      <pre><code>{`GET  https://aetherdb.cloud/mcp/tools   # list available tools
POST https://aetherdb.cloud/mcp/call    # call a tool`}</code></pre>

      <h2>List tools</h2>
      <pre><code>{`GET https://aetherdb.cloud/mcp/tools

// Response:
{ "tools": [
  { "name": "query",          "description": "Run a SQL query"            },
  { "name": "insert",         "description": "Insert a row"               },
  { "name": "create_table",   "description": "Create a new table"         },
  { "name": "get_schema",     "description": "Get all tables and columns" },
  { "name": "ai_query",       "description": "Natural language SQL query" },
  { "name": "tenant_info",    "description": "Get tenant connection info" },
  { "name": "list_projects",  "description": "List all projects"          },
  { "name": "create_project", "description": "Create a new project"       },
  { "name": "vector_search",  "description": "Semantic vector search"     },
  { "name": "upsert_vector",  "description": "Upsert a vector embedding"  }
]}`}</code></pre>

      <h2>Call a tool</h2>
      <pre><code>{`POST https://aetherdb.cloud/mcp/call
Content-Type: application/json

{ "tool": "query", "token": "<token>", "params": { "sql": "SELECT COUNT(*) FROM orders" } }

// Response:
{ "result": { "rows": [{ "count": "142" }] } }`}</code></pre>

      <h2>Agent provisioning</h2>
      <p>AI agents can provision a new AetherDB tenant in under 500ms.</p>
      <pre><code>{`POST https://aetherdb.cloud/agent/provision
Content-Type: application/json

{ "email": "agent@yourdomain.com", "password": "secure-password" }

// Response:
{ "token": "eyJhbGci...", "schema": "tenant_99", "connection_string": "postgres://..." }`}</code></pre>
    </>
  )
}
