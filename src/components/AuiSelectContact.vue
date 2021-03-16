<template>
    <div
        class="row items-baseline q-col-gutter-sm"
    >
        <div
            class="col"
        >
            <aui-select-lazy
                icon="fas fa-address-card"
                :label="$t('Contact')"
                :store-getter="contactGetter"
                :store-action="contactAction"
                v-bind="$attrs"
                v-on="$listeners"
            />
        </div>
        <div
            class="col col-auto"
        >
            <q-btn
                size="sm"
                icon="add"
                color="primary"
                unelevated
                :label="$t('Create')"
                :to="'/contact/create'"
            />
        </div>
    </div>
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
        return {

        }
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
        }
    }

}
</script>
