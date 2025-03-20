<template>
    <aui-select-lazy
        :value="$attrs.value"
        :label="$t('Vouchers')"
        data-cy="aui-select-voucher"
        icon="fas fa-money-check-alt"
        clearable
        dense
        store-generator-name="selectLazy/billingVouchersList"
        :store-action-params="{
            resellerId: resellerId,
            expand: 'reseller_id'
        }"
        :load-initially="true"
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
    name: 'AuiSelectBillingVouchers',
    components: {
        AuiSelectLazy
    },
    props: {
        resellerId: {
            type: Number,
            default: null
        }
    }
}
</script>
