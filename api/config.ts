const databaseUrl = process.env.DATABASE_URL?.trim()

export const serverConfig = {
  databaseUrl,
} as const

export function requireDatabaseUrl(): string {
  if (!serverConfig.databaseUrl) {
    throw new Error("DATABASE_URL is not configured")
  }

  return serverConfig.databaseUrl
}
