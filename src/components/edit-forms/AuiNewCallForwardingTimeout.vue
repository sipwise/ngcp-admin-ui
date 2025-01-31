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
        <aui-base-form-field
            required
            class="q-pa-none"
        >
            <q-input
                v-model.trim="formData.cft_ringtimeout"
                clearable
                type="number"
                class="resizeField"
                outlined
                :disable="loading"
                :label="$t('After ring timeout')"
                data-cy="aui-cftimeout-ringtimeout"
                :error="hasFieldError('cft_ringtimeout')"
                :error-message="getFieldError('cft_ringtimeout')"
                @keyup.enter="submit"
            />
        </aui-base-form-field>

        <div
            v-if="formData?.cft?.length > 0"
            class="text-center"
        >
            <q-btn
                :label="$t('Add Destination/time/BNumber/Source sets')"
                data-cy="aui-cftimeout-addnew-set"
                class="q-mb-md"
                color="primary"
                icon="add"
                size="sm"
                unelevated
                outline
                :disable="loading"
                @click="addCFT"
            />

            <div
                v-for="(cft, index) in formData.cft"
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
                                        v-model="cft.enabled"
                                        :label="$t('Enabled')"
                                        data-cy="aui-cftimeout-enable"
                                        :disable="loading"
                                    />
                                </aui-base-form-field>
                                <aui-base-form-field>
                                    <q-toggle
                                        v-model="cft.use_redirection"
                                        :label="$t('Use redirection')"
                                        data-cy="aui-cftimeout-redirect"
                                        :disable="loading"
                                    />
                                </aui-base-form-field>
                            </q-card-section>

                            <q-card-section class="q-pa-xs">
                                <aui-base-form-field
                                    required
                                >
                                    <aui-select-call-forward-params
                                        v-model="cft.destinationset_id"
                                        class="q-pb-xs"
                                        dense
                                        data-cy="aui-cftimeout-destinationset-destination"
                                        map-options
                                        emit-value
                                        clearable
                                        :label="$t('Destination Set')"
                                        :item-id="cft.destinationset_id"
                                        :type="'destination'"
                                        :subscriber-id="subscriberId"
                                        :initial-option="initialDestinationOption && initialDestinationOption[index]"
                                        :disable="loading"
                                        :error="v$.$error && v$.formData.cft.$each.$response.$errors[index].destinationset_id.length > 0"
                                        :error-message="$errMsg(v$.formData.cft.$each.$response.$errors[index].destinationset_id)"
                                        @input-data="updateName($event, index, 'destinationset')"
                                    />
                                </aui-base-form-field>
                            </q-card-section>

                            <q-card-section class="q-pa-xs">
                                <aui-base-form-field>
                                    <aui-select-call-forward-params
                                        v-model="cft.timeset_id"
                                        dense
                                        data-cy="aui-cftimeout-timeset-time"
                                        map-options
                                        emit-value
                                        clearable
                                        :label="$t('Time Set')"
                                        :item-id="cft.timeset_id"
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
                                        v-model="cft.sourceset_id"
                                        dense
                                        data-cy="aui-cftimeout-sourceset-source"
                                        map-options
                                        emit-value
                                        clearable
                                        :label="$t('Source Set')"
                                        :item-id="cft.sourceset_id"
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
                                        v-model="cft.bnumberset_id"
                                        dense
                                        data-cy="aui-cftimeout-bnumber"
                                        map-options
                                        emit-value
                                        clearable
                                        :label="$t('B-Number Set')"
                                        :item-id="cft.bnumberset_id"
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
                            data-cy="aui-cftimeout-delete"
                            size="md"
                            :disable="loading"
                            @click="deleteCFT(index)"
                        />
                    </q-card-actions>
                </q-card>
            </div>
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
    name: 'AuiNewCallForwardingTimeout',
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
                cft: {
                    $each: helpers.forEach({
                        destinationset_id: {
                            required
                        }
                    })
                },
                cft_ringtimeout: {
                    required
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
                cft: this.initialFormData?.cft?.length > 0 ? [...this.initialFormData.cft].sort((b, a) => a.cfm_id - b.cfm_id) : [defaultCF],
                cft_ringtimeout: this.initialFormData?.cft_ringtimeout || 15,
                subscriber_id: this.subscriberId
            }
        },
        initialDestinationOption () {
            if (this.formData.cft.length === 0) {
                return null
            }

            return this.formData.cft.map((item) => {
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
            return this.formData.cft.map((item) => {
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
            return this.formData.cft.map((item) => {
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
            return this.formData.cft.map((item) => {
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
        addCFT () {
            this.formData.cft.unshift({
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
        deleteCFT (index) {
            this.formData.cft.splice(index, 1)
        },
        // Id is emitted by q-select, name needs to be manually updated
        updateName (value, index, field) {
            if (value) {
                this.formData.cft[index][field] = value.name
                return
            }
            this.formData.cft[index][field] = null
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
.resizeField {
    width: 50%;
}
</style>
