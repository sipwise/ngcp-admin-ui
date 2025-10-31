<template>
    <aui-base-page
        class="row no-wrap"
        :loading="$attrs.loading || $wait.is('aui-data-table-*')"
        v-bind="$attrs"
    >
        <q-list
            class="col-auto q-pl-md q-pt-md"
        >
            <aui-main-menu-item
                v-for="(item, index) in menuItems"
                :key="index"
                :label="item.label"
                :icon="item.icon"
                :to="item.to"
            />
        </q-list>
        <aui-lnp-carriers-list
            v-if="showCarriers"
            class="col"
        />
        <aui-lnp-numbers-list
            v-else
            class="col"
        />
    </aui-base-page>
</template>

<script>
import AuiMainMenuItem from 'components/AuiMainMenuItem'
import AuiBasePage from 'pages/AuiBasePage'
import AuiLnpCarriersList from 'pages/lnp/AuiLnpCarriersList'
import AuiLnpNumbersList from 'pages/lnp/AuiLnpNumbersList'
import lnpCarrierMixin from 'src/mixins/data-context-pages/lnp-carrier'
import lnpNumbersMixin from 'src/mixins/data-context-pages/lnp-numbers'

export default {
    name: 'AuiLnpPage',
    components: {
        AuiMainMenuItem,
        AuiBasePage,
        AuiLnpCarriersList,
        AuiLnpNumbersList
    },
    mixins: [
        lnpCarrierMixin,
        lnpNumbersMixin
    ],
    props: {
        showCarriers: {
            type: Boolean,
            default: true
        }
    },
    computed: {
        menuItems () {
            return [
                {
                    label: this.$t('LNP Carriers'),
                    icon: 'fa-solid fa-circle-nodes',
                    to: { name: 'lnpCarriersList' }
                },
                {
                    label: this.$t('LNP Numbers'),
                    icon: 'fa-solid fa-sim-card',
                    to: { name: 'lnpNumbersList' }
                }
            ]
        }
    }
}
</script>
