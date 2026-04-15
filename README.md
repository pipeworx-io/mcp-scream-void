# mcp-scream-void

scream-void MCP — wraps StupidAPIs (requires X-API-Key)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `scream_void_scream` | Scream into the void. It listens. It returns a number. The number is unaffected by your scream. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "scream-void": {
      "url": "https://gateway.pipeworx.io/scream-void/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use scream-void
```

## License

MIT
