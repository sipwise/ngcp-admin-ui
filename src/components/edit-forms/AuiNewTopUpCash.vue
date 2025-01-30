<template>
    <aui-base-form
        layout="6"
        dense-list
    >
        <slot
            name="actions"
            :loading="loading"
            :has-unsaved-data="hasUnsavedData"
            :has-invalid-data="hasInvalidData"
            :reset="reset"
            :submit="submit"
        />
        <template
            #col-1
        >
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.amount"
                    clearable
                    dense
                    :label="$t('Amount')"
                    data-cy="top-up-amount"
                    :error="hasFieldError('amount')"
                    :error-message="getFieldError('amount')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
                <q-tooltip>
                    {{ $t('Amount in cents') }}
                </q-tooltip>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.request_token"
                    clearable
                    dense
                    :label="$t('Request token')"
                    data-cy="top-up-token"
                    :error="hasFieldError('request_token')"
                    :error-message="getFieldError('request_token')"
                    :disable="loading"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('Custom ID to identify the top-up request in the top-up log.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import { numeric, required } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
export default {
    name: 'AuiNewTopUpCash',
    components: {
        AuiBaseFormField,
        AuiBaseForm
    },
    mixins: [
        baseFormMixin,
        customerContextMixin
    ],
    methods: {
        getValidations () {
            return {
                amount: {
                    required,
                    numeric
                }
            }
        }
    }
}
</script>
