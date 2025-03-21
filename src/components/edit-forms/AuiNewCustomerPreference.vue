<template>
    <aui-base-form>
        <slot
            name="actions"
            :loading="loading"
            :has-unsaved-data="hasUnsavedData"
            :has-invalid-data="hasInvalidData"
            :reset="reset"
            :submit="submit"
        />
        <div
            class="row"
        >
            <div
                class="col-md-6 col-xs-12"
            >
                <aui-base-form-field
                    required
                >
                    <q-input
                        v-model.trim="formData.attribute"
                        clearable
                        dense
                        :label="$t('Name')"
                        data-cy="aui-custompref-name"
                        :error="hasFieldError('attribute')"
                        :error-message="getFieldError('attribute')"
                        :disable="loading"
                        @keyup.enter="submit"
                    />
                </aui-base-form-field>
                <aui-base-form-field>
                    <q-toggle
                        v-model="formData.fielddev_pref"
                        :label="$t('Override on deployed device')"
                        data-cy="aui-custompref-override"
                        :disable="loading"
                    />
                </aui-base-form-field>
                <aui-base-form-field
                    required
                >
                    <q-input
                        v-model.trim="formData.label"
                        clearable
                        dense
                        :label="$t('Label')"
                        data-cy="aui-custompref-label"
                        :error="hasFieldError('label')"
                        :error-message="getFieldError('label')"
                        :disable="loading"
                        @keyup.enter="submit"
                    />
                </aui-base-form-field>
                <aui-base-form-field>
                    <q-toggle
                        v-model="formData.max_occur"
                        :label="$t('Only one is allowed')"
                        :disable="loading"
                    />
                </aui-base-form-field>
                <aui-base-form-field
                    required
                >
                    <q-input
                        v-model.trim="formData.description"
                        clearable
                        dense
                        :label="$t('Description')"
                        data-cy="aui-custompref-description"
                        :error="hasFieldError('description')"
                        :error-message="getFieldError('description')"
                        :disable="loading"
                        @keyup.enter="submit"
                    />
                </aui-base-form-field>
                <aui-base-form-field
                    required
                >
                    <q-select
                        v-model="formData.data_type"
                        :options="dataTypeOptions"
                        emit-value
                        map-options
                        dense
                        :label="$t('Data type')"
                        data-cy="aui-custompref-datatype"
                        :error="hasFieldError('data_type')"
                        :error-message="getFieldError('data_type')"
                        :disable="loading"
                    />
                </aui-base-form-field>
                <q-list
                    dense
                >
                    <q-item-label
                        header
                        class="text-uppercase"
                        data-cy="aui-custompref-enum-values"
                    >
                        {{ $t('Enum values') }}
                    </q-item-label>
                    <template
                        v-if="formData.enum && formData.enum.length > 0"
                    >
                        <q-item
                            v-for="(enumValue, index) in formData.enum"
                            :key="index"
                        >
                            <q-item-section>
                                <q-input
                                    v-model.trim="enumValue.label"
                                    clearable
                                    dense
                                    :label="$t('Label')"
                                    data-cy="aui-custompref-enum-label"
                                    :disable="loading"
                                    @keyup.enter="submit"
                                />
                                <q-input
                                    v-model.trim="enumValue.value"
                                    clearable
                                    dense
                                    :label="$t('Value')"
                                    data-cy="aui-custompref-enum-value"
                                    :disable="loading"
                                    @keyup.enter="submit"
                                />
                                <q-toggle
                                    v-model="enumValue.default_val"
                                    :label="$t('Default value')"
                                    data-cy="aui-custompref-enum-defaultvalue"
                                    :false-value="0"
                                    :true-value="1"
                                    :disable="loading"
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
                                    data-cy="aui-custompref-enum-delete"
                                    size="sm"
                                    :disable="loading"
                                    @click="deleteEnumValue(index)"
                                />
                            </q-item-section>
                        </q-item>
                    </template>
                    <q-item>
                        <q-item-section
                            class="aui-list-item-section-button"
                            side
                        >
                            <q-btn
                                :label="$t('Add enum value')"
                                data-cy="aui-custompref-enum-add"
                                color="primary"
                                icon="add"
                                size="sm"
                                unelevated
                                outline
                                :disable="loading"
                                @click="addEnumValue"
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiNewCustomerPreference',
    components: {
        AuiBaseForm,
        AuiBaseFormField
    },
    mixins: [baseFormMixin],
    data () {
        return {
            v$: useValidate()
        }
    },
    validations () {
        return {
            formData: {
                attribute: {
                    required
                },
                description: {
                    required
                },
                label: {
                    required
                },
                data_type: {
                    required
                }
            }
        }
    },
    computed: {
        ...mapGetters('deviceManagement', [
            'dataTypeOptions'
        ]),
        getInitialData () {
            const defaultEnum = [{
                label: null,
                value: null,
                default_val: 0
            }]
            return {
                attribute: this.initialFormData?.attribute || null,
                label: this.initialFormData?.label || null,
                fielddev_pref: this.initialFormData?.fielddev_pref || true,
                dev_pref: this.initialFormData?.dev_pref || true,
                max_occur: this.initialFormData?.max_occur || true,
                description: this.initialFormData?.description || null,
                data_type: this.initialFormData?.data_type || null,
                enum: this.initialFormData?.enum || defaultEnum
            }
        }
    },
    methods: {
        addEnumValue () {
            this.formData.enum.push({
                label: null,
                value: null,
                default_val: 0
            })
        },
        deleteEnumValue (index) {
            this.formData.enum.splice(index, 1)
        }
    }
}
</script>
