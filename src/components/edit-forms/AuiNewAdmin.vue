<template>
    <aui-reseller-form
        layout="4-8"
        dense-list
        data-cy="aui-select-reseller"
        :reseller="reseller"
        :reseller-id-acl="resellerIdAcl && !resellerId"
        :reseller-id="formData.reseller_id"
        :reseller-id-error="resellerIdHasError"
        :reseller-id-error-message="resellerIdGetError"
        @update:model-value="resellerIdUpdate"
    >
        <slot
            name="actions"
            :loading="loading"
            :has-unsaved-data="hasUnsavedData"
            :has-invalid-data="hasInvalidData"
            :reset="reset"
            :submit="submit"
        />
        <q-banner
            v-if="error"
            dense
            inline-actions
            class="text-white bg-negative q-mb-lg"
            transition-show="fade"
            transition-hide="fade"
        >
            {{ errorMessage }}
            <template
                #avatar
            >
                <q-icon
                    name="error"
                    color="white"
                />
            </template>
        </q-banner>
        <template
            #col-1
        >
            <aui-base-form-field
                v-if="aclField('login')"
                required
            >
                <q-input
                    v-model.trim="formData.login"
                    clearable
                    dense
                    :label="$t('Login')"
                    data-cy="login-field"
                    autocomplete="none"
                    :disable="loading"
                    :error="hasFieldError('login')"
                    :error-message="getFieldError('login')"
                    @keyup.enter="submit"
                >
                    <template
                        #prepend
                    >
                        <q-icon
                            name="fas fa-user-cog"
                        />
                    </template>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field
                v-if="aclField('auth_mode')"
                required
            >
                <q-select
                    v-model="formData.auth_mode"
                    :options="authModeOptions"
                    dense
                    emit-value
                    map-options
                    :label="$t('Authentication Mode')"
                    data-cy="auth-mode-field"
                    :disable="loading"
                    :error="hasFieldError('auth_mode')"
                    :error-message="getFieldError('auth_mode')"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="aclField('email')"
            >
                <q-input
                    v-model.trim="formData.email"
                    clearable
                    dense
                    :label="$t('Email')"
                    data-cy="email-field"
                    autocomplete="none"
                    :disable="loading"
                    :error="hasFieldError('email')"
                    :error-message="getFieldError('email')"
                    @keyup.enter="submit"
                >
                    <template
                        #prepend
                    >
                        <q-icon
                            name="email"
                        />
                    </template>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field
                v-if="aclField('role')"
                required
            >
                <q-select
                    v-model="formData.role"
                    :options="filteredAdminRolesList"
                    emit-value
                    map-options
                    dense
                    :label="$t('Role')"
                    data-cy="roles-list"
                    :disable="loading"
                    :error="hasFieldError('role')"
                    :error-message="getFieldError('role')"
                >
                    <template
                        #prepend
                    >
                        <q-icon
                            name="fas fa-user-shield"
                        />
                    </template>
                </q-select>
            </aui-base-form-field>
            <aui-base-form-field
                v-if="enablePassword && aclField('password')"
                required
            >
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
                <aui-input-scored-password
                    v-model.trim="formData.password"
                    dense
                    clearable
                    autocomplete="new-password"
                    :label="$t('Password')"
                    data-cy="password-field"
                    :show-password="false"
                    :disable="loading"
                    :error="hasFieldError('password')"
                    :error-message="getFieldError('password')"
                    @blur="validateField('password')"
                    @score="strengthMeterScoreUpdate"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="enablePassword && aclField('password')"
                class="q-mb-lg"
                required
            >
                <q-input
                    ref="passwordRetypeInput"
                    v-model.trim="passwordRetype"
                    clearable
                    icon="lock"
                    dense
                    :label="$t('Password Retype')"
                    data-cy="password-retype-field"
                    type="password"
                    autocomplete="new-password"
                    :disable="loading"
                    :error="v$.passwordRetype && v$.passwordRetype.$errors.length > 0"
                    :error-message="$errMsg(v$.passwordRetype.$errors)"
                    @keyup.enter="submit"
                >
                    <template #prepend>
                        <q-icon
                            name="lock"
                            color="primary"
                        />
                    </template>
                </q-input>
            </aui-base-form-field>
        </template>
        <template
            #col-2
        >
            <aui-base-form-field
                v-if="aclField('is_master')"
            >
                <q-toggle
                    v-model="formData.is_master"
                    :label="$t('Master')"
                    data-cy="master-flag"
                    :disable="disableIsMaster || loading"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="aclField('is_active')"
            >
                <q-toggle
                    v-model="formData.is_active"
                    :label="$t('Active')"
                    data-cy="active-flag"
                    :disable="loading"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="aclField('enable_2fa')"
            >
                <q-toggle
                    v-model="formData.enable_2fa"
                    :label="$t('Two-Factor Authentication')"
                    data-cy="enable-2fa-flag"
                    :disable="disableIsLawfulIntercept || loading"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="aclField('read_only')"
            >
                <q-toggle
                    v-model="formData.read_only"
                    :label="$t('Read Only')"
                    data-cy="readonly-flag"
                    :disable="loading"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="aclField('show_passwords')"
            >
                <q-toggle
                    v-model="formData.show_passwords"
                    :label="$t('Show Passwords')"
                    data-cy="show-password-flag"
                    :disable="disableIsLawfulIntercept || loading"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="aclField('can_reset_password')"
            >
                <q-toggle
                    v-model="formData.can_reset_password"
                    :label="$t('Can Reset Password')"
                    data-cy="can-reset-password-flag"
                    :disable="loading"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="aclField('call_data')"
            >
                <q-toggle
                    v-model="formData.call_data"
                    :label="$t('Show CDRs')"
                    data-cy="show-cdrs-flag"
                    :disable="disableIsLawfulIntercept || loading"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="aclField('billing_data')"
            >
                <q-toggle
                    v-model="formData.billing_data"
                    :label="$t('Show Billing Info')"
                    data-cy="show-billing-info-flag"
                    :disable="disableIsLawfulIntercept || loading"
                />
            </aui-base-form-field>
        </template>
    </aui-reseller-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    email, maxLength, minLength,
    required
} from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiResellerForm from 'components/edit-forms/AuiResellerForm'
import AuiInputScoredPassword from 'components/input/AuiInputScoredPassword'
import resellerFormMixin from 'src/mixins/reseller-form'
import { mapGetters, mapState } from 'vuex'

