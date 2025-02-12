<template>
    <q-page
        class="flex flex-center"
    >
        <reset-password-dialog
            v-model="resetPasswordDialog"
            :title="$t('Recover password')"
            :loading="isDialogRequesting"
            :token="token"
            @hide="redirectToLogin()"
        />
    </q-page>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import ResetPasswordDialog from 'components/dialog/ResetPasswordDialog'
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
import { PATH_LOGIN } from 'src/router/common'
export default {
    name: 'RecoverPassword',
    components: {
        ResetPasswordDialog
    },
    props: {
        token: {
            type: String,
            default: () => {
                return null
            }
        }
    },
    data () {
        return {
            logo: false,
            resetPasswordDialog: true
        }
    },
    computed: {
        ...mapGetters('user', [
            'isDialogRequesting',
            'hasDialogSucceeded',
            'hasDialogFailed'
        ])
    },
    watch: {
        hasDialogSucceeded (value) {
            if (value === true) {
                showGlobalSuccessMessage(this.$t('Password reset successfully'))
                this.redirectToLogin()
            }
        },
        hasDialogFailed (value) {
            if (value === true) {
                showGlobalErrorMessage(this.$t('There was an error, please retry later'))
            }
        }
    },
    mounted () {
        if (!this.token) {
            this.redirectToLogin()
        }
    },
    methods: {
        redirectToLogin () {
            this.$router.push({ path: PATH_LOGIN })
        }
    }
}
</script>

<style>
</style>
