<template>
    <aui-base-edit-context>
        <aui-new-reseller
            v-if="resourceObject"
            :initial-form-data="resellerObject"
            :contract="contractObject"
            :contact="contactObject"
            :loading="$waitPage($wait)"
            @submit="update"
        >
            <template
                #actions="{ loading, hasInvalidData, hasUnsavedData, reset, submit }"
            >
                <aui-form-actions-update
                    :loading="loading"
                    :has-unsaved-data="hasUnsavedData"
                    :has-invalid-data="hasInvalidData"
                    @reset="reset"
                    @submit="submit"
                />
            </template>
        </aui-new-reseller>
    </aui-base-edit-context>
</template>
<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewReseller from 'components/edit-forms/AuiNewReseller'
import _ from 'lodash'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import {
    mapActions,
    mapState
} from 'vuex'
export default {
    name: 'AuiResellerEdit',
    components: {
        AuiFormActionsUpdate,
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
        async update (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                await this.updateReseller(data)
                await this.reloadContext()
                showGlobalSuccessMessage(this.$t('Reseller updated successfully'))
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        }
    }
}
</script>
