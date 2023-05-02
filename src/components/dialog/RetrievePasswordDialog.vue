<template>
    <base-dialog
        title-icon="vpn_key"
        :title="$t('Forgot password?')"
        v-bind="$attrs"
        @update:model-value="$emit('input')"
        @hide="resetForm()"
    >
        <template
            #content
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
                            data-cy="input-username"
                            type="text"
                            :error="v$.username.$errors.length > 0"
                            :error-message="$errMsg(v$.username.$errors)"
                            @blur="v$.username.$touch()"
                        >
                            <template
                                #prepend
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
            #actions
        >
            <q-btn
                icon="check"
                unelevated
                color="primary"
                :label="$t('Send')"
                data-cy="button-send"
                :loading="newPasswordRequesting"
                :disable="!username || username.length < 1 || newPasswordRequesting"
                @click="submit()"
            />
        </template>
    </base-dialog>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    required
} from '@vuelidate/validators'
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
    emits: ['input', 'close'],
    data () {
        return {
            v$: useValidate(),
            username: ''
        }
    },
    validations () {
        return {
            username: {
                required
            }
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
            this.v$.$touch()
            if (!this.v$.$invalid) {
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
            this.v$.$reset()
            this.username = ''
        }
    }
}
</script>
