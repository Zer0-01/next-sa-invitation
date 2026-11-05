"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "invitation:rsvp";

export interface RsvpRecord {
  name: string;
  isAttend: boolean;
  pax: number;
  submittedAt: string;
}

function isRsvpRecord(value: unknown): value is RsvpRecord {
  if (!value || typeof value !== "object") {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.name === "string" &&
    typeof record.isAttend === "boolean" &&
    typeof record.pax === "number" &&
    typeof record.submittedAt === "string"
  );
}

/**
 * Remembers on this device that the guest has already replied, so a returning
 * guest sees their confirmation instead of an empty form. Per-device only:
 * storage can be cleared or blocked, so every access is guarded.
 */
export function useRsvpRecord() {
  const [record, setRecord] = useState<RsvpRecord | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = stored ? JSON.parse(stored) : null;

      if (isRsvpRecord(parsed)) {
        setRecord(parsed);
      }
    } catch {
      // Storage unavailable or corrupted: fall back to showing the form.
    }
  }, []);

  const saveRecord = useCallback((nextRecord: RsvpRecord) => {
    setRecord(nextRecord);

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextRecord));
    } catch {
      // Not persisted, but the confirmation still shows for this visit.
    }
  }, []);

  const clearRecord = useCallback(() => {
    setRecord(null);

    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to clear.
    }
  }, []);

  return { record, saveRecord, clearRecord };
}
