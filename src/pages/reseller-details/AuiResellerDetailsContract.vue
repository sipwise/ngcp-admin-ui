<template>
    <aui-base-sub-context>
        <aui-single-row-table
            v-if="resourceRelatedObjects && resourceRelatedObjects.contract &&
                resourceRelatedSubObjects && resourceRelatedSubObjects.contract"
            :columns="columns"
            :rows="[{
                id: resourceRelatedObjects.contract.id,
                external_id: resourceRelatedObjects.contract.external_id,
                contact_email: resourceRelatedSubObjects.contract.contact.email,
                billing_profile: resourceRelatedSubObjects.contract.billingProfile.name,
                status: resourceRelatedObjects.contract.status
            }]"
            :row-action-route-names="[
                'contractEdit'
            ]"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiSingleRowTable from 'components/AuiSingleRowTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { mapState } from 'vuex'
export default {
    name: 'AuiResellerDetailsContract',
    components: {
        AuiSingleRowTable,
        AuiBaseSubContext
    },
    computed: {
        ...mapState('page', [
            'resourceRelatedObjects',
            'resourceRelatedSubObjects'
        ]),
        columns () {
            return [
                {
                    name: 'id',
                    label: this.$t('Id')
                },
                {
                    name: 'external_id',
                    label: this.$t('External #')
                },
                {
                    name: 'contact_email',
                    label: this.$t('Contact Email')
                },
                {
                    name: 'billing_profile',
                    label: this.$t('Billing Profile')
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
