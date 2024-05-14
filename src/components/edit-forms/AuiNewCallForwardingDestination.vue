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
                    :error="hasFieldError('name')"
                    :error-message="getFieldError('name')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <template
                    v-if="formData.destinations && formData.destinations.length > 0"
                >
                    <q-item
                        v-for="(destination, index) in formData.destinations"
                        :key="index"
                        class="green-border"
                    >
                        <q-item-section>
                            <q-select
                                v-model="formData.destinations[index].destination"
                                dense
                                :label="$t('Destination')"
                                :options="destinationSet"
                                map-options
                                emit-value
                                :disable="loading"
                                :error="v$.$error && v$.formData.destinations.$each.$response.$errors[index].destination.length > 0"
                                :error-message="$errMsg(v$.formData.destinations.$each.$response.$errors[index].destination)"
                            />
                            <q-input
                                v-if="formData.destinations[index].destination == 'uri'"
                                v-model="formData.destinations[index].simple_destination"
                                clearable
                                required
                                dense
                                :disable="loading"
                                :error="v$.$error && v$.formData.destinations.$each.$response.$errors[index].simple_destination.length > 0"
                                :error-message="$errMsg(v$.formData.destinations.$each.$response.$errors[index].simple_destination)"
                                :label="$t('URI/Number')"
                                @keyup.enter="submit"
                            />
                            <q-input
                                v-model="formData.destinations[index].timeout"
                                clearable
                                dense
                                :disable="loading"
                                :label="$t('for(seconds)')"
                                :error="false"
                                @keyup.enter="submit"
                            />
                            <q-input
                                v-model="formData.destinations[index].priority"
                                clearable
                                dense
                                :disable="loading"
                                :label="$t('Priority')"
                                :error="false"
                                @keyup.enter="submit"
                            />
                            <q-select
                                v-if="formData.destinations[index].destination === 'sip:custom-hours@app.local'"
                                v-model="formData.destinations[index].announcement_id"
                                dense
                                :error="false"
                                :label="$t('Custom announcement')"
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
                            color="primary"
                            icon="add"
                            size="sm"
                            unelevated
                            outline
                            :disable="loading || formData.destinations.length > 10"
                            @click="addBNumbers"
                        />
                    </q-item-section>
                </q-item>
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import baseFormMixin from 'src/mixins/base-form'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiBaseFormField from 'components/AuiBaseFormField'
import useValidate from '@vuelidate/core'
import { required, requiredIf, helpers } from '@vuelidate/validators'
export default {
    name: 'AuiNewCallForwardingBNumber',
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
        }
    },
    emits: ['remove'],
    data () {
        return {
            v$: useValidate(),
            formData: this.getInitialData
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
                                if (this.formData.destinations.some(dest => dest.destination === 'uri')) {
                                    return true
                                }
                                return false
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
            'annoucementId'
        ]),
        destinationSet () {
            const destinations = [
                { label: 'Voicemail', value: 'sip:vmu380542000008@voicebox.local' },
                { label: 'Conference', value: 'sip:conf=380542000008@conference.local' },
                { label: 'Fax2Mail', value: 'sip:fax=380542000008@fax2mail.local' },
                { label: 'Calling Card', value: 'sip:callingcard@app.local' },
                { label: 'Call Through', value: 'sip:callthrough@app.local' },
                { label: 'Custom Announcement', value: 'sip:custom-hours@app.local' },
                { label: 'Local Subscriber', value: 'sip:localuser@app.local' },
                { label: 'Manager Secretary', value: 'sip:380542000008@managersecretary.local' },
                { label: 'URI/Number', value: 'uri' }
            ]
            return destinations
        },
        getInitialData () {
            const newdestinations = []
            if (this.initialFormData) {
                for (let i = 0; i < this.initialFormData.destinations.length; i++) {
                    if (this.initialFormData.destinations[i].simple_destination) {
                        newdestinations.push({
                            destination: 'uri',
                            simple_destination: this.initialFormData.destinations[i].simple_destination,
                            timeout: this.initialFormData.destinations[i].timeout,
                            priority: this.initialFormData.destinations[i].priority
                        })
                    } else if (this.initialFormData.destinations[i].announcement_id) {
                        newdestinations.push({
                            destination: this.initialFormData.destinations[i].destination,
                            timeout: this.initialFormData.destinations[i].timeout,
                            priority: this.initialFormData.destinations[i].priority,
                            announcement_id: this.initialFormData.destinations[i].announcement_id
                        })
                    } else {
                        newdestinations.push({
                            destination: this.initialFormData.destinations[i].destination,
                            timeout: this.initialFormData.destinations[i].timeout,
                            priority: this.initialFormData.destinations[i].priority
                        })
                    }
                }
                return {
                    name: this.initialFormData.name,
                    destinations: newdestinations,
                    subscriber_id: this.subscriberId
                }
            } else {
                return {
                    name: '',
                    destinations: [
                        {
                            destination: 'uri',
                            timeout: '300',
                            priority: '1',
                            simple_destination: null,
                            announcement_id: null
                        }
                    ],
                    subscriber_id: this.subscriberId
                }
            }
        }

    },
    methods: {
        addBNumbers () {
            this.formData.destinations.push({
                destination: '',
                timeout: '300',
                priority: '1',
                announcement_id: null,
                simple_destination: null
            })
        },
        deleteBNumbers (index) {
            this.formData.destinations.splice(index, 1)
        },
        checksimpleDestination () {
            if (this.formData.destinations.some(dest => dest.destination === 'uri') && this.formData.destinations.some(dest => dest.simple_destination !== null)) {
                const data = this.prepareSubmitData(this.normalizeSubmitData(this.getSubmitData()))
                this.$emit('submit', data, {
                    ...this.additionalSubmitData()
                })
            }
        },
        submit () {
            this.v$.$touch()
            if (this.hasInvalidData) {
                this.checksimpleDestination()
            }
            if (!this.hasInvalidData) {
                const data = this.prepareSubmitData(this.normalizeSubmitData(this.getSubmitData()))
                this.$emit('submit', data, {
                    ...this.additionalSubmitData()
                })
            } else {
                console.log('Validation errors, review required fields')
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
