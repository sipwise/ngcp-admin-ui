<template>
    <aui-base-sub-context>
        <aui-single-row-table
            v-if="resourceObject"
            :columns="columns"
            :rows="[{
                id: resourceObject.id,
                name: resourceObject.name,
                status: resourceObject.status
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
import { mapState } from 'vuex'
export default {
    name: 'AuiResellerBaseInformation',
    components: { AuiSingleRowTable, AuiBaseSubContext },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ]),
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
