<template>
    <base-dialog
        ref="dialog"
        title-icon="fas fa-user-shield"
        :title="$t('Reset OTP')"
        :loading="$wait.is('aui-reset-otp')"
        v-bind="$attrs"
    >
        <template
            v-if="is2FaEnabled"
            #content
        >
            <p>{{ $t('Are you sure you want to reset the OTP for {name}?', { name: userName }) }}</p>
            <p>{{ $t('The user will be required to set up their OTP again at their next login.') }}</p>
        </template>
        <template
            v-else
            #content
        >
            <p>{{ $t('Two-factor authentication is not enabled for this user.') }}</p>
        </template>
        <template
            v-if="is2FaEnabled"
            #actions
        >
            <q-btn
                icon="check"
                unelevated
                color="primary"
                :label="'Reset'"
                data-cy="save-button"
                :disable="$wait.is('aui-reset-otp')"
                :loading="$wait.is('aui-reset-otp')"
                @click="onReset()"
            />
        </template>
    </base-dialog>
</template>

<script>
import BaseDialog from 'components/dialog/BaseDialog'
export default {
    name: 'AuiDialogResetOtp',
    components: { BaseDialog },
    props: {
        is2FaEnabled: {
            type: Boolean,
            default: false
        },
        user: {
            type: Object,
            default: null
        }
    },
    emits: ['ok'],
    computed: {
        userName () {
            return this.user?.login || this.user?.login || this.$t('this user')
        }
    },
    methods: {
        hide () {
            this.$refs.dialog.hide()
        },
        onReset () {
            this.$emit('ok', this.user.id)
            this.hide()
        }
    }
}
</script>
