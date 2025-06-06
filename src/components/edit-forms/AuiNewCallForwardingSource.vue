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
                    data-cy="aui-sourceset-create-name"
                    :error="hasFieldError('name')"
                    :error-message="getFieldError('name')"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The unique name of the source set. Arbitrary text') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model="formData.mode"
                    dense
                    :error="false"
                    :label="$t('Mode')"
                    data-cy="aui-sourceset-create-mode"
                    :options="modeSourceSet"
                    map-options
                    emit-value
                    :disable="loading"
                >
                    <q-tooltip>
                        {{ $t('The source set mode') }}
                    </q-tooltip>
                </q-select>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.is_regex"
                    :label="$t('is regex')"
                    data-cy="aui-sourceset-create-isregex"
                    :disable="loading"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <template
                    v-if="formData?.sources?.length > 0"
                >
                    <q-item
                        v-for="(source, index) in formData.sources"
                        :key="index"
                        class="green-border"
                    >
                        <q-item-section>
                            <q-input
                                v-model="source.source"
                                clearable
                                dense
                                :disable="loading"
                                :label="$t('Source')"
                                data-cy="aui-sourceset-create-source"
                                :error="v$.$error && v$.formData.sources.$each.$response.$errors[index].source.length > 0"
                                :error-message="$errMsg(v$.formData.sources.$each.$response.$errors[index].source)"
                                @keyup.enter="submit"
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
                                data-cy="aui-sourceset-create-source-delete"
                                size="sm"
                                :disable="loading"
                                @click="deleteSources(index)"
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
                            :label="$t('Add another source')"
                            data-cy="aui-sourceset-create-source-add"
                            color="primary"
                            icon="add"
                            size="sm"
                            unelevated
                            outline
                            :disable="loading || formData.sources?.length > 10"
                            @click="addSources"
                        />
                    </q-item-section>
                </q-item>
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import { helpers, required } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiNewCallForwardingSource',
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
            v$: useValidate()
        }
    },
    validations () {
        return {
            formData: {
                name: {
                    required
                },
                sources: {
                    $each: helpers.forEach({
                        source: {
                            required
                        }
                    })
                }
            }
        }
    },
    computed: {
        ...mapGetters('subscribers', [
            'modeSourceSet'
        ]),
        getInitialData () {
            return {
                name: this.initialFormData?.name || '',
                mode: this.initialFormData?.mode || 'whitelist',
                is_regex: this.initialFormData?.is_regex || false,
                sources: this.initialFormData?.sources || [{ source: '' }],
                subscriber_id: this.subscriberId
            }
        }

    },
    methods: {
        addSources () {
            this.formData?.sources.push({
                source: ''
            })
        },
        deleteSources (index) {
            this.formData?.sources.splice(index, 1)
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
