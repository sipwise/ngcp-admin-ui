<template>
    <aui-base-form
        layout="6-6"
        dense-list
    >
        <slot
            v-if="canEdit"
            name="actions"
            :loading="loading"
            :has-unsaved-data="hasUnsavedData"
            :has-invalid-data="hasInvalidData"
            :reset="reset"
            :submit="submit"
        />
        <template #col-1>
            <q-item-label
                header
                class="text-uppercase"
            >
                <q-icon
                    name="fas fa-file-alt"
                    size="sm"
                    class="q-mr-sm"
                />
                {{ $t('Main settings') }}
            </q-item-label>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model="formData.pin"
                    :disable="!canEdit || loading"
                    :label="$t('PIN')"
                    data-cy="subscriber-pin"
                    :error="v$.formData.pin.$errors.length > 0"
                    :error-message="$errMsg(v$.formData.pin.$errors)"
                    dense
                    @keypress.space.prevent
                    @keydown.space.prevent
                    @keyup.space.prevent
                    @keyup.enter="submit"
                >
                    <template #prepend>
                        <q-icon name="lock" />
                    </template>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model="formData.email"
                    :disable="!canEdit || loading"
                    :label="$t('Email')"
                    data-cy="subscriber-email"
                    :error="v$.formData.email.$errors.length > 0"
                    :error-message="$errMsg(v$.formData.email.$errors)"
                    dense
                    @keypress.space.prevent
                    @keydown.space.prevent
                    @keyup.space.prevent
                    @keyup.enter="submit"
                >
                    <template #prepend>
                        <q-icon name="email" />
                    </template>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model="formData.sms_number"
                    :disable="!canEdit || loading"
                    :label="$t('SMS number')"
                    data-cy="subscriber-sms-number"
                    :error="v$.formData.sms_number.$errors.length > 0"
                    :error-message="$errMsg(v$.formData.sms_number.$errors)"
                    dense
                    @keypress.space.prevent
                    @keydown.space.prevent
                    @keyup.space.prevent
                    @keyup.enter="submit"
                >
                    <template #prepend>
                        <q-icon name="fas fa-sms" />
                    </template>
                    <q-tooltip>
                        {{ $t('The E164 number in format &lt;cc&gt;&lt;ac&gt;&lt;sn&gt; to send voicemail notification SMS.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.attach"
                    :disable="!canEdit || loading"
                    :label="$t('Attach voicemail to email notification')"
                    data-cy="subscriber-attach-notification"
                    dense
                    checked-icon="attach_file"
                    unchecked-icon="attach_file"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.delete"
                    :disable="!canEdit || loading || !formData.attach"
                    :label="$t('Delete voicemail after email notification is delivered')"
                    data-cy="subscriber-delete-after-delivery"
                    dense
                    checked-icon="delete"
                    unchecked-icon="delete"
                />
            </aui-base-form-field>
        </template>
        <template #col-2>
            <q-item-label
                header
                class="text-uppercase"
            >
                <q-icon
                    name="fas fa-music"
                    size="sm"
                    class="q-mr-sm"
                />
                {{ $t('Voicemail Greetings') }}
            </q-item-label>
            <aui-base-form-field
                class="no-padding"
            >
                <aui-subscriber-voicemail-greetings
                    :subscriber-id="subscriberId"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    email,
    maxLength,
    numeric,
    required
} from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiSubscriberVoicemailGreetings from 'components/AuiSubscriberVoicemailGreetings'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'

export default {
    name: 'AuiSubscriberVoicemailSettingsForm',
    components: { AuiBaseFormField, AuiSubscriberVoicemailGreetings, AuiBaseForm },
    mixins: [baseFormMixin],
    props: {
        subscriberId: {
            type: Number,
            required: true
        }
    },
    data () {
        return {
            v$: useValidate()
        }
    },
    validations () {
        return {
            formData: {
                pin: {
                    required,
                    maxLength: maxLength(64),
                    numeric
                },
                email: {
                    email
                },
                sms_number: {
                    numeric
                }
            }
        }
    },
    computed: {
        canEdit () {
            return this.$aclCan('update', 'entity.subscribers')
        },
        getInitialData () {
            return {
                pin: this.initialFormData?.pin || null,
                email: this.initialFormData?.email || null,
                sms_number: this.initialFormData?.sms_number || null,
                attach: this.initialFormData?.attach ?? true,
                delete: this.initialFormData?.delete ?? false
            }
        }
    },
    watch: {
        'formData.attach' (newValue) {
            if (!newValue) {
                this.formData.delete = false
            }
        }
    }
}
</script>
