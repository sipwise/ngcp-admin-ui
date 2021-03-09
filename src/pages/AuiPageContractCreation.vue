<template>
    <aui-page-form-creation
        icon="fas fa-handshake"
        :resource-singular="title"
        :loading="$wait.is('processing createContract')"
        :list-route="listRoute"
        @create="create"
    >
        <aui-new-contract
            ref="form"
            :loading="$wait.is('processing createContract')"
            :type="type"
            @saved="saved"
        />
    </aui-page-form-creation>
</template>
<script>
import AuiPageFormCreation from 'pages/AuiPageFormCreation'
import AuiNewContract from 'components/edit-forms/AuiNewContract'
export default {
    name: 'AuiPageContractCreation',
    components: {
        AuiNewContract,
        AuiPageFormCreation
    },
    props: {
        type: {
            type: String,
            required: true
        }
    },
    computed: {
        title () {
            const contractTypeMap = {
                sippeering: this.$t('peering contract'),
                reseller: this.$t('reseller contract')
            }
            return contractTypeMap[this.type]
        },
        listRoute () {
            return '/contract'
        }
    },
    methods: {
        create () {
            this.$refs.form.submit()
        },
        saved () {
            this.$router.push({ path: this.listRoute })
        }
    }
}
</script>
