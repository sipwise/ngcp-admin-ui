<template>
    <q-form>
        <q-list
            dense
        >
            <q-item>
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
                        type="password"
                        autocomplete="new-password"
                        :disable="loading"
                        :error="$v.password.$error"
                        :error-message="$errMsg($v.password)"
                        @blur="$v.password.$touch()"
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
                        :error="$v.passwordRetype.$error"
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
    </q-form>
</template>

<script>
import {
    required
} from 'vuelidate/lib/validators'
import AuiInputScoredPassword from 'components/input/AuiInputScoredPassword'
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
    data () {
        return {
            password: '',
            passwordRetype: '',
            passwordScored: '',
            passwordStrengthScore: null
        }
    },
    validations: {
        password: {
            required,
            passwordStrength () {
                return this.passwordStrengthScore >= 2
            }
        },
        passwordRetype: {
            required,
            sameAsPassword (val) {
                return val === this.password
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
    methods: {
        strengthMeterScoreUpdate (score) {
            this.passwordStrengthScore = score
        },
        submit () {
            this.$v.$touch()
            if (this.$v.$invalid) {
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
