<template>
    <base-dialog
        ref="dialog"
        :loading="$wait.is('aui-administrator-change-password')"
        title-icon="vpn_key"
        :title="$t('Change password')"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <template
            v-slot:content
        >
            <change-password-form
                ref="changePasswordForm"
                :loading="$wait.is('aui-administrator-change-password')"
                @validation-succeeded="validationSucceeded"
            />
        </template>
        <template
            v-slot:actions
        >
            <q-btn
                icon="check"
                unelevated
                color="primary"
                :label="'Save'"
                :disable="$wait.is('aui-administrator-change-password')"
                :loading="$wait.is('aui-administrator-change-password')"
                @click="$refs.changePasswordForm.submit()"
            />
        </template>
    </base-dialog>
</template>
<script>
import ChangePasswordForm from '../ChangePasswordForm'
import BaseDialog from './BaseDialog'
import {
    mapWaitingActions
} from 'vue-wait'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
export default {
    name: 'ChangePasswordDialog',
    components: {
        BaseDialog,
        ChangePasswordForm
    },
    props: {
        token: {
            type: String,
            default: null
        }
    },
    methods: {
        ...mapWaitingActions('administrators', {
            changeAdministratorPassword: 'aui-administrator-change-password',
            recoverAdministratorPassword: 'aui-administrator-change-password'
        }),
        async validationSucceeded (payload) {
            if (this.token) {
                await this.recoverAdministratorPassword({
                    password: payload.password,
                    token: this.token
                })
            } else {
                await this.changeAdministratorPassword(payload)
                showGlobalSuccessMessage(this.$t('Password changed successfully'))
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
