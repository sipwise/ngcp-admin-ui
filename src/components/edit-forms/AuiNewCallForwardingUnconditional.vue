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
            v-if="formData?.cfu?.length > 0"
            class="flex-container"
        >
            <div
                v-for="(cfu, index) in formData.cfu"
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
                                        v-model="cfu.enabled"
                                        :label="$t('Enabled')"
                                        data-cy="aui-cfunconditional-enable"
                                        :disable="loading"
                                    />
                                </aui-base-form-field>
                                <aui-base-form-field>
                                    <q-toggle
                                        v-model="cfu.use_redirection"
                                        :label="$t('Use redirection')"
                                        data-cy="aui-cfunconditional-redirect"
                                        :disable="loading"
                                    />
                                </aui-base-form-field>
                            </q-card-section>

                            <q-card-section class="q-pa-xs">
                                <aui-base-form-field
                                    required
                                >
                                    <aui-select-call-forward-params
                                        v-model="cfu.destinationset_id"
                                        class="q-pa-xs"
                                        dense
                                        data-cy="aui-cfunconditional-destinationset-destination"
                                        map-options
                                        emit-value
                                        clearable
                                        :label="$t('Destination Set')"
                                        :item-id="cfu.destinationset_id"
                                        :type="'destination'"
                                        :subscriber-id="subscriberId"
                                        :initial-option="initialDestinationOption && initialDestinationOption[index]"
                                        :disable="loading"
                                        :error="v$.$error && v$.formData.cfu.$each.$response.$errors[index].destinationset_id.length > 0"
                                        :error-message="$errMsg(v$.formData.cfu.$each.$response.$errors[index].destinationset_id)"
                                        @input-data="updateName($event, index, 'destinationset')"
                                    />
                                </aui-base-form-field>
                            </q-card-section>

                            <q-card-section class="q-pa-xs">
                                <aui-base-form-field>
                                    <aui-select-call-forward-params
                                        v-model="cfu.timeset_id"
                                        dense
                                        data-cy="aui-cfunconditional-timeset-time"
                                        map-options
                                        emit-value
                                        clearable
                                        :label="$t('Time Set')"
                                        :item-id="cfu.timeset_id"
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
                                        v-model="cfu.sourceset_id"
                                        dense
                                        data-cy="aui-cfunconditional-sourceset-source"
                                        map-options
                                        emit-value
                                        clearable
                                        :label="$t('Source Set')"
                                        :item-id="cfu.sourceset_id"
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
                                        v-model="cfu.bnumberset_id"
                                        dense
                                        data-cy="aui-cfunconditional-bnumber"
                                        map-options
                                        emit-value
                                        clearable
                                        :label="$t('B-Number Set')"
                                        :item-id="cfu.bnumberset_id"
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
                            data-cy="aui-cfunconditional-delete"
                            size="md"
                            :disable="loading"
                            @click="deleteCFU(index)"
                        />
                    </q-card-actions>
                </q-card>
            </div>

            <q-btn
                :label="$t('Add Destination/time/BNumber/Source sets')"
                data-cy="aui-cfunconditional-addnew-set"
                color="primary"
                icon="add"
                size="sm"
                unelevated
                outline
                :disable="loading"
                @click="addCFU"
            />
        </div>
    </aui-base-form>
</template>

<script>
import baseFormMixin from 'src/mixins/base-form'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiBaseFormField from 'components/AuiBaseFormField'
import { required, helpers } from '@vuelidate/validators'
import AuiSelectCallForwardParams from 'components/AuiSelectCallForwardParams'

export default {
    name: 'AuiNewCallForwardingUnconditional',
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
                cfu: {
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
                cfu: this.initialFormData?.length > 0 ? [...this.initialFormData].sort((b, a) => a.cfm_id - b.cfm_id) : [defaultCF],
                subscriber_id: this.subscriberId
            }
        },
        initialDestinationOption () {
            return this.formData.cfu.map((item) => {
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
            return this.formData.cfu.map((item) => {
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
            return this.formData.cfu.map((item) => {
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
            return this.formData.cfu.map((item) => {
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
        addCFU () {
            this.formData.cfu.push({
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
        deleteCFU (index) {
            this.formData.cfu.splice(index, 1)
        },
        // Id is emitted by q-select, name needs to be manually updated
        updateName (value, index, field) {
            if (value) {
                this.formData.cfu[index][field] = value.name
                return
            }
            this.formData.cfu[index][field] = null
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
    margin-bottom: 2%
}
</style>
