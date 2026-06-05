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
                <q-list>
                    <slot
                        name="fields"
                        :form-data="formData"
                        :loading="loading"
                        :has-field-error="hasFieldError"
                        :get-field-error="getFieldError"
                        :validate-field="validateField"
                    />
                    <q-item>
                        <q-item-section>
                            <aui-input-file
                                dense
                                hide-hint
                                :label="label"
                                :model-value="formData?.file"
                                :disable="loading"
                                :loading="loading"
                                :show-btns="false"
                                allowed-file-types=".csv"
                                data-cy="phonebook-upload-field"
                                @update:model-value="setFile($event)"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-toggle
                                v-model="formData.purge_existing"
                                dense
                                :label="$t('Purge existing')"
                                data-cy="phonebook-purge"
                                :disable="loading"
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
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiInputFile from 'components/input/AuiInputFile'
import baseFormMixin from 'src/mixins/base-form'
export default {
    name: 'AuiUploadCsv',
    components: {
        AuiBaseForm,
        AuiInputFile
    },
    mixins: [baseFormMixin],
    props: {
        label: {
            type: String,
            required: true
        },
        loading: {
            type: Boolean,
            default: false
        },
        additionalRequiredFields: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            v$: useValidate()
        }
    },
    validations () {
        const validations = {
            formData: {
                file: {
                    required
                }
            }
        }
        this.additionalRequiredFields.forEach((field) => {
            validations.formData[field] = {
                required
            }
        })
        return validations
    },
    computed: {
        getDefaultData () {
            const defaultData = {
                file: null,
                purge_existing: false
            }
            this.additionalRequiredFields.forEach((field) => {
                defaultData[field] = null
            })
            return defaultData
        }
    },
    methods: {
        async setFile (value) {
            this.formData.file = value
        },
        getSubmitData () {
            const submitData = {
                file: this.formData.file,
                purge_existing: this.formData.purge_existing
            }
            this.additionalRequiredFields.forEach((field) => {
                if (Object.hasOwn(this.formData, field)) {
                    submitData[field] = this.formData[field]
                }
            })
            return submitData
        }
    }
}
</script>
