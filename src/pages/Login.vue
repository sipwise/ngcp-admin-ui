<template>
    <q-page
        class="flex flex-center"
    >
        <div
            class="q-col-gutter-y-lg"
            style=""
        >
            <transition
                appear
                enter-active-class="animated slideInDown"
            >
                <sipwise-logo
                    key="sipwise-logo"
                    style="width: 300px"
                />
            </transition>
            <transition
                appear
                enter-active-class="animated slideInUp"
            >
                <q-form
                    key="sipwise-login-form"
                >
                    <div
                        id="login-title"
                        class="text-h5 q-pa-md"
                    >
                        {{ $t('Admin Sign In') }}
                    </div>
                    <div class="q-mb-md">
                        <aui-input-username
                            v-model.trim="username"
                            outlined
                            :label="$t('Username')"
                            data-cy="aui-input-username"
                            :disable="isLoginRequesting"
                            :error="usernameError"
                            @input-clear="clearUsername"
                            @input="focusUsername"
                            @keypress.enter="loginAction"
                        />
                        <aui-input-password
                            v-model.trim="password"
                            outlined
                            :label="$t('Password')"
                            data-cy="aui-input-password"
                            :disable="isLoginRequesting"
                            :error="passwordError"
                            :error-message="loginError"
                            @input-clear="clearPassword"
                            @input="focusPassword"
                            @keypress.enter="loginAction"
                        />
                    </div>
                    <div
                        class="row justify-between"
                    >
                        <q-btn
                            data-cy="reset-password"
                            color="primary"
                            unelevated
                            flat
                            :label="$t('Forgot password?')"
                            @click="showRetrievePasswordDialog"
                        />
                        <q-btn
                            data-cy="sign-in"
                            unelevated
                            color="primary"
                            icon="arrow_forward"
                            :loading="isLoginRequesting"
                            :disable="isLoginRequesting"
                            :label="$t('Sign In')"
                            @click="loginAction"
                        />
                    </div>
                    <retrieve-password-dialog
                        ref="retrievePasswordDialog"
                        v-model="showDialog"
                        @close="showDialog=false"
                    />
                </q-form>
            </transition>
        </div>
    </q-page>
</template>

<script>
import SipwiseLogo from 'components/SipwiseLogo'
import RetrievePasswordDialog from 'components/dialog/RetrievePasswordDialog'
import AuiInputPassword from 'components/input/AuiInputPassword'
import AuiInputUsername from 'components/input/AuiInputUsername'
import {
    mapActions,
    mapGetters,
    mapState
} from 'vuex'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Login',
    components: {
        AuiInputUsername,
        AuiInputPassword,
        SipwiseLogo,
        RetrievePasswordDialog
    },
    data () {
        return {
            logo: false,
            username: '',
            password: '',
            passwordVisible: false,
            usernameError: false,
            passwordError: false,
            showDialog: false
        }
    },
    computed: {
        isLoginRequesting () {
            return this.loginState === 'requesting'
        },
        hasLoginError () {
            return this.loginState === 'failed'
        },
        ...mapState('user', [
            'loginState',
            'loginError'
        ])
    },
    watch: {
        loginState (state) {
            if (state === 'failed') {
                this.usernameError = true
                this.passwordError = true
            }
        }
    },
    methods: {
        ...mapActions('user', [
            'login'
        ]),
        ...mapGetters('user', [
            'isSuperUser'
        ]),
        focusUsername () {
            this.usernameError = false
        },
        focusPassword () {
            this.passwordError = false
        },
        clearUsername () {
            this.username = ''
            this.usernameError = false
        },
        clearPassword () {
            this.password = ''
            this.passwordError = false
        },
        async loginAction () {
            await this.login({
                username: this.username,
                password: this.password
            })
        },
        showRetrievePasswordDialog () {
            this.showDialog = true
        }
    }
}
</script>

<style scoped>
    #login-title {
        padding-left: 0
    }
</style>
