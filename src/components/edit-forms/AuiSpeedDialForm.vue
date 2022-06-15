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
                    <template
                        v-for="(speeddial, index) in formData.speeddials"
                    >
                        <q-item
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
                                    :error="$v.formData.speeddials.$each[index].destination.$error"
                                    :error-message="$errMsg($v.formData.speeddials.$each[index].destination)"
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
import { required } from 'vuelidate/lib/validators'
export default {
    name: 'AuiSpeedDialForm',
    components: { AuiBaseFormField, AuiBaseForm },
    mixins: [baseFormMixin],
    validations () {
        return {
            formData: {
                speeddials: {
                    $each: {
                        slot: {
                            required
                        },
                        destination: {
                            required
                        }
                    }
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
            for (let n = 0; n < 10; n++) {
                if (!this.formData.speeddials.some(e => e.slot === '*' + n)) {
                    slots.push({
                        label: '*' + n,
                        value: '*' + n
                    })
                }
            }
            return slots
        }
    },
    methods: {
        addSpeedDial () {
            for (let n = 0; n < 10; n++) {
                if (!this.formData.speeddials.some(e => e.slot === '*' + n)) {
                    this.formData.speeddials.push({
                        slot: '*' + n,
                        destination: null
                    })
                    break
                }
            }
        },
        deleteSpeedDial (index) {
            this.formData.speeddials.splice(index, 1)
        }
    }
}
</script>
