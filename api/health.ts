import type { IncomingMessage, ServerResponse } from "node:http"

type HealthResponse = {
  status: "ok"
  service: "fintest-api"
  timestamp: string
}

export default function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET")
    res.writeHead(405, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ error: "METHOD_NOT_ALLOWED" }))
    return
  }

  const response: HealthResponse = {
    status: "ok",
    service: "fintest-api",
    timestamp: new Date().toISOString(),
  }

  res.writeHead(200, { "Content-Type": "application/json" })
  res.end(JSON.stringify(response))
}
