<template>
    <aui-base-sub-context>
        <aui-single-row-table
            v-if="resourceRelatedSubObjects && resourceRelatedSubObjects.contract && resourceRelatedSubObjects.contract.contact"
            :columns="columns"
            :row="{
                id: resourceRelatedSubObjects.contract.contact.id,
                firstname: resourceRelatedSubObjects.contract.contact.firstname,
                lastname: resourceRelatedSubObjects.contract.contact.lastname,
                company: resourceRelatedSubObjects.contract.contact.company,
                email: resourceRelatedSubObjects.contract.contact.email
            }"
            :row-action-route-names="[
                'contactEditSystem'
            ]"
        />
    </aui-base-sub-context>
</template>

<script>
import { mapState } from 'vuex'
import AuiSingleRowTable from 'components/AuiSingleRowTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
export default {
    name: 'AuiResellerDetailsContact',
    components: {
        AuiBaseSubContext,
        AuiSingleRowTable
    },
    data () {
        return {
        }
    },
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
                    name: 'firstname',
                    label: this.$t('First Name')
                },
                {
                    name: 'lastname',
                    label: this.$t('Last Name')
                },
                {
                    name: 'company',
                    label: this.$t('Company')
                },
                {
                    name: 'email',
                    label: this.$t('Email')
                }
            ]
        }
    }
}
</script>
