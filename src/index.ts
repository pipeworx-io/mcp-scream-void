interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * scream-void MCP — wraps StupidAPIs (requires X-API-Key)
 *
 * Scream into the void. It listens. It returns a number. The number is unaffected 
 */


const API_KEY = '6e0ddbe88486dc354370290979829dc892b0386bd789ae5a';

const tools: McpToolExport['tools'] = [
  {
    name: 'scream_void_scream',
    description: 'Scream into the void. It listens. It returns a number. The number is unaffected by your scream.',
    inputSchema: {
      type: 'object' as const,
      properties: {"scream": {"type": "string", "description": "Your scream. Type anything. It will not help."}, "intensity": {"type": "string", "enum": ["mild", "moderate", "full_primal", "corporate"], "description": "Scream intensity"}},
      required: ["scream"],
    },
  },
];

async function callApi(url: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  }
  const fullUrl = params.toString() ? url + '?' + params.toString() : url;
  const res = await fetch(fullUrl, {
    headers: { 'X-API-Key': API_KEY },
  });
  if (!res.ok) throw new Error('scream-void API error: ' + res.status);
  return res.json();
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'scream_void_scream':
      return callApi('https://api.stupidapis.com/scream-void/scream', args);
    default:
      throw new Error('Unknown tool: ' + name);
  }
}

export default { tools, callTool } satisfies McpToolExport;
