export function setActiveRecipientsKey (state, key) {
    state.activeRecipientsKey = key
}
export function setRecipients (state, { key, items, page }) {
    if (key !== state.activeRecipientsKey) {
        return
    }
    state.recipients = page > 1 ? [...state.recipients, ...items] : items
}
