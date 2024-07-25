type LogMethod = 'error' | 'warn' | 'info' | 'debug'
type LogMethodLevel = { [key in LogMethod]: number }

const logMethodLevel: LogMethodLevel = {
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
}

const logger = {
  debug: (...rest: any[]) => writeConsoleLog('debug', ...rest),
  info: (...rest: any[]) => writeConsoleLog('info', ...rest),
  error: (...rest: any[]) => writeConsoleLog('error', ...rest),
  warn: (...rest: any[]) => writeConsoleLog('warn', ...rest),
}

const writeConsoleLog = (logType: LogMethod, ...rest: any[]) => {
  if (typeof process.env.NEXT_PUBLIC_APP_LOG_LEVEL !== 'undefined') {
    if (
      logMethodLevel[logType] <=
      logMethodLevel[process.env.NEXT_PUBLIC_APP_LOG_LEVEL]
    ) {
      console.log(`${logType}:`, ...rest)
    }
  }
}

export { logger }
