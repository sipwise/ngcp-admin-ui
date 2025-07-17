<template>
    <aui-base-add-context>
        <template
            #default="{ initialFormData, loading }"
        >
            <aui-time-set-form
                v-if="resourceObject"
                :initial-form-data="initialFormData"
                :reseller-id="resourceObject.id"
                :loading="loading"
                @submit="create"
            >
                <template
                    #actions="{ hasInvalidData, submit }"
                >
                    <aui-form-actions-creation
                        :loading="loading"
                        :has-invalid-data="hasInvalidData"
                        @submit="submit"
                    />
                </template>
            </aui-time-set-form>
        </template>
    </aui-base-add-context>
</template>
<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiTimeSetForm from 'components/edit-forms/AuiTimeSetForm'
import AuiBaseAddContext from 'pages/AuiBaseAddContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import { mapState } from 'vuex'
export default {
    name: 'AuiResellerDetailsTimeSetCreation',
    components: {
        AuiTimeSetForm,
        AuiFormActionsCreation,
        AuiBaseAddContext
    },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ])
    },
    methods: {
        ...mapWaitingActions('timeSets', {
            createTimeSet: WAIT_PAGE
        }),
        async create (data) {
            await this.createTimeSet(data)
            showGlobalSuccessMessage(this.$t('Timeset entry successfully created'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
