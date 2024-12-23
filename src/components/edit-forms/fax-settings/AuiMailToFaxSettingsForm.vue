<template>
    <aui-base-form
        layout="12"
        dense-list
    >
        <template
            #col-1
        >
            <aui-form-field-group-headline
                icon="email"
                :headline="$t('Mail to Fax Settings')"
            />
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.active"
                    :label="$t('Active')"
                    data-cy="mailtofax-enable"
                    :error="false"
                    :disable="!canEdit || loading"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model="formData.secret_key"
                    :label="$t('Secret Key')"
                    data-cy="mailtofax-input-secret-key"
                    :error="false"
                    dense
                    :disable="!canEdit || loading"
                    @keyup.enter="submit"
                >
                    <q-tooltip
                        anchor="top middle"
                        self="center middle"
                    >
                        {{ $t('Enable strict mode that requires all mail2fax emails to have the secret key as the very first line of the email + an empty line. The key is removed from the email once matched') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model="formData.secret_key_renew"
                    :label="$t('Secret Key Renew Interval')"
                    data-cy="mailtofax-secret-key-renew-interval"
                    :error="false"
                    :options="secretKeyRenewOptions"
                    emit-value
                    map-options
                    dense
                    :disable="!canEdit || loading"
                >
                    <q-tooltip
                        anchor="top middle"
                        self="center middle"
                    >
                        {{ $t('Interval when the secret key is automatically renewed') }}
                    </q-tooltip>
                </q-select>
            </aui-base-form-field>
            <q-item
                v-for="(secretRenewNotify, index) in formData.secret_renew_notify"
                :key="index + '-notify'"
            >
                <q-item-section>
                    <aui-mail-to-fax-secret-key-notify-input
                        :value="secretRenewNotify"
                        :loading="loading"
                        @input="updateSecretRenewNotify(index, $event)"
                    />
                </q-item-section>
                <q-item-section
                    side
                >
                    <q-btn
                        color="negative"
                        unelevated
                        dense
                        icon="delete"
                        size="sm"
                        data-cy="secret-key-reniew-notify-delete"
                        :disable="!canEdit || loading"
                        @click="removeSecretRenewNotify(index)"
                    />
                </q-item-section>
            </q-item>
            <aui-base-form-field
                class="q-mt-md"
            >
                <q-btn
                    :label="$t('Add Secret Key Renew Notify')"
                    data-cy="secret-key-reniew-notify-add"
                    color="primary"
                    unelevated
                    :disable="!canEdit || loading"
                    @click="addSecretRenewNotify"
                />
            </aui-base-form-field>
            <q-item
                v-for="(acl, index) in formData.acl"
                :key="index + '-acl'"
                class="q-mt-md"
            >
                <q-item-section>
                    <aui-mail-to-fax-acl-input
                        :value="acl"
                        :loading="loading"
                        :disable="!canEdit"
                        @input="updateAcl(index, $event)"
                    />
                </q-item-section>
                <q-item-section
                    side
                >
                    <q-btn
                        color="negative"
                        unelevated
                        dense
                        icon="delete"
                        size="sm"
                        data-cy="acl-delete"
                        :disable="!canEdit || loading"
                        @click="removeAcl(index)"
                    />
                </q-item-section>
            </q-item>
            <aui-base-form-field
                class="q-mt-md"
            >
                <q-btn
                    :label="$t('Add ACL')"
                    data-cy="acl-add"
                    color="primary"
                    unelevated
                    :disable="!canEdit || loading"
                    @click="addAcl"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>
<script>
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiFormFieldGroupHeadline from 'components/AuiFormFieldGroupHeadline'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiMailToFaxAclInput from 'components/edit-forms/fax-settings/AuiMailToFaxAclInput'
import AuiMailToFaxSecretKeyNotifyInput from 'components/edit-forms/fax-settings/AuiMailToFaxSecretKeyNotifyInput'
import baseFormMixin from 'src/mixins/base-form'
export default {
    name: 'AuiMailToFaxSettingsForm',
    components: {
        AuiMailToFaxSecretKeyNotifyInput,
        AuiMailToFaxAclInput,
        AuiFormFieldGroupHeadline,
        AuiBaseFormField,
        AuiBaseForm
    },
    mixins: [baseFormMixin],
    props: {
        subscriberId: {
            type: [Number, String],
            required: true
        }
    },
    computed: {
        getDefaultData () {
            return {
                active: false,
                secret_key: null,
                secret_key_renew: null,
                secret_renew_notify: [],
                acl: []
            }
        },
        canEdit () {
            return this.$aclCan('update', 'entity.subscribers')
        },
        secretKeyRenewOptions () {
            return [
                {
                    value: 'never',
                    label: this.$t('Never')
                },
                {
                    value: 'daily',
                    label: this.$t('Daily')
                },
                {
                    value: 'weekly',
                    label: this.$t('Weekly')
                },
                {
                    value: 'monthly',
                    label: this.$t('Monthly')
                }
            ]
        }
    },
    methods: {
        prepareSubmitData (data) {
            data.id = this.subscriberId
            return data
        },
        addSecretRenewNotify () {
            this.formData.secret_renew_notify.push(this.getDefaultSecretRenewNotify())
        },
        updateSecretRenewNotify (index, value) {
            this.formData.secret_renew_notify[index] = value
        },
        removeSecretRenewNotify (index) {
            this.formData.secret_renew_notify.splice(index, 1)
        },
        getDefaultSecretRenewNotify () {
            return { destination: '' }
        },
        addAcl () {
            this.formData.acl.push(this.getDefaultAcl())
        },
        updateAcl (index, acl) {
            this.formData.acl[index] = acl
        },
        removeAcl (index) {
            this.formData.acl.splice(index, 1)
        },
        getDefaultAcl () {
            return {
                from_email: null,
                received_from: null,
                destination: null,
                use_regex: false
            }
        }
    }
}
</script>
