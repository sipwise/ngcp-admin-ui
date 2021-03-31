<template>
    <q-form
        ref="form"
        greedy
    >
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
                                :initial-option="initialResellerOption"
                                :disable="loading"
                                :error="$v.data.reseller_id && $v.data.reseller_id.$error"
                                :error-message="$errMsg($v.data.reseller_id)"
                                @input="emitInputEqual"
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
                                :label="$t('Login')"
                                autocomplete="none"
                                :disable="loading"
                                :error="$v.data.login && $v.data.login.$error"
                                :error-message="$errMsg($v.data.login)"
                                @blur="$v.data.login.$touch()"
                                @input="emitInputEqual"
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
                                @input="emitInputEqual"
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
                            <q-input
                                ref="passwordInput"
                                v-model.trim="data.password"
                                clearable
                                icon="lock"
                                dense
                                label="Password"
                                type="password"
                                autocomplete="new-password"
                                :disable="loading"
                                :error="$v.data.password && $v.data.password.$error"
                                :error-message="$errMsg($v.data.password)"
                                @blur="$v.data.password.$touch()"
                                @keyup.enter="submit"
                            >
                                <template
                                    v-slot:prepend
                                >
                                    <q-icon
                                        name="lock"
                                    />
                                </template>
                            </q-input>
                            <div
                                class="full-width"
                            >
                                <password-strength-meter
                                    v-model="data.password"
                                    class="q-psm"
                                    :strength-meter-only="true"
                                    @score="strengthMeterScoreUpdate"
                                />
                            </div>
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
                                label="Password Retype"
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
                                @input="emitInputEqual"
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
                                @input="emitInputEqual"
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
                                @input="emitInputEqual"
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
                                @input="emitInputEqual"
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
                                @input="emitInputEqual"
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
                                @input="emitInputEqual"
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
                                @input="emitInputEqual"
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
                                @input="emitInputEqual"
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
                                @input="emitInputEqual"
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
                                @input="emitInputEqual"
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
                                @input="emitInputEqual"
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>
    </q-form>
</template>

<script>
import _ from 'lodash'
import PasswordStrengthMeter from 'vue-password-strength-meter'
import {
    required,
    email
} from 'vuelidate/lib/validators'
import AuiSelectReseller from 'src/components/AuiSelectReseller'
import { mapWaitingActions } from 'vue-wait'
import { mapState } from 'vuex'
const defaultAdmin = {
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
    can_reset_password: false
}
export default {
    name: 'AuiNewAdmin',
    components: {
        AuiSelectReseller,
        PasswordStrengthMeter
    },
    props: {
        admin: {
            type: Object,
            default: () => {
                return defaultAdmin
            }
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
        let data = defaultAdmin
        if (this.admin !== undefined && this.admin !== null) {
            data = this.getAdminData()
        }
        return {
            passwordStrengthScore: null,
            passwordRetype: '',
            data: data
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
            if (this.admin.id) {
                return this.$aclCan('update', 'entity.admins.columns.password', this.admin, this.user)
            } else {
                return this.$aclCan('create', 'entity.admins.columns.password')
            }
        }
    },
    watch: {
        admin () {
            this.data = this.getAdminData()
            this.emitInputEqual()
        },
        email (value) {
            if (value === undefined || value === '') {
                this.data.email = null
                this.emitInputEqual()
            }
        }
    },
    methods: {
        ...mapWaitingActions('administrators', {
            createAdministrator: 'aui-administrator-create',
            updateAdministrator: 'aui-administrator-update'
        }),
        strengthMeterScoreUpdate (score) {
            this.passwordStrengthScore = score
        },
        async submit () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                if (this.admin && this.admin.id) {
                    await this.updateAdministrator({
                        resourceId: this.admin.id,
                        data: this.data
                    })
                } else {
                    await this.createAdministrator(this.data)
                }
                this.$emit('saved')
            }
        },
        reset () {
            this.data = this.getAdminData()
            this.emitInputEqual()
        },
        emitInputEqual () {
            this.$emit('input-equal', _.isEqual(this.getAdminData(), this.data))
        },
        getAdminData () {
            return {
                reseller_id: this.admin.reseller_id,
                login: this.admin.login,
                email: this.admin.email,
                is_active: this.admin.is_active,
                lawful_intercept: this.admin.lawful_intercept,
                call_data: this.admin.call_data,
                is_ccare: this.admin.is_ccare,
                is_superuser: this.admin.is_superuser,
                read_only: this.admin.read_only,
                billing_data: this.admin.billing_data,
                show_passwords: this.admin.show_passwords,
                is_master: this.admin.is_master,
                is_system: this.admin.is_system,
                can_reset_password: this.admin.can_reset_password
            }
        }
    }
}
</script>