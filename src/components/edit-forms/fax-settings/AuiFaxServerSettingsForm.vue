<template>
    <aui-base-form
        layout="12"
        dense-list
    >
        <template
            #col-1
        >
            <aui-form-field-group-headline
                icon="fax"
                :headline="$t('Fax server Settings')"
            />
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.active"
                    :label="$t('Active')"
                    :error="false"
                    :disable="loading"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model="formData.name"
                    :label="$t('Name in fax header')"
                    :error="false"
                    :disable="loading"
                    dense
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.t38"
                    :label="$t('T38')"
                    :error="false"
                    :disable="loading"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.ecm"
                    :label="$t('ECM')"
                    :error="false"
                    :disable="loading"
                />
            </aui-base-form-field>
            <q-item
                v-for="(destination, index) in formData.destinations"
                :key="index + '-destination'"
            >
                <q-item-section>
                    <aui-fax-server-settings-destination-input
                        :key="index + 'destination-input'"
                        :value="destination"
                        :loading="loading"
                        class="q-mt-md"
                        @input="updateDestination(index, $event)"
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
                        :disable="loading"
                        @click="removeDestination(index)"
                    />
                </q-item-section>
            </q-item>
            <aui-base-form-field
                class="q-mt-md"
            >
                <q-btn
                    :label="$t('Add destination')"
                    color="primary"
                    unelevated
                    :disable="loading"
                    @click="addDestination"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>
<script>
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiBaseFormField from 'components/AuiBaseFormField'
import baseFormMixin from 'src/mixins/base-form'
import AuiFormFieldGroupHeadline from 'components/AuiFormFieldGroupHeadline'
import AuiFaxServerSettingsDestinationInput from 'components/edit-forms/fax-settings/AuiFaxServerSettingsDestinationInput'
export default {
    name: 'AuiFaxServerSettingsForm',
    components: { AuiFaxServerSettingsDestinationInput, AuiFormFieldGroupHeadline, AuiBaseFormField, AuiBaseForm },
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
                name: null,
                active: false,
                t38: false,
                ecm: false,
                destinations: []
            }
        },
        isActive () {
            return this.formData.active === true
        }
    },
    methods: {
        prepareSubmitData (data) {
            data.id = this.subscriberId
            return data
        },
        addDestination () {
            if (!this.formData.destinations) {
                this.formData.destinations = []
            }
            this.formData.destinations.push(this.getDefaultDestination())
        },
        updateDestination (index, destination) {
            this.$set(this.formData.destinations, index, destination)
        },
        removeDestination (index) {
            this.formData.destinations.splice(index, 1)
        },
        getDefaultDestination () {
            return {
                destination: '',
                filetype: null,
                outgoing: false,
                incoming: false,
                status: false
            }
        }
    }
}
</script>
