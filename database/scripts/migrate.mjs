import { createHash } from "node:crypto"
import { readdir, readFile } from "node:fs/promises"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import { Pool } from "@neondatabase/serverless"

const rootDirectory = fileURLToPath(new URL("../..", import.meta.url))
const migrationsDirectory = join(rootDirectory, "database", "migrations")
const migrationPattern = /^(\d{4})_([a-z0-9-]+)\.sql$/
const migrationLockName = "fintest:database:migrations"

function requireDatabaseUrl() {
  const value = process.env.DATABASE_URL?.trim()

  if (!value) {
    throw new Error("DATABASE_URL is not configured")
  }

  return value
}

async function loadMigrations() {
  const entries = await readdir(migrationsDirectory, { withFileTypes: true })
  const migrations = []

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith(".sql")) {
      continue
    }

    const match = migrationPattern.exec(entry.name)

    if (!match) {
      throw new Error(
        `Invalid migration filename: ${entry.name}. Expected NNNN_description.sql`,
      )
    }

    const [, order] = match
    const content = await readFile(join(migrationsDirectory, entry.name), "utf8")

    migrations.push({
      id: entry.name.slice(0, -4),
      order,
      content,
      checksum: createHash("sha256").update(content).digest("hex"),
    })
  }

  migrations.sort((left, right) => left.order.localeCompare(right.order))

  for (let index = 1; index < migrations.length; index += 1) {
    if (migrations[index - 1].order === migrations[index].order) {
      throw new Error(`Duplicate migration order: ${migrations[index].order}`)
    }
  }

  return migrations
}

async function migrate() {
  const databaseUrl = requireDatabaseUrl()
  const migrations = await loadMigrations()

  if (migrations.length === 0) {
    console.log("No database migrations found.")
    return
  }

  if (migrations[0].id !== "0001_create_schema_migrations") {
    throw new Error(
      "The first migration must be 0001_create_schema_migrations.sql",
    )
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    max: 1,
  })

  const client = await pool.connect()

  try {
    await client.query("BEGIN")
    await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [migrationLockName])

    const metadataExists = await client.query(
      "SELECT to_regclass('public.schema_migrations') AS table_name",
    )

    if (!metadataExists.rows[0]?.table_name) {
      await client.query(migrations[0].content)
      await client.query(
        "INSERT INTO schema_migrations (id, checksum) VALUES ($1, $2)",
        [migrations[0].id, migrations[0].checksum],
      )
      console.log(`Applied ${migrations[0].id}`)
    }

    const appliedResult = await client.query(
      "SELECT id, checksum FROM schema_migrations ORDER BY id",
    )
    const applied = new Map(
      appliedResult.rows.map((row) => [row.id, row.checksum]),
    )

    for (const migration of migrations) {
      const existingChecksum = applied.get(migration.id)

      if (existingChecksum) {
        if (existingChecksum !== migration.checksum) {
          throw new Error(
            `Migration checksum mismatch: ${migration.id}. Applied migrations must not be edited.`,
          )
        }

        continue
      }

      await client.query(migration.content)
      await client.query(
        "INSERT INTO schema_migrations (id, checksum) VALUES ($1, $2)",
        [migration.id, migration.checksum],
      )
      console.log(`Applied ${migration.id}`)
    }

    await client.query("COMMIT")
    console.log("Database migrations are up to date.")
  } catch (error) {
    await client.query("ROLLBACK")
    throw error
  } finally {
    client.release()
    await pool.end()
  }
}

migrate().catch((error) => {
  console.error(
    error instanceof Error ? error.message : "Database migration failed.",
  )
  process.exitCode = 1
})
