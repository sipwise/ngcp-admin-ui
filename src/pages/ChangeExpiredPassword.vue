<template>
    <q-page class="flex flex-center">
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
                <q-form key="sipwise-login-form">
                    <q-banner
                        dense
                        inline-actions
                        class="text-white text-center bg-red-14 q-mb-md"
                    >
                        {{ $t('Your password has expired') }}
                    </q-banner>

                    <div
                        id="login-title"
                        class="text-h5 text-center q-pa-md"
                    >
                        {{ $t('Create New Password') }}
                    </div>

                    <div
                        v-if="validationGuidelines && validationGuidelines.length > 0"
                        inline-actions
                        class="q-mb-md q-pa-md"
                    >
                        <p>{{ $tc('Suggested password format:') }}</p>
                        <q-item
                            v-for="(message, index) in validationGuidelines"
                            :key="index"
                            dense
                        >
                            <q-item-section>
                                <span>
                                    <q-icon
                                        name="lock"
                                        size="1em"
                                        class="q-pa-xs"
                                    /> {{ message }}
                                </span>
                            </q-item-section>
                        </q-item>
                    </div>

                    <aui-input-scored-password
                        v-model.trim="newPassword"
                        outlined
                        clearable
                        label-color="primary"
                        autocomplete="new-password"
                        :label="$t('New Password')"
                        data-cy="password-field"
                        :show-password="false"
                        :error="v$.newPassword.$errors.length > 0"
                        :error-message="$errMsg(v$.newPassword.$errors)"
                        @score="strengthMeterScoreUpdate"
                        @keyup.enter="changePasswordAction"
                    />

                    <q-input
                        ref="passwordRetypeInput"
                        v-model.trim="passwordRetype"
                        outlined
                        clearable
                        label-color="primary"
                        icon="lock"
                        :label="$t('Password Retype')"
                        data-cy="password-retype-field"
                        type="password"
                        autocomplete="new-password"
                        :error="v$.passwordRetype.$errors.length > 0"
                        :error-message="$errMsg(v$.passwordRetype.$errors)"
                        @keyup.enter="changePasswordAction"
                    >
                        <template
                            #prepend
                        >
                            <q-icon
                                name="lock"
                                color="primary"
                            />
                        </template>
                    </q-input>
                    <div
                        inline-actions
                        class="q-pa-md"
                    >
                        {{ $t('Please add your OLD password in the login pop-up.') }}
                    </div>
                    <div class="row justify-center">
                        <q-btn
                            data-cy="sign-in"
                            unelevated
                            color="primary"
                            icon="arrow_forward"
                            :label="$t('Change password')"
                            @click="changePasswordAction"
                        />
                    </div>
                </q-form>
            </transition>
        </div>
    </q-page>
</template>

<script>
import AuiInputScoredPassword from 'components/input/AuiInputScoredPassword'
import SipwiseLogo from 'components/SipwiseLogo'
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { mapActions, mapGetters } from 'vuex'
import { mapWaitingActions } from 'vue-wait'
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
import { PATH_LOGIN } from 'src/router/common'

export default {
    name: 'ChangeExpiredPassword',
    components: {
        AuiInputScoredPassword,
        SipwiseLogo
    },
    data () {
        return {
            v$: useValidate(),
            newPassword: '',
            passwordStrengthScore: null,
            passwordRetype: '',
            validationGuidelines: {}
        }
    },
    validations () {
        return {
            newPassword: {
                required
            },
            passwordRetype: {
                sameAsPassword (val) {
                    return val === this.newPassword
                }
            }
        }
    },
    computed: {
        ...mapGetters('user', [
            'passwordChangeError',
            'hasPasswordChangeSucceeded',
            'hasPasswordChangeFailed'
        ])
    },
    watch: {
        hasPasswordChangeSucceeded (value) {
            if (value) {
                showGlobalSuccessMessage(this.$t('Password changed successfully'))
                this.redirectToLogin()
            }
        },
        hasPasswordChangeFailed (value) {
            if (value) {
                showGlobalErrorMessage(this.passwordChangeError)
            }
        }
    },
    async mounted () {
        const customGuidelines = await this.fetchPreLoginPasswordInfo()
        this.validationGuidelines = this.formatValidationGuidelines(customGuidelines)
    },
    methods: {
        ...mapWaitingActions('user', [
            'fetchPreLoginPasswordInfo'
        ]),
        ...mapActions('user', [
            'passwordChange'
        ]),
        strengthMeterScoreUpdate (score) {
            this.passwordStrengthScore = score
        },
        async changePasswordAction () {
            this.v$.$touch()
            if (this.v$.$errors.length === 0) {
                return this.passwordChange({
                    new_password: this.newPassword
                })
            }
        },
        formatValidationGuidelines (validationRulesObject) {
            const guidelines = []
            for (const rule in validationRulesObject) {
                switch (rule) {
                case 'min_length':
                    guidelines.push(`Minimum ${validationRulesObject[rule]} characters long.`)
                    break
                case 'max_length':
                    guidelines.push(`Maximum ${validationRulesObject[rule]} characters long.`)
                    break
                case 'musthave_digit':
                    guidelines.push(`Contains a minimum of ${validationRulesObject[rule]} digits.`)
                    break
                case 'musthave_lowercase':
                    guidelines.push(`Contains a minimum of ${validationRulesObject[rule]} lowercases.`)
                    break
                case 'musthave_specialchar':
                    guidelines.push(`Contains a minimum of ${validationRulesObject[rule]} special characters.`)
                    break
                case 'musthave_uppercase':
                    guidelines.push(`Contains a minimum of ${validationRulesObject[rule]} uppercases.`)
                    break
                default:
                }
            }

            return guidelines
        },
        redirectToLogin () {
            this.$router.push({ path: PATH_LOGIN })
        }
    }
}
</script>
