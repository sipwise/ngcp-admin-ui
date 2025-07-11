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
            :submit="validateAndSubmit"
        />
        <template #col-1>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.name"
                    clearable
                    dense
                    :disable="loading"
                    :label="$t('Name')"
                    data-cy="aui-create-destination-name"
                    :error="hasFieldError('name')"
                    :error-message="getFieldError('name')"
                    @keyup.enter="validateAndSubmit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <template
                    v-if="formData?.destinations?.length > 0"
                >
                    <q-item
                        v-for="(destinationItem, index) in formData.destinations"
                        :key="index"
                        class="green-border"
                    >
                        <q-item-section>
                            <q-select
                                v-model="destinationItem.destination"
                                dense
                                :label="$t('Destination Type')"
                                data-cy="aui-create-destination-type"
                                :options="destinationTypeOptions"
                                map-options
                                emit-value
                                :disable="loading"
                                :error="v$.$error && v$.formData.destinations.$each.$response.$errors[index].destination.length > 0"
                                :error-message="$errMsg(v$.formData.destinations.$each.$response.$errors[index].destination)"
                            />
                            <q-input
                                v-if="destinationItem.destination == 'uri'"
                                v-model="destinationItem.simple_destination"
                                clearable
                                required
                                dense
                                :disable="loading"
                                :error="v$.$error && v$.formData.destinations.$each.$response.$errors[index].simple_destination.length > 0"
                                :error-message="$errMsg(v$.formData.destinations.$each.$response.$errors[index].simple_destination)"
                                :label="$t('URI/Number')"
                                data-cy="aui-create-destination-number"
                                @keyup.enter="validateAndSubmit"
                            />
                            <q-input
                                v-model="destinationItem.timeout"
                                clearable
                                dense
                                :disable="loading"
                                :label="$t('for(seconds)')"
                                data-cy="aui-create-destination-duration"
                                :error="false"
                                @keyup.enter="validateAndSubmit"
                            />
                            <q-input
                                v-model="destinationItem.priority"
                                clearable
                                dense
                                :disable="loading"
                                :label="$t('Priority')"
                                data-cy="aui-create-destination-priority"
                                :error="false"
                                @keyup.enter="validateAndSubmit"
                            />
                            <q-select
                                v-if="destinationItem.destination === 'sip:custom-hours@app.local'"
                                v-model="destinationItem.announcement_id"
                                dense
                                :error="false"
                                :label="$t('Custom announcement')"
                                data-cy="aui-create-destination-custom-announcement"
                                :options="annoucementId"
                                map-options
                                emit-value
                                :disable="loading"
                            />
                        </q-item-section>
                        <q-item-section
                            side
                        >
                            <q-btn
                                v-if="index > 0"
                                color="negative"
                                unelevated
                                dense
                                icon="delete"
                                size="sm"
                                :disable="loading"
                                @click="deleteBNumbers(index)"
                            />
                        </q-item-section>
                    </q-item>
                </template>
                <q-item
                    class="no-padding"
                >
                    <q-item-section
                        class="aui-list-item-section-button"
                        side
                    >
                        <q-btn
                            :label="$t('Add another destination')"
                            data-cy="aui-create-destination-add"
                            color="primary"
                            icon="add"
                            size="sm"
                            unelevated
                            outline
                            :disable="loading || formData.destinations?.length > 10"
                            @click="addBNumbers"
                        />
                    </q-item-section>
                </q-item>
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import { helpers, required, requiredIf } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiNewCallForwardingDestination',
    components: { AuiBaseFormField, AuiBaseForm },
    mixins: [baseFormMixin],
    props: {
        initialFormData: {
            type: Object,
            default: null
        },
        subscriberId: {
            type: Number,
            default: null
        },
        primaryNumberObject: {
            type: Object,
            default: null
        }
    },
    emits: ['remove', 'submit'],
    data () {
        return {
            v$: useValidate()
        }
    },
    validations () {
        return {
            formData: {
                name: {
                    required
                },
                destinations: {
                    $each: helpers.forEach({
                        simple_destination: {
                            required: requiredIf(function () {
                                return this.formData?.destinations.some((dest) => dest.destination === 'uri')
                            })
                        },
                        destination: {
                            required
                        }
                    })
                }
            }
        }
    },
    computed: {
        ...mapGetters('subscribers', [
            'annoucementId',
            'defaultDestinationTypes'
        ]),
        getInitialData () {
            const defaultData = {
                name: '',
                destinations: [
                    {
                        destination: 'uri',
                        timeout: '300',
                        priority: '1',
                        simple_destination: null,
                        announcement_id: null
                    }
                ]
            }
            const newDestinations = this.initialFormData?.destinations?.map((destination) => {
                const baseData = {
                    timeout: destination.timeout,
                    priority: destination.priority,
                    destination: destination.destination
                }
                if (destination.simple_destination) {
                    return {
                        ...baseData,
                        destination: 'uri',
                        simple_destination: destination.simple_destination
                    }
                }

                if (destination.announcement_id) {
                    return {
                        ...baseData,
                        announcement_id: destination.announcement_id
                    }
                }

                return baseData
            })

            return {
                name: this.initialFormData?.name || '',
                destinations: newDestinations?.length > 0 ? newDestinations : defaultData.destinations,
                subscriber_id: this.subscriberId
            }
        },
        destinationTypeOptions () {
            const primaryNumber = `${this.primaryNumberObject.cc}${this.primaryNumberObject.ac}${this.primaryNumberObject.sn}`
            const voicemail = { label: 'Voicemail', value: `sip:vmu${primaryNumber}@voicebox.local` }
            const conference = { label: 'Conference', value: `sip:conf=${primaryNumber}@conference.local` }
            const fax2Mail = { label: 'Fax2Mail', value: `sip:fax=${primaryNumber}@fax2mail.local` }
            const managerSecretary = { label: 'Manager Secretary', value: `sip:${primaryNumber}@managersecretary.local` }

            return [...this.defaultDestinationTypes, voicemail, conference, fax2Mail, managerSecretary]
        }
    },
    methods: {
        addBNumbers () {
            this.formData?.destinations.push({
                destination: '',
                timeout: '300',
                priority: '1',
                announcement_id: null,
                simple_destination: null
            })
        },
        deleteBNumbers (index) {
            this.formData?.destinations.splice(index, 1)
        },
        validateAndSubmit () {
            this.v$.$touch()
            if (!this.hasInvalidData) {
                const data = this.prepareSubmitData(this.normalizeSubmitData(this.getSubmitData()))
                return this.$emit('submit', data, {
                    ...this.additionalSubmitData()
                })
            }

            // When the destination 'uri' is added to an array containing other simple destinations
            // vue marks the form as invalid. It might be related to the use of ifRequired + the helper $each.
            // As a temp workaround we force the submit in this scenario.
            if (this.formData?.destinations.some((item) => item.destination === 'uri') && this.formData?.destinations.some((item) => item.simple_destination !== null)) {
                this.forceSubmit()
            }
        },
        forceSubmit () {
            if (this.formData?.destinations.some((dest) => dest.destination === 'uri') && this.formData?.destinations.some((dest) => dest.simple_destination !== null)) {
                const data = this.prepareSubmitData(this.normalizeSubmitData(this.getSubmitData()))
                this.$emit('submit', data, {
                    ...this.additionalSubmitData()
                })
            }
        }
    }
}
</script>
<style>
.green-border {
    border: 1px solid green;
    padding: 2%;
    margin: 1%;
    border-radius: 7px;
}
</style>
