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
        <div
            v-if="formData?.cfr?.length > 0"
            class="text-center"
        >
            <q-btn
                :label="$t('Add Destination/time/BNumber/Source sets')"
                data-cy="aui-cfresponse-addnew-set"
                class="q-mb-md"
                color="primary"
                icon="add"
                size="sm"
                unelevated
                outline
                :disable="loading"
                @click="addCFR"
            />

            <div
                v-for="(cfr, index) in formData.cfr"
                :key="index"
            >
                <q-card class="q-pa-md q-mb-md">
                    <div class="list-container">
                        <q-list
                            class="rounded-borders"
                        >
                            <q-card-section class="q-pa-xs">
                                <aui-base-form-field>
                                    <q-toggle
                                        v-model="cfr.enabled"
                                        :label="$t('Enabled')"
                                        data-cy="aui-cfresponse-enable"
                                        :disable="loading"
                                    />
                                </aui-base-form-field>
                                <aui-base-form-field>
                                    <q-toggle
                                        v-model="cfr.use_redirection"
                                        :label="$t('Use redirection')"
                                        data-cy="aui-cfresponse-redirect"
                                        :disable="loading"
                                    />
                                </aui-base-form-field>
                            </q-card-section>

                            <q-card-section class="q-pa-xs">
                                <aui-base-form-field
                                    required
                                >
                                    <aui-select-call-forward-params
                                        v-model="cfr.destinationset_id"
                                        dense
                                        class="q-pa-xs"
                                        data-cy="aui-cfresponse-destinationset-destination"
                                        map-options
                                        emit-value
                                        clearable
                                        :label="$t('Destination Set')"
                                        :item-id="cfr.destinationset_id"
                                        :type="'destination'"
                                        :subscriber-id="subscriberId"
                                        :initial-option="initialDestinationOption && initialDestinationOption[index]"
                                        :disable="loading"
                                        :error="v$.$error && v$.formData.cfr.$each.$response.$errors[index].destinationset_id.length > 0"
                                        :error-message="$errMsg(v$.formData.cfr.$each.$response.$errors[index].destinationset_id)"
                                        @input-data="updateName($event, index, 'destinationset')"
                                    />
                                </aui-base-form-field>
                            </q-card-section>

                            <q-card-section class="q-pa-xs">
                                <aui-base-form-field>
                                    <aui-select-call-forward-params
                                        v-model="cfr.timeset_id"
                                        dense
                                        data-cy="aui-cfresponse-timeset-time"
                                        map-options
                                        emit-value
                                        clearable
                                        :label="$t('Time Set')"
                                        :item-id="cfr.timeset_id"
                                        :type="'time'"
                                        :subscriber-id="subscriberId"
                                        :initial-option="initialTimeSetOption && initialTimeSetOption[index]"
                                        :disable="loading"
                                        @input-data="updateName($event, index, 'timeset')"
                                    />
                                </aui-base-form-field>
                            </q-card-section>

                            <q-card-section class="q-pa-xs">
                                <aui-base-form-field>
                                    <aui-select-call-forward-params
                                        v-model="cfr.sourceset_id"
                                        dense
                                        data-cy="aui-cfresponse-sourceset-source"
                                        map-options
                                        emit-value
                                        clearable
                                        :label="$t('Source Set')"
                                        :item-id="cfr.sourceset_id"
                                        :type="'source'"
                                        :subscriber-id="subscriberId"
                                        :initial-option="initialSourceSetOption && initialSourceSetOption[index]"
                                        :disable="loading"
                                        @input-data="updateName($event, index, 'sourceset')"
                                    />
                                </aui-base-form-field>
                            </q-card-section>

                            <q-card-section class="q-pa-xs">
                                <aui-base-form-field>
                                    <aui-select-call-forward-params
                                        v-model="cfr.bnumberset_id"
                                        dense
                                        data-cy="aui-cfresponse-bnumber"
                                        map-options
                                        emit-value
                                        clearable
                                        :label="$t('B-Number Set')"
                                        :item-id="cfr.bnumberset_id"
                                        :type="'bNumber'"
                                        :subscriber-id="subscriberId"
                                        :initial-option="initialBNumberSetOption && initialBNumberSetOption[index]"
                                        :disable="loading"
                                        @input-data="updateName($event, index, 'bnumberset')"
                                    />
                                </aui-base-form-field>
                            </q-card-section>
                        </q-list>
                    </div>

                    <q-card-actions
                        vertical
                        align="center"
                    >
                        <q-btn
                            color="negative"
                            unelevated
                            dense
                            label="Delete"
                            icon="delete"
                            data-cy="aui-cfresponse-delete"
                            size="md"
                            :disable="loading"
                            @click="deleteCFR(index)"
                        />
                    </q-card-actions>
                </q-card>
            </div>
        </div>
    </aui-base-form>
</template>

<script>
import { helpers, required } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiSelectCallForwardParams from 'components/AuiSelectCallForwardParams'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'

export default {
    name: 'AuiNewCallForwardingResponse',
    components: {
        AuiBaseFormField,
        AuiBaseForm,
        AuiSelectCallForwardParams
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
                cfr: {
                    $each: helpers.forEach({
                        destinationset_id: {
                            required
                        }
                    })
                }
            }
        }
    },
    computed: {
        getInitialData () {
            const defaultCF = {
                enabled: true,
                use_redirection: false,
                destinationset_id: null,
                destinationset: null,
                bnumberset_id: null,
                sourceset_id: null,
                timeset_id: null,
                cfm_id: null
            }

            return {
                cfr: this.initialFormData?.length > 0 ? this.initialFormData : [defaultCF],
                subscriber_id: this.subscriberId
            }
        },
        initialDestinationOption () {
            if (this.formData.cfr.length === 0) {
                return null
            }

            return this.formData.cfr.map((item) => {
                if (item.destinationset_id === null) {
                    return null
                }

                return {
                    destinationset: item.destinationset,
                    label: `${item.destinationset_id} - ${item.destinationset}`,
                    value: item.destinationset_id
                }
            })
        },
        initialTimeSetOption () {
            return this.formData.cfr.map((item) => {
                if (item.timeset_id === null) {
                    return null
                }

                return {
                    label: `${item.timeset_id} - ${item.timeset}`,
                    value: item.timeset_id
                }
            })
        },
        initialSourceSetOption () {
            return this.formData.cfr.map((item) => {
                if (item.sourceset_id === null) {
                    return null
                }

                return {
                    label: `${item.sourceset_id} - ${item.sourceset}`,
                    value: item.sourceset_id
                }
            })
        },
        initialBNumberSetOption () {
            return this.formData.cfr.map((item) => {
                if (item.bnumberset_id === null) {
                    return null
                }

                return {
                    label: `${item.bnumberset_id} - ${item.bnumberset}`,
                    value: item.bnumberset_id
                }
            })
        }
    },
    methods: {
        addCFR () {
            this.formData.cfr.unshift({
                enabled: true,
                use_redirection: false,
                destinationset_id: null,
                destinationset: null,
                bnumberset_id: null,
                sourceset_id: null,
                timeset_id: null,
                cfm_id: null
            })
        },
        deleteCFR (index) {
            this.formData.cfr.splice(index, 1)
        },
        // Id is emitted by q-select, name needs to be manually updated
        updateName (value, index, field) {
            if (value) {
                this.formData.cfr[index][field] = value.name
                return
            }
            this.formData.cfr[index][field] = null
        }
    }
}
</script>
<style>
.list-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.q-list {
    flex-grow: 1;
    margin-top: 2%
}
</style>
