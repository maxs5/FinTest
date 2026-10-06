import { neon } from "@neondatabase/serverless"
import type { IncomingMessage, ServerResponse } from "node:http"

type DatabaseHealthResponse = {
  status: "ok"
  database: "postgresql"
  timestamp: string
}

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse,
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET")
    res.writeHead(405, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ error: "METHOD_NOT_ALLOWED" }))
    return
  }

  const databaseUrl = process.env.DATABASE_URL

  if (!databaseUrl) {
    res.writeHead(503, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ error: "DATABASE_NOT_CONFIGURED" }))
    return
  }

  try {
    const sql = neon(databaseUrl)
    await sql`SELECT 1 AS health_check`

    const response: DatabaseHealthResponse = {
      status: "ok",
      database: "postgresql",
      timestamp: new Date().toISOString(),
    }

    res.writeHead(200, { "Content-Type": "application/json" })
    res.end(JSON.stringify(response))
  } catch {
    res.writeHead(503, { "Content-Type": "application/json" })
    res.end(JSON.stringify({ error: "DATABASE_UNAVAILABLE" }))
  }
}
