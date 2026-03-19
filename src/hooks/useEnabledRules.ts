"use client";

import { useCallback, useSyncExternalStore } from "react";

import { DEFAULT_PASSWORD_RULES } from "@/const/default-password-rules";
import { DEFAULT_MIN_LENGTH } from "@/const/default-min-length";
import { MIN_LENGTH_BOUNDS } from "@/const/min-length-bounds";

const STORAGE_KEY = "password-checker:enabled-rules";
const MIN_LENGTH_KEY = "password-checker:min-length";
const DEFAULT_IDS = DEFAULT_PASSWORD_RULES.map((r) => r.id);

// --- Кеш snapshots ---

let cachedIds: string[] = DEFAULT_IDS;
let cachedMinLength: number = DEFAULT_MIN_LENGTH;

function readIds(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as string[];
      const valid = parsed.filter((id) => DEFAULT_IDS.includes(id));
      if (valid.length > 0) {
        const hasChanged =
          valid.length !== cachedIds.length ||
          valid.some((id, i) => id !== cachedIds[i]);
        if (hasChanged) cachedIds = valid;
        return cachedIds;
      }
    }
  } catch {}
  return cachedIds;
}

function readMinLength(): number {
  try {
    const stored = localStorage.getItem(MIN_LENGTH_KEY);
    if (stored !== null) {
      const parsed = Number(stored);
      if (
        Number.isInteger(parsed) &&
        parsed >= MIN_LENGTH_BOUNDS.min &&
        parsed <= MIN_LENGTH_BOUNDS.max
      ) {
        cachedMinLength = parsed;
      }
    }
  } catch {}
  return cachedMinLength;
}

function writeIds(ids: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    cachedIds = ids;
  } catch {}
}

function writeMinLength(value: number): void {
  try {
    localStorage.setItem(MIN_LENGTH_KEY, String(value));
    cachedMinLength = value;
  } catch {}
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notifyListeners() {
  listeners.forEach((l) => l());
}

// --- Хук ---

export function useEnabledRules() {
  const enabledIds = useSyncExternalStore(
    subscribe,
    readIds,
    () => DEFAULT_IDS,
  );
  const minLength = useSyncExternalStore(
    subscribe,
    readMinLength,
    () => DEFAULT_MIN_LENGTH,
  );
  const hydrated = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const toggle = useCallback((ruleId: string, enabled: boolean) => {
    const current = readIds();
    const next = enabled
      ? [...current, ruleId]
      : current.filter((id) => id !== ruleId);
    writeIds(next);
    notifyListeners();
  }, []);

  const setMinLength = useCallback((value: number) => {
    const clamped = Math.min(
      Math.max(value, MIN_LENGTH_BOUNDS.min),
      MIN_LENGTH_BOUNDS.max,
    );
    writeMinLength(clamped);
    notifyListeners();
  }, []);

  return { enabledIds, minLength, toggle, setMinLength, hydrated };
}
