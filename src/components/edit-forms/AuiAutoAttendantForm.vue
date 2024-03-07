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
                    v-if="formData.slots && formData.slots.length > 0"
                >
                    <q-item
                        v-for="(slot, index) in formData.slots"
                        :key="index"
                        class="no-padding"
                    >
                        <q-item-section>
                            <q-select
                                v-model="formData.slots[index].slot"
                                dense
                                :error="false"
                                :label="$t('Key')"
                                :options="availableKeys"
                                map-options
                                emit-value
                                :disable="loading"
                            />
                        </q-item-section>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.slots[index].destination"
                                dense
                                clearable
                                :label="$t('Destination')"
                                :disable="loading"
                                :error="v$.$error && v$.formData.slots.$each.$response.$errors[index].destination.length > 0"
                                :error-message="$errMsg(v$.formData.slots.$each.$response.$errors[index].destination)"
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
                                @click="deleteAutoAttendant(index)"
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
                            :label="$t('Add another slot')"
                            color="primary"
                            icon="add"
                            size="sm"
                            unelevated
                            outline
                            :disable="loading || formData.slots.length > 10"
                            @click="addAutoAttendant"
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
import { required, helpers } from '@vuelidate/validators'
export default {
    name: 'AuiAutoAttendantForm',
    components: { AuiBaseFormField, AuiBaseForm },
    mixins: [baseFormMixin],
    emits: ['remove'],
    data () {
        return {
            v$: useValidate(),
            formData: {
                slots: []
            }
        }
    },
    validations () {
        return {
            formData: {
                slots: {
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
        ...mapGetters('subscribers', [
            'autoAttendantKey'
        ]),
        getInitialData () {
            if (this.initialFormData) {
                return {
                    slots: this.initialFormData.slots
                }
            } else {
                return {
                    slots: []
                }
            }
        },
        availableKeys () {
            const selectedKeys = this.formData.slots.map(slot => slot.slot)
            return this.autoAttendantKey.filter(key => !selectedKeys.includes(key.value) || key.value === 'default')
        }

    },
    watch: {
        'formData.slots': {
            handler () {
                this.$forceUpdate()
            },
            deep: true
        }
    },
    methods: {
        addAutoAttendant () {
            this.formData.slots.push({
                slot: this.availableKeys[0].value,
                destination: null
            })
        },
        deleteAutoAttendant (index) {
            this.formData.slots.splice(index, 1)
        }
    }
}
</script>
