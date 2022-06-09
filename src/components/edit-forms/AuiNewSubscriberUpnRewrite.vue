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
                <q-input
                    v-model.trim="formData.new_cli"
                    dense
                    clearable
                    :label="$t('New cli')"
                    data-cy="upnrewritesets-new_cli"
                    :disable="loading"
                    :error="$v.formData.new_cli.$error"
                    :error-message="$errMsg($v.formData.new_cli)"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The new CLI to be used as UPN, when one of the patterns matches.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <template
                    v-if="editableRewriteSources && editableRewriteSources.length > 0"
                >
                    <template
                        v-for="(editableRewriteSource, index) in editableRewriteSources"
                    >
                        <q-item
                            :key="index"
                            class="no-padding"
                        >
                            <q-item-section>
                                <q-input
                                    v-model.trim="formData.upn_rewrite_sources[index].pattern"
                                    dense
                                    clearable
                                    :label="$t('Pattern')"
                                    data-cy="upnrewritesets-pattern"
                                    :disable="loading"
                                    :error="$v.formData.upn_rewrite_sources.$each[index].pattern.$error"
                                    :error-message="$errMsg($v.formData.upn_rewrite_sources.$each[index].pattern)"
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
                                    :disable="loading || editableRewriteSources.length <= 1"
                                    @click="deletePattern(index)"
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
                            :label="$t('Add another pattern')"
                            color="primary"
                            icon="add"
                            size="sm"
                            unelevated
                            outline
                            :disable="loading"
                            @click="addPattern"
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
    name: 'AuiNewSubscriberUpnRewrite',
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
                new_cli: {
                    required
                },
                upn_rewrite_sources: {
                    $each: {
                        pattern: {
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
                    new_cli: this.initialFormData.new_cli,
                    upn_rewrite_sources: this.initialFormData.upn_rewrite_sources,
                    subscriber_id: this.subscriberId
                }
            } else {
                return {
                    new_cli: null,
                    upn_rewrite_sources: [{
                        pattern: null
                    }],
                    subscriber_id: this.subscriberId
                }
            }
        },
        editableRewriteSources () {
            const rewriteSources = []
            if (this.formData.upn_rewrite_sources && this.formData.upn_rewrite_sources.length > 0) {
                this.formData.upn_rewrite_sources.forEach((source, index) => {
                    if (this.relations && this.relations.upnRewriteSources && this.relations.upnRewriteSources[index]) {
                        rewriteSources.push({
                            pattern: source.pattern
                        })
                    } else {
                        rewriteSources.push({
                            pattern: null
                        })
                    }
                })
            }
            return rewriteSources
        }
    },
    methods: {
        addPattern () {
            this.formData.upn_rewrite_sources.push({
                pattern: null
            })
        },
        deletePattern (index) {
            this.formData.upn_rewrite_sources.splice(index, 1)
        }
    }
}
</script>
