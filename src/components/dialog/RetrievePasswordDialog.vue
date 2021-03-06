<template>
    <base-dialog
        title-icon="vpn_key"
        :title="$t('Forgot password?')"
        v-bind="$attrs"
        v-on="$listeners"
        @input="$emit('input')"
        @hide="resetForm()"
    >
        <template
            v-slot:content
        >
            <q-form>
                <q-item>
                    <q-item-section>
                        <q-input
                            v-model.trim="username"
                            clearable
                            dense
                            class="aui-required"
                            :label="$t('Username')"
                            type="text"
                            :error="$v.username.$error"
                            :error-message="$errMsg($v.username)"
                            @blur="$v.username.$touch()"
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
            </q-form>
        </template>
        <template
            v-slot:actions
        >
            <q-btn
                icon="check"
                unelevated
                color="primary"
                :label="$t('Send')"
                :loading="newPasswordRequesting"
                :disable="!username || username.length < 1 || newPasswordRequesting"
                @click="submit()"
            />
        </template>
    </base-dialog>
</template>

<script>
import {
    required
} from 'vuelidate/lib/validators'
import {
    mapActions,
    mapState
} from 'vuex'
import BaseDialog from './BaseDialog'
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
export default {
    name: 'RetrievePasswordDialog',
    components: {
        BaseDialog
    },
    data () {
        return {
            username: ''
        }
    },
    validations: {
        username: {
            required
        }
    },
    computed: {
        ...mapState('user', [
            'newPasswordRequesting'
        ])
    },
    methods: {
        ...mapActions('user', [
            'passwordReset'
        ]),
        async submit () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                try {
                    const res = await this.passwordReset({
                        type: 'administrator',
                        username: this.username
                    })
                    showGlobalSuccessMessage(res.data.message)
                } catch (err) {
                    showGlobalErrorMessage(this.$t('There was an error, please retry later'))
                } finally {
                    this.$emit('close')
                }
            }
        },
        resetForm () {
            this.$v.$reset()
            this.username = ''
        }
    }
}
</script>
