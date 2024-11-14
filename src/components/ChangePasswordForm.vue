<template>
    <q-form>
        <q-list
            dense
        >
            <q-item>
                <q-tooltip v-if="messages.length > 0">
                    <div class="tooltip-message q-pa-md text-body2">
                        Password requirements:
                        <q-item
                            v-for="(message, index) in messages"
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
                </q-tooltip>
                <q-item-section>
                    <aui-input-scored-password
                        ref="passwordInput"
                        v-model.trim="password"
                        clearable
                        icon="lock"
                        dense
                        class="aui-required"
                        :label="$t('Password')"
                        data-cy="password-input"
                        autocomplete="new-password"
                        :show-password="false"
                        :disable="loading"
                        :error="v$.password.$errors.length > 0"
                        :error-message="$errMsg(v$.password.$errors)"
                        @blur="v$.password.$touch()"
                        @keyup.enter="submit"
                        @score="strengthMeterScoreUpdate"
                    />
                </q-item-section>
            </q-item>
            <q-item
                class="q-mb-lg"
            >
                <q-item-section>
                    <q-input
                        ref="passwordRetypeInput"
                        v-model.trim="passwordRetype"
                        clearable
                        icon="lock"
                        dense
                        class="aui-required"
                        :label="$t('Password Retype')"
                        data-cy="password-retype-input"
                        type="password"
                        autocomplete="new-password"
                        :disable="loading"
                        :error="v$.passwordRetype.$errors.length > 0"
                        :error-message="$errMsg(v$.passwordRetype.$errors)"
                        @blur="v$.passwordRetype.$touch()"
                        @keyup.enter="submit"
                    >
                        <template #prepend>
                            <q-icon name="lock" />
                        </template>
                    </q-input>
                </q-item-section>
            </q-item>
        </q-list>
    </q-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import { maxLength, minLength, required } from '@vuelidate/validators'
import AuiInputScoredPassword from 'components/input/AuiInputScoredPassword'
import { mapGetters } from 'vuex'
export default {
    name: 'ChangePasswordForm',
    components: {
        AuiInputScoredPassword
    },
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    },
    emits: ['validation-failed', 'validation-succeeded'],
    data () {
        return {
            v$: useValidate(),
            password: '',
            passwordRetype: '',
            passwordScored: '',
            passwordStrengthScore: null,
            messages: []
        }
    },
    computed: {
        ...mapGetters('user', [
            'passwordRequirements'
        ])
    },
    validations () {
        return {
            password: this.getPasswordValidations(),
            passwordRetype: {
                required,
                sameAsPassword (val) {
                    return val === this.password
                }
            }
        }
    },
    watch: {
        password (value) {
            if (value === null || value === undefined) {
                this.passwordScored = ''
            } else {
                this.passwordScored = value
            }
        }
    },
    async mounted () {
        this.messages = this.getPasswordRequirementsMessages()
    },
    methods: {
        getPasswordRequirementsMessages () {
            if (!this.passwordRequirements?.web_validate) {
                return []
            }

            const lengthMessage = this.passwordRequirements.min_length > 0
                ? `must be between ${this.passwordRequirements.min_length} and ${this.passwordRequirements.max_length} characters long`
                : null
            const digitsMessage = this.passwordRequirements.musthave_digit > 0
                ? `must contain at least ${this.passwordRequirements.musthave_digit} digits`
                : null
            const lowercaseMessage = this.passwordRequirements.musthave_lowercase > 0
                ? `must contain at least ${this.passwordRequirements.musthave_lowercase} lowercase`
                : null
            const uppercaseReq = this.passwordRequirements.musthave_uppercase > 0
                ? `must contain at least ${this.passwordRequirements.musthave_uppercase} uppercase`
                : null
            const specialCharReq = this.passwordRequirements.musthave_specialchar > 0
                ? `must contain at least ${this.passwordRequirements.musthave_specialchar} special characters`
                : null

            return [lengthMessage, digitsMessage, lowercaseMessage, uppercaseReq, specialCharReq].filter((message) => message !== null)
        },
        getPasswordValidations () {
            if (this.passwordRequirements?.web_validate) {
                return {
                    required,
                    passwordMaxLength: maxLength(this.passwordRequirements.max_length),
                    passwordMinLength: minLength(this.passwordRequirements.min_length),
                    passwordDigits () {
                        const digitPattern = /\d/g
                        return (this.password.match(digitPattern) || []).length >= this.passwordRequirements.musthave_digit
                    },
                    passwordLowercase () {
                        const lowercasePattern = /[a-z]/g
                        return (this.password.match(lowercasePattern) || []).length >= this.passwordRequirements.musthave_lowercase
                    },
                    passwordUppercase () {
                        const uppercasePattern = /[A-Z]/g
                        return (this.password.match(uppercasePattern) || []).length >= this.passwordRequirements.musthave_uppercase
                    },
                    passwordChars () {
                        const specialCharPattern = /[\W_]/g
                        return (this.password.match(specialCharPattern) || []).length >= this.passwordRequirements.musthave_specialchar
                    },
                    passwordStrength () {
                        return this.passwordStrengthScore >= 2
                    }
                }
            }

            return { required }
        },
        strengthMeterScoreUpdate (score) {
            this.passwordStrengthScore = score
        },
        submit () {
            this.v$.$touch()
            if (this.v$.$invalid) {
                this.$emit('validation-failed')
            } else {
                this.$emit('validation-succeeded', {
                    password: this.password,
                    strengthScore: this.passwordStrengthScore
                })
            }
        }
    }
}
</script>
