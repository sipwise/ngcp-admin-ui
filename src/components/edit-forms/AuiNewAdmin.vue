<template>
    <q-form>
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
                v-slot:avatar
            >
                <q-icon
                    name="error"
                    color="white"
                />
            </template>
        </q-banner>
        <div
            class="row q-col-gutter-x-xl"
        >
            <div
                class="col-xs-12 col-md-5 col-lg-5"
            >
                <q-list
                    dense
                >
                    <q-item
                        v-if="$aclCan('update', 'entity.admins.columns.reseller_id') ||
                            $aclCan('update', 'entity.admins.columns.reseller_id', admin, user)"
                    >
                        <q-item-section>
                            <aui-select-reseller
                                v-model="data.reseller_id"
                                dense
                                class="aui-required"
                                :initial-option="initialResellerOption"
                                :disable="loading"
                                :error="$v.data.reseller_id && $v.data.reseller_id.$error"
                                :error-message="$errMsg($v.data.reseller_id)"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="$aclCan('update', 'entity.admins.columns.login') ||
                            $aclCan('update', 'entity.admins.columns.login', admin, user)"
                    >
                        <q-item-section>
                            <q-input
                                v-model.trim="data.login"
                                clearable
                                dense
                                class="aui-required"
                                :label="$t('Login')"
                                autocomplete="none"
                                :disable="loading"
                                :error="$v.data.login && $v.data.login.$error"
                                :error-message="$errMsg($v.data.login)"
                                @blur="$v.data.login.$touch()"
                                @keyup.enter="submit"
                            >
                                <template
                                    v-slot:prepend
                                >
                                    <q-icon
                                        name="fas fa-user-cog"
                                    />
                                </template>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="$aclCan('update', 'entity.admins.columns.email') ||
                            $aclCan('update', 'entity.admins.columns.email', admin, user)"
                    >
                        <q-item-section>
                            <q-input
                                v-model.trim="data.email"
                                clearable
                                dense
                                :label="$t('Email')"
                                autocomplete="none"
                                :disable="loading"
                                :error="$v.data.email && $v.data.email.$error"
                                :error-message="$errMsg($v.data.email)"
                                @blur="$v.data.email.$touch()"
                                @keyup.enter="submit"
                            >
                                <template
                                    v-slot:prepend
                                >
                                    <q-icon
                                        name="email"
                                    />
                                </template>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="enablePassword && passwordPermissions"
                    >
                        <q-item-section>
                            <aui-input-scored-password
                                v-model.trim="data.password"
                                dense
                                clearable
                                autocomplete="new-password"
                                class="aui-required"
                                :label="$t('Password')"
                                :disable="loading"
                                :error="$v.data.password && $v.data.password.$error"
                                :error-message="$errMsg($v.data.password)"
                                @blur="$v.data.password.$touch()"
                                @score="strengthMeterScoreUpdate"
                                @keyup.enter="submit"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="enablePassword && passwordPermissions"
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
                                type="password"
                                autocomplete="new-password"
                                :disable="loading"
                                :error="$v.passwordRetype && $v.passwordRetype.$error"
                                :error-message="$errMsg($v.passwordRetype)"
                                @blur="$v.passwordRetype.$touch()"
                                @keyup.enter="submit"
                            >
                                <template v-slot:prepend>
                                    <q-icon name="lock" />
                                </template>
                            </q-input>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
            <div
                class="col-xs-12 col-md-3 col-lg-3"
            >
                <q-list>
                    <q-item
                        v-if="$aclCan('update', 'entity.admins.columns.is_superuser') ||
                            $aclCan('update', 'entity.admins.columns.is_superuser', admin, user)"
                    >
                        <q-item-section>
                            <q-toggle
                                v-model="data.is_superuser"
                                dense
                                :label="$t('Superuser')"
                                :disable="loading"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="$aclCan('update', 'entity.admins.columns.is_master') ||
                            $aclCan('update', 'entity.admins.columns.is_master', admin, user)"
                    >
                        <q-item-section>
                            <q-toggle
                                v-model="data.is_master"
                                dense
                                :label="$t('Master')"
                                :disable="loading"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="$aclCan('update', 'entity.admins.columns.is_ccare') ||
                            $aclCan('update', 'entity.admins.columns.is_ccare', admin, user)"
                    >
                        <q-item-section>
                            <q-toggle
                                v-model="data.is_ccare"
                                dense
                                :label="$t('Customer Care')"
                                :disable="loading"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="$aclCan('update', 'entity.admins.columns.is_active') ||
                            $aclCan('update', 'entity.admins.columns.is_active', admin, user)"
                    >
                        <q-item-section>
                            <q-toggle
                                v-model="data.is_active"
                                dense
                                :label="$t('Active')"
                                :disable="loading"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="$aclCan('update', 'entity.admins.columns.read_only') ||
                            $aclCan('update', 'entity.admins.columns.read_only', admin, user)"
                    >
                        <q-item-section>
                            <q-toggle
                                v-model="data.read_only"
                                dense
                                :label="$t('Read Only')"
                                :disable="loading"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="$aclCan('update', 'entity.admins.columns.show_passwords') ||
                            $aclCan('update', 'entity.admins.columns.show_passwords', admin, user)"
                    >
                        <q-item-section>
                            <q-toggle
                                v-model="data.show_passwords"
                                dense
                                :label="$t('Show Passwords')"
                                :disable="loading"
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
            <div
                class="col-xs-12 col-md-4 col-lg-4"
            >
                <q-list>
                    <q-item
                        v-if="$aclCan('update', 'entity.admins.columns.can_reset_password') ||
                            $aclCan('update', 'entity.admins.columns.can_reset_password', admin, user)"
                    >
                        <q-item-section>
                            <q-toggle
                                v-model="data.can_reset_password"
                                dense
                                :label="$t('Can Reset Password')"
                                :disable="loading"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="$aclCan('update', 'entity.admins.columns.call_data') ||
                            $aclCan('update', 'entity.admins.columns.call_data', admin, user)"
                    >
                        <q-item-section>
                            <q-toggle
                                v-model="data.call_data"
                                dense
                                :label="$t('Show CDRs')"
                                :disable="loading"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="$aclCan('update', 'entity.admins.columns.billing_data') ||
                            $aclCan('update', 'entity.admins.columns.billing_data', admin, user)"
                    >
                        <q-item-section>
                            <q-toggle
                                v-model="data.billing_data"
                                dense
                                :label="$t('Show Billing Info')"
                                :disable="loading"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="$aclCan('update', 'entity.admins.columns.lawful_intercept') ||
                            $aclCan('update', 'entity.admins.columns.lawful_intercept', admin, user)"
                    >
                        <q-item-section>
                            <q-toggle
                                v-model="data.lawful_intercept"
                                dense
                                :label="$t('Lawful Intercept')"
                                :disable="loading"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="$aclCan('update', 'entity.admins.columns.is_system') ||
                            $aclCan('update', 'entity.admins.columns.is_system', admin, user)"
                    >
                        <q-item-section>
                            <q-toggle
                                v-model="data.is_system"
                                dense
                                :label="$t('System')"
                                :disable="loading"
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>
    </q-form>
