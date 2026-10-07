import { Pool } from "@neondatabase/serverless"

const requiredTables = [
  "users",
  "accounts",
  "transactions",
  "transfers",
  "cards",
  "payments",
  "exchange_rates",
  "notifications",
  "audit_log",
]

function requireDatabaseUrl() {
  const value = process.env.DATABASE_URL?.trim()

  if (!value) {
    throw new Error("DATABASE_URL is not configured")
  }

  return value
}

async function verifySchema() {
  const pool = new Pool({
    connectionString: requireDatabaseUrl(),
    max: 1,
  })

  const client = await pool.connect()

  try {
    const tableResult = await client.query(
      `
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_name = ANY($1::text[])
        ORDER BY table_name
      `,
      [requiredTables],
    )

    const actualTables = new Set(
      tableResult.rows.map((row) => row.table_name),
    )
    const missingTables = requiredTables.filter(
      (table) => !actualTables.has(table),
    )

    if (missingTables.length > 0) {
      throw new Error(
        `Missing required tables: ${missingTables.join(", ")}`,
      )
    }

    const migrationResult = await client.query(
      `
        SELECT id
        FROM schema_migrations
        WHERE id = ANY($1::text[])
        ORDER BY id
      `,
      [["0001_create_schema_migrations", "0002_create_fintech_schema"]],
    )

    const appliedMigrations = new Set(
      migrationResult.rows.map((row) => row.id),
    )
    const requiredMigrations = [
      "0001_create_schema_migrations",
      "0002_create_fintech_schema",
    ]
    const missingMigrations = requiredMigrations.filter(
      (migration) => !appliedMigrations.has(migration),
    )

    if (missingMigrations.length > 0) {
      throw new Error(
        `Missing applied migrations: ${missingMigrations.join(", ")}`,
      )
    }

    console.log(
      `Schema verification passed: ${requiredTables.length} fintech tables and migrations 0001-0002 are present.`,
    )
  } finally {
    client.release()
    await pool.end()
  }
}

verifySchema().catch((error) => {
  console.error(
    error instanceof Error ? error.message : "Database schema verification failed.",
  )
  process.exitCode = 1
})
