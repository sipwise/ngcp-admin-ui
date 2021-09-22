<template>
    <aui-base-sub-context>
        <aui-single-row-table
            v-if="resourceRelatedSubObjects && resourceRelatedSubObjects.contact && resourceRelatedSubObjects.contact.reseller"
            :columns="columns"
            :row="{
                id: resourceRelatedSubObjects.contact.reseller.id,
                name: resourceRelatedSubObjects.contact.reseller.name,
                status: resourceRelatedSubObjects.contact.reseller.status
            }"
            :row-action-route-names="[
                'resellerEdit'
            ]"
        />
    </aui-base-sub-context>
</template>
<script>
import { mapState } from 'vuex'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiSingleRowTable from 'components/AuiSingleRowTable'
export default {
    components: { AuiSingleRowTable, AuiBaseSubContext },
    computed: {
        ...mapState('page', [
            'resourceRelatedSubObjects'
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
