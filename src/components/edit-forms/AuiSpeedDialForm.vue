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
            <aui-base-form-field>
                <template
                    v-if="formData.speeddials && formData.speeddials.length > 0"
                >
                    <q-item
                        v-for="(speeddial, index) in formData.speeddials"
                        :key="index"
                        class="no-padding"
                    >
                        <q-item-section>
                            <q-select
                                v-model="formData.speeddials[index].slot"
                                dense
                                :error="false"
                                :label="$t('Slot')"
                                :options="availableSlots"
                                map-options
                                emit-value
                                :disable="loading"
                            />
                        </q-item-section>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.speeddials[index].destination"
                                dense
                                clearable
                                :label="$t('Destination')"
                                :disable="loading"
                                :error="v$.$error && v$.formData.speeddials.$each.$response.$errors[index].destination.length > 0"
                                :error-message="$errMsg(v$.formData.speeddials.$each.$response.$errors[index].destination)"
                                @keyup.enter="submit"
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
                                @click="deleteSpeedDial(index)"
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
                            :label="$t('Add another speed dial')"
                            color="primary"
                            icon="add"
                            size="sm"
                            unelevated
                            outline
                            :disable="loading || formData.speeddials.length > 9"
                            @click="addSpeedDial"
                        />
                    </q-item-section>
                </q-item>
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import baseFormMixin from 'src/mixins/base-form'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiBaseFormField from 'components/AuiBaseFormField'
import useValidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import NegativeConfirmationDialog from 'components/dialog/NegativeConfirmationDialog'
export default {
    name: 'AuiSpeedDialForm',
    components: { AuiBaseFormField, AuiBaseForm },
    mixins: [baseFormMixin],
    props: {
        isCustomer: {
            type: Boolean,
            default: false
        }
    },
    emits: ['remove'],
    data () {
        return {
            v$: useValidate()
        }
    },
    validations () {
        return {
            formData: {
                speeddials: {
                    $each: helpers.forEach({
                        slot: {
                            required
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
        getInitialData () {
            if (this.initialFormData) {
                return {
                    speeddials: this.initialFormData.speeddials
                }
            } else {
                return {
                    speeddials: []
                }
            }
        },
        availableSlots () {
            const slots = []
            let maxSlots = 10
            if (this.isCustomer) {
                maxSlots = 1000
            }
            let slot
            for (let n = 0; n < maxSlots; n++) {
                slot = '*' + n
                if (this.isCustomer) {
                    if (n < 10) {
                        slot = '*00' + n
                    } else if (n >= 10 && n < 100) {
                        slot = '*0' + n
                    }
                }
                if (!this.formData.speeddials.some(e => e.slot === slot)) {
                    slots.push({
                        label: slot,
                        value: slot
                    })
                }
            }
            return slots
        }
    },
    methods: {
        addSpeedDial () {
            let maxSlots = 10
            if (this.isCustomer) {
                maxSlots = 1000
            }
            let slot
            for (let n = 0; n < maxSlots; n++) {
                slot = '*' + n
                if (this.isCustomer) {
                    if (n < 10) {
                        slot = '*00' + n
                    } else if (n >= 10 && n < 100) {
                        slot = '*0' + n
                    }
                }
                if (!this.formData.speeddials.some(e => e.slot === slot)) {
                    this.formData.speeddials.push({
                        slot: slot,
                        destination: null
                    })
                    break
                }
            }
        },
        deleteSpeedDial (index) {
            if (this.isCustomer && this.formData.speeddials[index].id) {
                this.$q.dialog({
                    component: NegativeConfirmationDialog,
                    componentProps: {
                        title: this.$t('Remove this slot'),
                        icon: 'delete_forever',
                        text: this.$t('You are about to remove slot {slot}', {
                            slot: this.formData.speeddials[index].slot
                        }),
                        buttonIcon: 'delete_forever',
                        buttonLabel: this.$t('Delete')
                    }
                }).onOk(async () => {
                    this.$emit('remove', this.formData.speeddials[index].id)
                })
            } else {
                this.formData.speeddials.splice(index, 1)
            }
        }
    }
}
</script>
