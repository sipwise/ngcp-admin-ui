<template>
    <aui-page
        root-route="contractList"
        :breadcrumb-items="breadcrumbItems"
        :loading="isPageLoading()"
    >
        <portal
            to="page-toolbar-left"
        >
            <aui-save-button
                class="q-mr-sm q-ml-xl"
                @click="triggerSave"
            />
            <aui-close-button
                class="q-mr-sm"
                :to="{ name: 'contractList' }"
            />
        </portal>
        <aui-new-contract
            ref="form"
            :loading="isPageLoading()"
            :type="type"
            @input="triggerCreation"
        />
    </aui-page>
</template>

<script>
import AuiNewContract from 'components/edit-forms/AuiNewContract'
import AuiPage from 'pages/AuiPage'
import AuiSaveButton from 'components/buttons/AuiSaveButton'
import AuiCloseButton from 'components/buttons/AuiCloseButton'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapActions } from 'vuex'
export default {
    name: 'AuiContractCreation',
    components: {
        AuiCloseButton,
        AuiSaveButton,
        AuiPage,
        AuiNewContract
    },
    props: {
        type: {
            type: String,
            required: true
        }
    },
    computed: {
        breadcrumbItems () {
            if (this.type === 'sippeering') {
                return ['contractCreatePeering']
            } else {
                return ['contractCreateReseller']
            }
        }
    },
    methods: {
        ...mapActions('contracts', [
            'createContract'
        ]),
        triggerSave () {
            this.$refs.form.submit()
        },
        isPageLoading () {
            return this.$wait.is(WAIT_PAGE)
        },
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
