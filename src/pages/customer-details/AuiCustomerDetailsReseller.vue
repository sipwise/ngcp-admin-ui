<template>
    <aui-base-sub-context>
        <aui-single-row-table
            v-if="customerContext && customerContextContact && customerContextReseller"
            :columns="columns"
            :row="{
                id: customerContextReseller.id,
                name: customerContextReseller.name,
                status: customerContextReseller.status
            }"
            :row-action-route-names="[
                'resellerEdit'
            ]"
        />
    </aui-base-sub-context>
</template>
<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiSingleRowTable from 'components/AuiSingleRowTable'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
export default {
    name: 'AuiCustomerDetailsReseller',
    components: {
        AuiSingleRowTable,
        AuiBaseSubContext
    },
    mixins: [
        customerContextMixin
    ],
    computed: {
        columns () {
            return [
                {
                    name: 'id',
                    label: this.$t('Id')
                },
                {
                    name: 'name',
                    label: this.$t('Name')
                },
                {
                    name: 'status',
                    label: this.$t('Status')
                }
            ]
        }
    }
}
</script>
