<template>
    <q-page>
        <div
            class="column items-center q-pa-md"
        >
            <transition
                appear
                enter-active-class="animated slideInDown"
                duration="3000"
                class="text-center"
            >
                <sipwise-logo
                    key="sipwise-logo"
                    class="sipwise-logo"
                />
            </transition>
            <transition
                appear
                duration="3000"
                enter-active-class="animated slideInUp"
            >
                <q-form
                    key="sipwise-login-form"
                    class="login-form column items-center q-pa-md"
                >
                    <div
                        id="login-title"
                        class="col"
                    >
                        <h5 class="text-center">
                            {{ $t('Admin Sign In') }}
                        </h5>

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
                        v-if="showOTP"
                        class="row q-mb-md"
                    >
                        <q-card
                            flat
                            bordered
                            class="q-mt-lg"
                        >
                            <q-card-section
                                v-if="showOTPSecretUrl"
                                class="text-center q-mt-none"
                            >
                                <q-icon
                                    name="key"
                                    size="4rem"
                                    color="primary"
                                />
                                <h4 class="text-h4 h4 text-center q-mt-sm q-mb-sm">
                                    {{ $t('OTP Verification') }}
                                </h4>
                            </q-card-section>

                            <q-card-section v-if="showOTPSecretUrl">
                                <q-list>
                                    <q-item>
                                        <div>
                                            <h6 class="q-ma-sm">
                                                <q-icon
                                                    name="download"
                                                    size="2rem"
                                                    color="primary"
                                                    class="q-mr-sm"
                                                />
                                                {{ $t('Download App') }}
                                            </h6>
                                            <p class="q-ml-md">
                                                {{ $t('Install Google Authenticator app on your mobile device or use your preferred Authenticator app.') }}
                                            </p>
                                        </div>
                                    </q-item>

                                    <q-card-actions align="center">
                                        <a
                                            class="q-ma-md q-mr-sm"
                                            target="_blank"
                                            href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
                                        ><img
                                            alt="Get it on Google Play"
                                            src="google-play.png"
                                            class="app-badge"
                                        ></a>

                                        <a
                                            class="q-ma-md q-mr-sm"
                                            target="_blank"
                                            href="https://apps.apple.com/us/app/google-authenticator/id388497605?itsct=apps_box_badge&itscg=30200"
                                        ><img
                                            src="apple-store-badge.svg"
                                            alt="Download on the App Store"
                                            class="app-badge"
                                        ></a>
                                    </q-card-actions>

                                    <q-item>
                                        <div>
                                            <h6 class="q-ma-sm">
                                                <q-icon
                                                    name="qr_code"
                                                    size="2rem"
                                                    color="primary"
                                                    class="q-mr-sm"
                                                />   {{ $t('Scan QR code') }}
                                            </h6>
                                            <p class="q-ml-md">
                                                {{ $t('Open the Authenticator app to register your NGCP account.') }}
                                            </p>
                                        </div>
                                    </q-item>
                                    <div
                                        v-if="OTPSecret && OTPSecret.type === 'qr'"
                                        class="column items-center"
                                    >
                                        <q-img
                                            :src="OTPSecret.data"
                                            class="qr-code"
                                        />
                                        <q-btn
                                            color="primary"
                                            flat
                                            class="q-mt-md"
                                            :loading="isLoading"
                                            @click="handleGetOTPAsText"
                                        >
                                            {{ $t('Display as setup key') }}
                                        </q-btn>
                                    </div>
                                    <div
                                        v-if="OTPSecret && OTPSecret.type === 'text'"
                                        class="column items-center"
                                    >
                                        <q-card class="no-shadow">
                                            <p class="text-bold text-green">
                                                {{ OTPSecret.data }}
                                            </p>
                                        </q-card>
                                        <q-btn
                                            color="primary"
                                            flat
                                            class="q-mt-md"
                                            :loading="isLoading"
                                            @click="handleGetOTPAsQrCode"
                                        >
                                            {{ $t('Display as QR code') }}
                                        </q-btn>
                                    </div>
                                </q-list>
                            </q-card-section>

                            <q-card-section>
                                <q-list>
                                    <q-item>
                                        <div>
                                            <h6 class="q-ma-sm">
                                                <q-icon
                                                    name="password"
                                                    size="2rem"
                                                    color="primary"
                                                    class="q-mr-sm"
                                                />{{ $t('Enter OTP') }}
                                            </h6>
                                            <p class="q-ml-md">
                                                {{ $t('Use the Authenticator app to generate the verification code.') }}
                                            </p>
                                        </div>
                                    </q-item>
                                    <q-item class="justify-center">
                                        <q-input
                                            v-model="otp"
                                            color="primary"
                                            label-color="primary"
                                            data-cy="otp-code"
                                            :loading="isLoginRequesting"
                                            :disable="isLoginRequesting"
                                            :label="$t('OTP Code')"
                                            :error="OTPError"
                                            :error-message="loginError"
                                            @input-clear="clearOTP"
                                            @input="focusOTP"
                                            @keypress.enter="loginAction"
                                        />
                                    </q-item>
                                </q-list>
                            </q-card-section>
                        </q-card>
                    </div>
                    <div class="justify-between q-mt-lg">
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
import { mapActions, mapGetters, mapState } from 'vuex'
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
            otp: null,
            passwordVisible: false,
            usernameError: false,
            passwordError: false,
            showDialog: false,
            isLoading: false
        }
    },
    computed: {
        ...mapGetters('user', [
            'OTPSecret'
        ]),
        isLoginRequesting () {
            return this.loginState === 'requesting'
        },
        hasLoginError () {
            return this.loginState === 'failed'
        },
        ...mapState('user', [
            'loginState',
            'loginError'
        ]),
        showOTP () {
            return this.loginState === 'waitingForOTPCode' || this.loginError === 'Invalid OTP Code'
        },
        showOTPSecretUrl () {
            return this.OTPSecret !== null || (this.OTPSecret !== null && this.loginError === 'Invalid OTP Code')
        }
    },
    watch: {
        loginError (error) {
            if (error !== null) {
                const isInvalidOTPError = this.loginError === 'Invalid OTP Code'
                this.usernameError = !isInvalidOTPError
                this.passwordError = !isInvalidOTPError
                this.OTPError = isInvalidOTPError
                this.otp = null
            }
        }
    },
    methods: {
        ...mapActions('user', [
            'login',
            'getOTPSecretAsText',
            'getOTPSecretAsImage'
        ]),
        focusUsername () {
            this.usernameError = false
        },
        focusPassword () {
            this.passwordError = false
        },
        focusOTP () {
            this.OTPError = false
        },
        clearUsername () {
            this.username = ''
            this.usernameError = false
        },
        clearPassword () {
            this.password = ''
            this.passwordError = false
        },
        clearOTP () {
            this.otp = null
            this.OTPError = false
        },
        async loginAction () {
            const payload = {
                username: this.username,
                password: this.password
            }
            if (this.otp) {
                payload.otp = this.otp
            }

            await this.login(payload)
        },
        showRetrievePasswordDialog () {
            this.showDialog = true
        },
        async handleGetOTPAsText () {
            try {
                this.isLoading = true
                const payload = {
                    username: this.username,
                    password: this.password
                }
                await this.getOTPSecretAsText(payload)
            } finally {
                this.isLoading = false
            }
        },
        async handleGetOTPAsQrCode () {
            try {
                this.isLoading = true
                const payload = {
                    username: this.username,
                    password: this.password
                }
                await this.getOTPSecretAsImage(payload)
            } finally {
                this.isLoading = false
            }
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.sipwise-logo
    width: 300px
.qr-code
    width: 200px
    height: 200px
.login-form
    max-width: 500px
.app-badge
    height: 45px
</style>
