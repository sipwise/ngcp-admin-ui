<template>
    <aui-base-form
        layout="6-6"
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
                <template
                    v-if="editableCallThroughCLIsSources && editableCallThroughCLIsSources.length > 0"
                >
                    <template
                        v-for="(editableCallThroughCLIsSource, index) in editableCallThroughCLIsSources"
                    >
                        <q-item
                            :key="index"
                            class="no-padding"
                        >
                            <q-item-section>
                                <q-input
                                    v-model.trim="formData.mappings[index].auth_key"
                                    dense
                                    clearable
                                    :label="$t('Auth key')"
                                    data-cy="ccmapentries-authKey"
                                    :disable="loading"
                                    :error="$v.formData.mappings.$each[index].auth_key.$error"
                                    :error-message="$errMsg($v.formData.mappings.$each[index].auth_key)"
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
                                    @click="deleteCallThrough(index)"
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
                            :label="$t('Add another Mapping')"
                            color="primary"
                            icon="add"
                            size="sm"
                            unelevated
                            outline
                            :disable="loading"
                            @click="addCallThrough"
                        />
                    </q-item-section>
                </q-item>
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiBaseFormField from 'components/AuiBaseFormField'
import baseFormMixin from 'src/mixins/base-form'
import {
    required
} from 'vuelidate/lib/validators'
export default {
    name: 'AuiNewSubscriberCallThroughCLIs',
    components: {
        AuiBaseForm,
        AuiBaseFormField
    },
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
    validations () {
        return {
            formData: {
                mappings: {
                    $each: {
                        auth_key: {
                            required
                        }
                    }
                }
            }
        }
    },
    data () {
        return {
            formData: this.getInitialData
        }
    },
    computed: {
        getInitialData () {
            if (this.initialFormData) {
                return {
                    mappings: this.initialFormData.mappings
                }
            } else {
                return {
                    mappings: [{
                        auth_key: null
                    }]
                }
            }
        },
        editableCallThroughCLIsSources () {
            const callThroughClisSources = []
            if (this.formData.mappings && this.formData.mappings.length > 0) {
                this.formData.mappings.forEach((source, index) => {
                    if (this.relations && this.relations.mappings && this.relations.mappings[index]) {
                        callThroughClisSources.push({
                            auth_key: source.auth_key
                        })
                    } else {
                        callThroughClisSources.push({
                            auth_key: null
                        })
                    }
                })
            }
            return callThroughClisSources
        }
    },
    methods: {
        addCallThrough () {
            this.formData.mappings.push({
                auth_key: null
            })
        },
        deleteCallThrough (index) {
            this.formData.mappings.splice(index, 1)
        }
    }
}
</script>
