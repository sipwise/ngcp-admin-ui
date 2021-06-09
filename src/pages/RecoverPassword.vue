<template>
    <q-page
        class="flex flex-center"
    >
        <change-password-dialog
            v-model="changePasswordDialog"
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
import ChangePasswordDialog from '../components/dialog/ChangePasswordDialog'
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
import { PATH_LOGIN } from 'src/router/common'
export default {
    name: 'RecoverPassword',
    components: {
        ChangePasswordDialog
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
            changePasswordDialog: true
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
                showGlobalSuccessMessage(this.$t('Password changed successfully'))
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
