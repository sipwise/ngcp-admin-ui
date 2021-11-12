<template>
    <aui-base-edit-context
        key="resellerEdit"
        @form-input="triggerUpdate"
    >
        <aui-new-reseller
            ref="form"
            :reseller="resellerObject"
            :contract="contractObject"
            :contact="contactObject"
            :loading="$waitPage()"
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
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
export default {
    name: 'AuiResellerEdit',
    components: {
        AuiBaseEditContext,
        AuiNewReseller
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
        }
    },
    methods: {
        ...mapActions('resellers', [
            'updateReseller'
        ]),
        ...mapActions('page', [
            'reloadContext'
        ]),
        async triggerUpdate (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                await this.updateReseller(data)
                await this.reloadContext()
                showGlobalSuccessMessage(this.$t('Reseller updated successfully'))
            } catch (err) {
                this.$refs.form.reset()
                throw err
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        }
    }
}
</script>
