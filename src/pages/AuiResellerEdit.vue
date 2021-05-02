<template>
    <aui-base-edit-context
        :has-unsaved-data="hasUnsavedData"
        @save="triggerSave"
        @reset="triggerReset"
    >
        <aui-new-reseller
            ref="form"
            :reseller="resellerObject"
            :contract="contractObject"
            :contact="contactObject"
            :loading="loading"
            @has-unsaved-data="hasUnsavedData=$event"
            @input="triggerUpdate"
        />
    </aui-base-edit-context>
</template>
<script>
import _ from 'lodash'
import {
    mapActions,
    mapState
} from 'vuex'
import AuiNewReseller from 'components/edit-forms/AuiNewReseller'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_CONTEXT_AWARE_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
export default {
    name: 'AuiPageResellerUpdate',
    components: {
        AuiBaseEditContext,
        AuiNewReseller
    },
    data () {
        return {
            hasUnsavedData: false
        }
    },
    computed: {
        ...mapState('page', [
            'resourceObject',
            'resourceRelatedObjects',
            'resourceRelatedSubObjects'
        ]),
        resellerObject () {
            return this.resourceObject
        },
        contractObject () {
            return _.get(this.resourceRelatedObjects, 'contract', null)
        },
        contactObject () {
            return _.get(this.resourceRelatedSubObjects, 'contract.contact', null)
        },
        loading () {
            return this.$wait.is(WAIT_CONTEXT_AWARE_PAGE)
        }
    },
    methods: {
        ...mapActions('resellers', [
            'updateReseller'
        ]),
        ...mapActions('page', [
            'reloadContext'
        ]),
        triggerSave () {
            this.$refs.form.submit()
        },
        triggerReset () {
            this.$refs.form.reset()
        },
        async triggerUpdate (data) {
            try {
                this.$wait.start(WAIT_CONTEXT_AWARE_PAGE)
                await this.updateReseller(data)
                await this.reloadContext()
                showGlobalSuccessMessage(this.$t('Reseller updated successfully'))
            } finally {
                this.$wait.end(WAIT_CONTEXT_AWARE_PAGE)
            }
        }
    }
}
</script>
