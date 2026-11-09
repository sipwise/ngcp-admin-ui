<template>
    <aui-select-lazy
        :label="$t('Customer')"
        data-cy="aui-select-customer"
        icon="fas fa-user-tie"
        clearable
        :store-generator-name="'selectLazy/pbxCustomers'"
        :store-action-params="storeActionParams"
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
    name: 'AuiSelectPbxCustomer',
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
        storeActionParams () {
            return {
                resellerId: this.resellerId,
                type: 'pbxaccount',
                not_status: 'terminated',
                expand: 'contact_id.reseller_id,billing_profile_id',
                soft_expand: 1
            }
        }
    }
}
</script>
