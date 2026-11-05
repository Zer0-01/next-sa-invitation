"use client";

export const MESSAGES_UPDATED_EVENT = "invitation:messages-updated";

export interface MessagesUpdatedDetail {
  /** Firestore id of the message the guest just posted, if any. */
  messageId?: string;
}

export function notifyMessagesUpdated(detail: MessagesUpdatedDetail = {}) {
  window.dispatchEvent(
    new CustomEvent<MessagesUpdatedDetail>(MESSAGES_UPDATED_EVENT, { detail }),
  );
}
