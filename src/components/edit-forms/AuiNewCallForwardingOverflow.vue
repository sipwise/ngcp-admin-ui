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
            v-if="formData?.cfo?.length > 0"
            class="flex-container"
        >
            <div
                v-for="(cfo, index) in formData.cfo"
                :key="index"
            >
                <q-card class="q-pa-md q-mb-md">
                    <div class="list-container">
                        <q-list class="rounded-borders">
                            <q-card-section class="q-pa-xs">
                                <aui-base-form-field>
                                    <q-toggle
                                        v-model="cfo.enabled"
                                        :label="$t('Enabled')"
                                        data-cy="aui-cfoverflow-enable"
                                        :disable="loading"
                                    />
                                </aui-base-form-field>
                                <aui-base-form-field>
                                    <q-toggle
                                        v-model="cfo.use_redirection"
                                        :label="$t('Use redirection')"
                                        data-cy="aui-cfoverflow-redirect"
                                        :disable="loading"
                                    />
                                </aui-base-form-field>
                            </q-card-section>

                            <q-card-section class="q-pa-xs">
                                <aui-base-form-field
                                    required
                                >
                                    <aui-select-call-forward-params
                                        v-model="cfo.destinationset_id"
                                        dense
                                        class="q-pa-xs"
                                        data-cy="aui-cfoverflow-destinationset-destination"
                                        map-options
                                        emit-value
                                        clearable
                                        :label="$t('Destination Set')"
                                        :item-id="cfo.destinationset_id"
                                        :type="'destination'"
                                        :subscriber-id="subscriberId"
                                        :initial-option="initialDestinationOption && initialDestinationOption[index]"
                                        :disable="loading"
                                        :error="v$.$error && v$.formData.cfo.$each.$response.$errors[index].destinationset_id.length > 0"
                                        :error-message="$errMsg(v$.formData.cfo.$each.$response.$errors[index].destinationset_id)"
                                        @input-data="updateName($event, index, 'destinationset')"
                                    />
                                </aui-base-form-field>
                            </q-card-section>

                            <q-card-section class="q-pa-xs">
                                <aui-base-form-field>
                                    <aui-select-call-forward-params
                                        v-model="cfo.timeset_id"
                                        dense
                                        data-cy="aui-cfoverflow-timeset-time"
                                        map-options
                                        emit-value
                                        clearable
                                        :label="$t('Time Set')"
                                        :item-id="cfo.timeset_id"
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
                                        v-model="cfo.sourceset_id"
                                        dense
                                        data-cy="aui-cfoverflow-sourceset-source"
                                        map-options
                                        emit-value
                                        clearable
                                        :label="$t('Source Set')"
                                        :item-id="cfo.sourceset_id"
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
                                        v-model="cfo.bnumberset_id"
                                        dense
                                        data-cy="aui-cfoverflow-bnumber"
                                        map-options
                                        emit-value
                                        clearable
                                        :label="$t('B-Number Set')"
                                        :item-id="cfo.bnumberset_id"
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
                            data-cy="aui-cfoverflow-delete"
                            size="md"
                            :disable="loading"
                            @click="deleteCFO(index)"
                        />
                    </q-card-actions>
                </q-card>
            </div>

            <q-btn
                :label="$t('Add Destination/time/BNumber/Source sets')"
                data-cy="aui-cfoverflow-addnew-set"
                color="primary"
                icon="add"
                size="sm"
                unelevated
                outline
                :disable="loading"
                @click="addCFO"
            />
        </div>
    </aui-base-form>
</template>

<script>
import baseFormMixin from 'src/mixins/base-form'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiSelectCallForwardParams from 'components/AuiSelectCallForwardParams'
import { required, helpers } from '@vuelidate/validators'
export default {
    name: 'AuiNewCallForwardingOverflow',
    components: { AuiBaseFormField, AuiBaseForm, AuiSelectCallForwardParams },
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
                cfo: {
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
                cfo: this.initialFormData?.length > 0 ? [...this.initialFormData].sort((b, a) => a.cfm_id - b.cfm_id) : [defaultCF],
                subscriber_id: this.subscriberId
            }
        },
        initialDestinationOption () {
            if (this.formData.cfo.length === 0) {
                return null
            }

            return this.formData.cfo.map((item) => {
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
            return this.formData.cfo.map((item) => {
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
            return this.formData.cfo.map((item) => {
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
            return this.formData.cfo.map((item) => {
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
        addCFO () {
            this.formData.cfo.push({
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
        deleteCFO (index) {
            this.formData.cfo.splice(index, 1)
        },
        // Id is emitted by q-select, name needs to be manually updated
        updateName (value, index, field) {
            if (value) {
                this.formData.cfo[index][field] = value.name
                return
            }
            this.formData.cfo[index][field] = null
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
