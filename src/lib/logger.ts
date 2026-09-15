type LogLevel = "debug" | "info" | "warn" | "error";

const LEVEL_RANK: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
};

const MIN_LEVEL: LogLevel =
  process.env.NODE_ENV === "production" ? "info" : "debug";

function shouldLog(level: LogLevel): boolean {
  return LEVEL_RANK[level] >= LEVEL_RANK[MIN_LEVEL];
}

function write(level: LogLevel, message: string, meta?: unknown): void {
  if (!shouldLog(level)) return;

  const prefix = `[${level}]`;
  const sink =
    level === "error" ? console.error : level === "warn" ? console.warn : console.info;

  if (meta === undefined) {
    sink(prefix, message);
    return;
  }
  sink(prefix, message, meta);
}

/**
 * Small leveled server logger (Phase 13 / §33). Prefer this over raw
 * `console.log` in Server Actions and route handlers so production noise
 * stays at info+ and debug stays local.
 */
export const logger = {
  debug: (message: string, meta?: unknown) => write("debug", message, meta),
  info: (message: string, meta?: unknown) => write("info", message, meta),
  warn: (message: string, meta?: unknown) => write("warn", message, meta),
  error: (message: string, meta?: unknown) => write("error", message, meta),
};
