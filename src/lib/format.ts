/**
 * Formats a minute count for course/lesson cards ("10 min", "1h 15m").
 * Shared so catalog and detail pages never drift on duration copy.
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }

  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;

  if (remaining === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${remaining}m`;
}

/** Zero-padded lesson index for the course detail list ("01", "02", …). */
export function formatLessonNumber(orderIndex: number): string {
  return String(orderIndex + 1).padStart(2, "0");
}

/**
 * Formats a second count for listening cards and the audio player
 * ("0:45", "1:05"). Clamps negatives to 0.
 */
export function formatClockTime(totalSeconds: number): string {
  const safe = Number.isFinite(totalSeconds) ? Math.max(0, Math.floor(totalSeconds)) : 0;
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

/** Human duration for listening lesson cards ("45 sec", "1 min 15 sec"). */
export function formatSecondsDuration(totalSeconds: number): string {
  const safe = Number.isFinite(totalSeconds) ? Math.max(0, Math.floor(totalSeconds)) : 0;
  if (safe < 60) {
    return `${safe} sec`;
  }
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  if (seconds === 0) {
    return `${minutes} min`;
  }
  return `${minutes} min ${seconds} sec`;
}

/** Quiz result time ("45s", "1m 05s", "1h 02m"). */
export function formatTimeSpent(totalSeconds: number): string {
  const safe = Number.isFinite(totalSeconds) ? Math.max(0, Math.floor(totalSeconds)) : 0;
  if (safe < 60) {
    return `${safe}s`;
  }
  const hours = Math.floor(safe / 3600);
  const minutes = Math.floor((safe % 3600) / 60);
  const seconds = safe % 60;
  if (hours > 0) {
    return seconds > 0 || minutes > 0
      ? `${hours}h ${String(minutes).padStart(2, "0")}m`
      : `${hours}h`;
  }
  return seconds > 0
    ? `${minutes}m ${String(seconds).padStart(2, "0")}s`
    : `${minutes}m`;
}
