<template>
    <aui-select-lazy
        icon="fas fa-address-card"
        :label="$t('Contact')"
        :store-getter="contactGetter"
        :store-action="contactAction"
        :load-initially="false"
        :create-buttons="contactCreationRoute"
        v-bind="$attrs"
        v-on="$listeners"
    />
</template>

<script>
import AuiSelectLazy from 'components/input/AuiSelectLazy'
export default {
    name: 'AuiSelectContract',
    components: {
        AuiSelectLazy
    },
    props: {
        type: {
            type: String,
            default: 'system'
        }
    },
    data () {
        return {}
    },
    computed: {
        contactGetter () {
            const getters = {
                system: 'contracts/filteredSystemContactsAsOptions',
                customer: 'contracts/customerContactsAsOptions'
            }
            return getters[this.type]
        },
        contactAction () {
            const actions = {
                system: 'contracts/filterSystemContacts',
                customer: 'contracts/fetchCustomerContacts'
            }
            return actions[this.type]
        },
        contactCreationRoute () {
            const routes = {
                system: { to: { name: 'contactCreateSystem' } },
                customer: { to: { name: 'contactCreateCustomer' } }
            }
            return routes[this.type]
        }
    }

}
</script>
