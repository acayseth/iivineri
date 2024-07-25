namespace NodeJS {
  interface ProcessEnv {
    // APP
    NEXT_PUBLIC_DOMAIN?: string
    NEXT_PUBLIC_APP_LOG_LEVEL?: 'error' | 'warn' | 'info' | 'debug'

    // Next-Intl
    I18NEXUS_API_KEY?: string

    // Redis
    REDIS_HOST?: string
    REDIS_PASSWORD?: string
    REDIS_PORT?: string

    // Thumbor
    THUMBOR_DOMAIN?: string
    THUMBOR_KEY?: strign

    // DB
    DB_HOST?: string
    DB_PORT?: string
    DB_DATABASE?: string
    DB_USERNAME?: string
    DB_PASSWORD?: string
  }
}
