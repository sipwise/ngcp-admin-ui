<template>
    <aui-base-edit-context
        ref="baseEditContext"
        :show-close-button="false"
        :loading="$wait.is('aui-reseller-branding')"
        @form-input="triggerUpdate"
    >
        <aui-new-reseller-branding
            v-if="resourceObject"
            ref="form"
            :reseller-id="resourceObject.id"
            @start-loading="waitStart"
            @end-loading="waitEnd"
        />
    </aui-base-edit-context>
</template>

<script>
import {
    mapWaitingActions
} from 'vue-wait'
import {
    WAIT_PAGE
} from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { mapState } from 'vuex'
import AuiNewResellerBranding from 'components/edit-forms/AuiNewResellerBranding'
export default {
    name: 'AuiResellerDetailsBranding',
    components: {
        AuiNewResellerBranding,
        AuiBaseEditContext
    },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ])
    },
    methods: {
        ...mapWaitingActions('resellers', {
            createResellerBranding: 'aui-reseller-branding',
            updateResellerBranding: 'aui-reseller-branding'
        }),
        hasUnsavedData (value) {
            this.$refs.baseEditContext.$emit('form-has-unsaved-data', value)
        },
        waitStart () {
            this.$wait.start(WAIT_PAGE)
        },
        waitEnd () {
            this.$wait.end(WAIT_PAGE)
        },
        async triggerUpdate (payload) {
            this.waitStart()
            if (!payload.reseller_id) {
                payload.reseller_id = this.resourceObject.id
                await this.createResellerBranding(payload)
            } else {
                await this.updateResellerBranding(payload)
            }
            showGlobalSuccessMessage(this.$t('Reseller branding saved successfully'))
            this.$refs.form.loadData()
            this.waitEnd()
        }
    }
}
</script>
