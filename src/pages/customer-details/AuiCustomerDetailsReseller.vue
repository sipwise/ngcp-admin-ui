<template>
    <aui-base-sub-context>
        <aui-single-row-table
            v-if="customerContext && customerContextContact && customerContextReseller"
            :columns="columns"
            :rows="[{
                id: customerContextReseller.id,
                name: customerContextReseller.name,
                status: customerContextReseller.status
            }]"
            :row-action-route-names="[
                'resellerEdit'
            ]"
        />
    </aui-base-sub-context>
</template>
<script>
import AuiSingleRowTable from 'components/AuiSingleRowTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
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
