<template>
    <aui-select-lazy
        :label="$t('Vouchers')"
        data-cy="aui-select-voucher"
        icon="fas fa-money-check-alt"
        dense
        store-generator-name="selectLazy/billingVouchersList"
        :store-action-params="{
            resellerId: resellerId,
            order_by:'valid_until',
            order_by_direction :'asc'
        }"
        :load-initially="true"
        clearable
        v-bind="$attrs"
        :hint="hintText"
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
    },
    computed: {
        hintText () {
            return this.$t('Search by full voucher code.')
        }
    }
}
</script>