export default {
    name: 'AuiNewAdmin',
    components: {
        AuiResellerForm,
        AuiBaseFormField,
        AuiInputScoredPassword
    },
    mixins: [resellerFormMixin],
    props: {
        reseller: {
            type: Object,
            default: null
        },
        resellerId: {
            type: Number,
            default: null
        },
        enablePassword: {
            type: Boolean,
            default: true
        },
        error: {
            type: Boolean,
            default: false
        },
        errorMessage: {
            type: String,
            default: ''
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            v$: useValidate(),
            passwordStrengthScore: null,
            passwordRetype: '',
            messages: []
        }
    },
    validations () {
        return {
            formData: {
                ...(this.aclField('reseller_id')
                    ? {
                        reseller_id: {
                            required
                        }
                    }
                    : {}
                ),
                ...(this.aclField('login')
                    ? {
                        login: {
                            required
                        }
                    }
                    : {}
                ),
                ...(this.aclField('email')
                    ? {
                        email: {
                            email
                        }
                    }
                    : {}
                ),
                ...(this.aclField('role')
                    ? {
                        role: {
                            required
                        }
                    }
                    : {}
                ),
                role: {
                    required
                },
                ...((this.enablePassword && this.aclField('password'))
                    ? { password: this.getPasswordValidations() }
                    : {})
            },
            ...((this.enablePassword && this.aclField('password'))
                ? {
                    passwordRetype: {
                        required,
                        sameAsPassword (val) {
                            return val === this.formData.password
                        }
                    }
                }
                : {}
            )
        }
    },
    computed: {
        ...mapState('user', [
            'user'
        ]),
        ...mapGetters('administrators', [
            'filteredAdminRolesList',
            'authModeOptions'
        ]),
        ...mapGetters('user', [
            'passwordRequirements'
        ]),
        aclEntity () {
            return 'admins'
        },
        initialResellerOption () {
            if (this.reseller) {
                return {
                    label: this.reseller.name,
                    value: this.reseller.id
                }
            }
            return null
        },
        getDefaultData () {
            return {
                reseller_id: null,
                login: '',
                auth_mode: 'local',
                email: '',
                is_active: true,
                enable_2fa: false,
                role: 'admin',
                call_data: true,
                read_only: false,
                billing_data: true,
                show_passwords: true,
                is_master: false,
                can_reset_password: false,
                ...(this.enablePassword
                    ? { password: '' }
                    : {}
                )
            }
        },
        disableIsMaster () {
            const rolesToDisable = ['system', 'ccareadmin', 'ccare', 'lintercept']
            return rolesToDisable.includes(this.formData.role)
        },
        disableIsLawfulIntercept () {
            return this.formData.role === 'lintercept'
        }
    },
    watch: {
        'formData.role' (role) {
            if (role === 'system') {
                this.formData.is_master = true
            }

            // These roles cannot be master
            if (['ccareadmin', 'ccare', 'lintercept'].includes(role)) {
                this.formData.is_master = false
            }

            if (role === 'lintercept') {
                this.formData.enable_2fa = false
                this.formData.show_passwords = false
                this.formData.call_data = false
                this.formData.billing_data = false
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
                    maxLength: maxLength(this.passwordRequirements.max_length),
                    minLength: minLength(this.passwordRequirements.min_length),
                    passwordDigits () {
                        const digitPattern = /\d/g
                        return (this.formData.password.match(digitPattern) || []).length >= this.passwordRequirements.musthave_digit
                    },
                    passwordLowercase () {
                        const lowercasePattern = /[a-z]/g
                        return (this.formData.password.match(lowercasePattern) || []).length >= this.passwordRequirements.musthave_lowercase
                    },
                    passwordUppercase () {
                        const uppercasePattern = /[A-Z]/g
                        return (this.formData.password.match(uppercasePattern) || []).length >= this.passwordRequirements.musthave_uppercase
                    },
                    passwordChars () {
                        const specialCharPattern = /[\W_]/g
                        return (this.formData.password.match(specialCharPattern) || []).length >= this.passwordRequirements.musthave_specialchar
                    },
                    passwordStrength () {
                        return this.passwordStrengthScore >= 3
                    }
                }
            }

            return { required }
        },
        strengthMeterScoreUpdate (score) {
            this.passwordStrengthScore = score
        },
        prepareSubmitData (submitData) {
            if (submitData.email === '') {
                submitData.email = null
            }

            // Remove derived role flags that are calculated on the backend
            const derivedRoleFields = ['is_ccare', 'is_superuser', 'is_system', 'lawful_intercept']
            const sanitizedData = { ...submitData }

            derivedRoleFields.forEach((field) => {
                delete sanitizedData[field]
            })

            return sanitizedData
        }
    }
}
</script>
