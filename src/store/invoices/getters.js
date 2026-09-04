export function filteredInvoiceRecipients (state) {
    return state.recipients.map((item) => ({
        label: `${item.id}-${item.contact_id_expand?.email}-${item.type}`,
        value: item.id
    }))
}
