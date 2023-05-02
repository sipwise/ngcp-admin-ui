<template>
    <aui-select-lazy
        icon="fas fa-address-card"
        :label="$t('Contact')"
        :store-generator-name="storeGeneratorName"
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
    name: 'AuiSelectContact',
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
        storeGeneratorName () {
            const getters = {
                system: 'selectLazy/systemContactsList',
                customer: 'selectLazy/customerContactsList'
            }
            return getters[this.type]
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
