<template>
    <aui-select-lazy
        clearable
        store-getter="invoices/filteredInvoiceRecipients"
        store-action="invoices/loadInvoiceRecipients"
        :store-action-params="{
            category: category,
            resellerId: resellerId
        }"
        :load-initially="false"
        v-bind="$attrs"
    >
        <template
            v-for="(_, slotName) of $slots"
            #[slotName]="scope"
        >
            <slot
                :name="slotName"
                v-bind="scope"
            />
        </template>
    </aui-select-lazy>
</template>

<script>
import AuiSelectLazy from 'components/input/AuiSelectLazy'
export default {
    name: 'AuiSelectInvoiceRecipient',
    components: {
        AuiSelectLazy
    },
    props: {
        category: {
            type: String,
            default: null
        },
        resellerId: {
            type: Number,
            default: null
        }
    }
}
</script>
