<template>
    <aui-base-add-page
        @form-input="triggerCreation"
    >
        <aui-new-contract
            :loading="$waitPage()"
            :type="type"
        />
    </aui-base-add-page>
</template>

<script>
import AuiNewContract from 'components/edit-forms/AuiNewContract'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapActions } from 'vuex'
export default {
    name: 'AuiContractCreation',
    components: {
        AuiBaseAddPage,
        AuiNewContract
    },
    props: {
        type: {
            type: String,
            required: true
        }
    },
    methods: {
        ...mapActions('contracts', [
            'createContract'
        ]),
        async triggerCreation (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                await this.createContract(data)
                await this.$router.push({ name: 'contractList' })
                showGlobalSuccessMessage(this.$t('Contract created successfully'))
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        }
    }
}
</script>
