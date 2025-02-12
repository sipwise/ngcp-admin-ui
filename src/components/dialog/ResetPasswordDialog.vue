<template>
    <base-dialog
        ref="dialog"
        :loading="$wait.is('aui-administrator-reset-password')"
        title-icon="vpn_key"
        :title="dialogTitle"
        v-bind="$attrs"
    >
        <template
            #content
        >
            <reset-password-form
                ref="resetPasswordForm"
                :loading="$wait.is('aui-administrator-reset-password')"
                @validation-succeeded="validationSucceeded"
            />
        </template>
        <template
            #actions
        >
            <q-btn
                icon="check"
                unelevated
                color="primary"
                :label="'Save'"
                data-cy="save-button"
                :disable="$wait.is('aui-administrator-reset-password')"
                :loading="$wait.is('aui-administrator-reset-password')"
                @click="$refs.resetPasswordForm.submit()"
            />
        </template>
    </base-dialog>
</template>
<script>
import ResetPasswordForm from 'src/components/ResetPasswordForm'
import BaseDialog from 'src/components/dialog/BaseDialog'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'ResetPasswordDialog',
    components: {
        BaseDialog,
        ResetPasswordForm
    },
    props: {
        token: {
            type: String,
            default: null
        },
        admin: {
            type: Object,
            default: null
        }
    },
    computed: {
        dialogTitle () {
            return this.$t('Reset password') + ((this?.admin?.login) ? `: ${this?.admin?.login}` : '')
        }
    },
    methods: {
        ...mapWaitingActions('administrators', {
            resetAdministratorPassword: 'aui-administrator-reset-password',
            recoverAdministratorPassword: 'aui-administrator-reset-password'
        }),
        async validationSucceeded (payload) {
            if (this.token) {
                await this.recoverAdministratorPassword({
                    password: payload.password,
                    token: this.token
                })
            } else {
                await this.resetAdministratorPassword({
                    ...payload,
                    adminId: this?.admin?.id
                })
                showGlobalSuccessMessage(this.$t('Password reset successfully'))
                this.hide()
            }
        },
        show () {
            this.$refs.dialog.show()
        },
        hide () {
            this.$refs.dialog.hide()
        }
    }
}
</script>
