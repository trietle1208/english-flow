"use client";

import { useEffect, useRef } from "react";
import { recordStudyTime } from "./actions";

const HEARTBEAT_INTERVAL_MS = 60_000;

/**
 * AD-08 study-time heartbeat: every 60s while this tab is visible, call
 * `recordStudyTime`. Pauses on `document.hidden` so background tabs don't
 * inflate Daily Goal / streak minutes.
 */
export function useStudyHeartbeat(enabled = true) {
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let intervalId: ReturnType<typeof setInterval> | null = null;

    const tick = () => {
      if (!enabledRef.current || document.hidden) {
        return;
      }
      void recordStudyTime();
    };

    const start = () => {
      if (intervalId !== null) {
        return;
      }
      intervalId = setInterval(tick, HEARTBEAT_INTERVAL_MS);
    };

    const stop = () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const onVisibility = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    if (!document.hidden) {
      start();
    }

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);
}
