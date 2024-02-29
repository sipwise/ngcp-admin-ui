<template>
    <aui-select-lazy
        icon="fas fa-file-invoice"
        :label="$t('Invoice Template')"
        clearable
        dense
        store-generator-name="selectLazy/invoiceTemplatesList"
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
import AuiSelectLazy from 'src/components/input/AuiSelectLazy'
export default {
    name: 'AuiSelectInvoiceTemplate',
    components: {
        AuiSelectLazy
    }
}
</script>
