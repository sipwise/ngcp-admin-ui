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
                >
                    <q-tooltip>
                        {{ $t('The unique name of the B-Number set. Arbitrary text') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model="formData.mode"
                    dense
                    :error="false"
                    :label="$t('Mode')"
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
                    :disable="loading"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <template
                    v-if="formData.bnumbers && formData.bnumbers.length > 0"
                >
                    <q-item
                        v-for="(bnumber, index) in formData.bnumbers"
                        :key="index"
                        class="green-border"
                    >
                        <q-item-section>
                            <q-input
                                v-model="formData.bnumbers[index].bnumber"
                                clearable
                                dense
                                :disable="loading"
                                :label="$t('B-Number')"
                                :error="false"
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
                            :label="$t('Add another B-Number')"
                            color="primary"
                            icon="add"
                            size="sm"
                            unelevated
                            outline
                            :disable="loading || formData.bnumbers.length > 10"
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
import { required } from '@vuelidate/validators'
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
            v$: useValidate()
        }
    },
    validations () {
        return {
            formData: {
                name: {
                    required
                }
            }
        }
    },
    computed: {
        ...mapGetters('subscribers', [
            'modeSourceSet'
        ]),
        getInitialData () {
            if (this.initialFormData) {
                return {
                    name: this.initialFormData.name,
                    mode: this.initialFormData.mode,
                    is_regex: this.initialFormData.is_regex,
                    bnumbers: this.initialFormData.bnumbers,
                    subscriber_id: this.subscriberId
                }
            } else {
                return {
                    name: '',
                    mode: 'whitelist',
                    is_regex: false,
                    bnumbers: [
                        {
                            bnumber: ''
                        }
                    ],
                    subscriber_id: this.subscriberId
                }
            }
        }

    },
    methods: {
        addBNumbers () {
            this.formData.bnumbers.push({
                bnumber: ''
            })
        },
        deleteBNumbers (index) {
            this.formData.bnumbers.splice(index, 1)
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