</template>

<script>
import {
    required,
    email
} from 'vuelidate/lib/validators'
import AuiSelectReseller from 'src/components/AuiSelectReseller'
import { mapState } from 'vuex'
import _ from 'lodash'
import AuiInputScoredPassword from 'components/input/AuiInputScoredPassword'

export default {
    name: 'AuiNewAdmin',
    components: {
        AuiInputScoredPassword,
        AuiSelectReseller
    },
    props: {
        admin: {
            type: Object,
            default: null
        },
        reseller: {
            type: Object,
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
            passwordStrengthScore: null,
            passwordRetype: '',
            data: this.getDynamicData(this.admin)
        }
    },
    validations () {
        const validations = {
            data: {}
        }
        const fields = Object.entries({
            reseller_id: {
                required
            },
            login: {
                required
            },
            email: {
                email
            }
        })
        for (let i = 0; i < fields.length; i++) {
            if (this.$aclCan('update', 'entity.admins.columns.' + fields[i][0])) {
                validations.data[fields[i][0]] = fields[i][1]
            }
        }
        if (this.enablePassword && this.passwordPermissions) {
            validations.data.password = {
                required,
                passwordStrength () {
                    return this.passwordStrengthScore >= 2
                }
            }
            validations.passwordRetype = {
                required,
                sameAsPassword (val) {
                    return val === this.data.password
                }
            }
        }
        return validations
    },
    computed: {
        ...mapState('user', [
            'user'
        ]),
        email () {
            return this.data.email
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
        passwordPermissions () {
            if (this.admin && this.admin.id) {
                return this.$aclCan('update', 'entity.admins.columns.password', this.admin, this.user)
            } else {
                return this.$aclCan('create', 'entity.admins.columns.password')
            }
        },
        hasUnsavedData () {
            const initialData = this.getDynamicData(this.admin)
            const currentData = this.getDynamicData(this.data)
            return !_.isEqual(initialData, currentData)
        }
    },
    watch: {
        admin (newAdmin) {
            this.data = this.getDynamicData(newAdmin)
        },
        hasUnsavedData (value) {
            this.$emit('has-unsaved-data', value)
            this.$parent.$emit('form-has-unsaved-data', value)
        }
    },
    methods: {
        strengthMeterScoreUpdate (score) {
            this.passwordStrengthScore = score
        },
        submit () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                const data = {
                    ...this.data
                }
                if (this.admin) {
                    data.id = this.admin.id
                }
                this.$emit('input', data)
                this.$parent.$emit('form-input', data)
            }
        },
        reset () {
            this.data = this.getDynamicData(this.admin)
            this.$v.$reset()
        },
        getDynamicData (data) {
            if (data) {
                return {
                    reseller_id: data.reseller_id,
                    login: data.login,
                    email: data.email,
                    is_active: data.is_active,
                    lawful_intercept: data.lawful_intercept,
                    call_data: data.call_data,
                    is_ccare: data.is_ccare,
                    is_superuser: data.is_superuser,
                    read_only: data.read_only,
                    billing_data: data.billing_data,
                    show_passwords: data.show_passwords,
                    is_master: data.is_master,
                    is_system: data.is_system,
                    can_reset_password: data.can_reset_password
                }
            } else {
                const conditionalData = {}
                if (this.enablePassword) {
                    conditionalData.password = ''
                }
                return {
                    reseller_id: null,
                    login: '',
                    email: '',
                    is_active: true,
                    lawful_intercept: false,
                    call_data: true,
                    is_ccare: false,
                    is_superuser: false,
                    read_only: false,
                    billing_data: true,
                    show_passwords: true,
                    is_master: false,
                    is_system: false,
                    can_reset_password: false,
                    ...conditionalData
                }
            }
        }
    }
}
</script>
