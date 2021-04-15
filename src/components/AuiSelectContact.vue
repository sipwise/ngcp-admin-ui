<template>
    <aui-select-lazy
        icon="fas fa-address-card"
        :label="$t('Contact')"
        :store-getter="contactGetter"
        :store-action="contactAction"
        :load-initially="false"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <template
            v-slot:after
        >
            <q-btn
                size="sm"
                icon="add"
                color="primary"
                unelevated
                :disable="$attrs.disable || $attrs.loading"
                :label="$t('Create')"
                :to="contactCreationUrl"
            />
        </template>
    </aui-select-lazy>
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
        contactCreationUrl () {
            const urls = {
                system: '/contact/create/noreseller',
                customer: '/contact/create'
            }
            return urls[this.type]
        }
    }

}
</script>
