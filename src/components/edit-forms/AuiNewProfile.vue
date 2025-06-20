<template>
    <aui-reseller-form
        layout="6-6"
        dense-list
        :reseller="reseller"
        :reseller-id-acl="resellerIdAcl && !resellerId"
        :reseller-id="formData.reseller_id"
        :reseller-id-error="resellerIdHasError"
        :reseller-id-error-message="resellerIdGetError"
        :required-reseller="null"
        @update:model-value="resellerIdUpdate"
    >
        <slot
            name="actions"
            :loading="loading"
            :has-unsaved-data="hasUnsavedData"
            :has-invalid-data="hasInvalidData"
            :reset="reset"
            :submit="submit"
        />
        <template
            #reseller-id-after
        >
            <aui-create-reseller-button
                :form-data="formData"
            />
        </template>
        <template
            #col-1
        >
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.name"
                    dense
                    clearable
                    class="aui-required"
                    :label="$t('Name')"
                    data-cy="profilepackages-name"
                    :disable="loading"
                    :error="hasFieldError('name')"
                    :error-message="getFieldError('name')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.description"
                    dense
                    clearable
                    class="aui-required"
                    :label="$t('Description')"
                    data-cy="profilepackages-description"
                    :disable="loading"
                    :error="hasFieldError('description')"
                    :error-message="getFieldError('description')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.initial_balance"
                    dense
                    clearable
                    class="aui-required"
                    :label="$t('Initial Balance')"
                    data-cy="profilepackages-balance"
                    :disable="loading"
                    :error="hasFieldError('initial_balance')"
                    :error-message="getFieldError('initial_balance')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <q-list
                dense
            >
                <q-item-label
                    header
                    class="text-uppercase"
                >
                    {{ $t('INITIAL BILLING PROFILE/NETWORK') }}
                </q-item-label>
                <template
                    v-if="editableProfiles && editableProfiles.length > 0"
                >
                    <q-item
                        v-for="(editableProfile, index) in editableProfiles"
                        :key="index"
                    >
                        <q-item-section>
                            <div
                                class="row q-col-gutter-x-sm"
                            >
                                <div
                                    class="col-6"
                                >
                                    <aui-select-lazy
                                        v-model="formData.initial_profiles[index].profile_id"
                                        class="aui-required"
                                        :label="$t('Active Billing Profile')"
                                        data-cy="aui-select-initial-billing-profile"
                                        store-generator-name="selectLazy/billingProfilesList"
                                        :initial-option="billingProfilesInitialOption(index)"
                                        :error="v$.$error && v$.formData.initial_profiles.$each.$response.$errors[index].profile_id.length > 0"
                                        :error-message="$errMsg(v$.formData.initial_profiles.$each.$response.$errors[index].profile_id)"
                                        :load-initially="false"
                                        :disable="loading"
                                        dense
                                    />
                                </div>
                                <div
                                    class="col-6"
                                >
                                    <aui-select-lazy
                                        v-model="formData.initial_profiles[index].network_id"
                                        :label="$t('Active Billing Network')"
                                        data-cy="aui-select-initial-billing-network"
                                        store-generator-name="selectLazy/billingNetworksList"
                                        :initial-option="billingNetworksInitialOption(index)"
                                        :error="v$.$error && v$.formData.initial_profiles.$each.$response.$errors[index].network_id.length > 0"
                                        :error-message="$errMsg(v$.formData.initial_profiles.$each.$response.$errors[index].network_id)"
                                        :load-initially="false"
                                        :disable="loading"
                                        dense
                                    />
                                </div>
                            </div>
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
                                size="sm"
                                :disable="loading"
                                @click="deleteInterval(index)"
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
                            :label="$t('ADD ANOTHER INITIAL BILLING PROFILE/NETWORK')"
                            data-cy="profilepackages-initial-add"
                            color="primary"
                            icon="add"
                            size="sm"
                            unelevated
                            outline
                            :disable="loading"
                            @click="addBilling"
                        />
                    </q-item-section>
                </q-item>
            </q-list>
            <div class="row q-gutter">
                <div
                    class="col-grow"
                >
                    <aui-base-form-field>
                        <q-input
                            v-model.trim="formData.balance_interval_value"
                            dense
                            clearable
                            class="aui-required"
                            :label="$t('Balance Interval')"
                            data-cy="profilepackages-balanceinterval"
                            :disable="loading"
                            :error="hasFieldError('balance_interval_value')"
                            :error-message="getFieldError('balance_interval_value')"
                            @keyup.enter="submit"
                        />
                    </aui-base-form-field>
                </div>
                <div
                    class="col-3"
                >
                    <aui-base-form-field>
                        <q-select
                            v-model="formData.balance_interval_unit"
                            :options="unitTimes"
                            data-cy="profilepackages-balanceinterval"
                            emit-value
                            map-options
                            dense
                            :disable="loading"
                            :error="false"
                        />
                    </aui-base-form-field>
                </div>
            </div>
            <aui-base-form-field>
                <q-select
                    v-model="formData.balance_interval_start_mode"
                    :options="balanceIntervalStart"
                    :label="$t('Balance interval start')"
                    data-cy="profilepackages-balance"
                    emit-value
                    map-options
                    dense
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model="formData.carry_over_mode"
                    :options="carryOver"
                    :label="$t('Carry Over')"
                    data-cy="profilepackages-carry"
                    emit-value
                    map-options
                    dense
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <div class="row q-gutter">
                <div
                    class="col-grow"
                >
                    <aui-base-form-field>
                        <q-input
                            v-model.trim="formData.timely_duration_value"
                            dense
                            clearable
                            :label="$t('Timely duration')"
                            data-cy="profilepackages-timelyduration"
                            :disable="loading"
                            :error="hasFieldError('timely_duration_value')"
                            :error-message="getFieldError('timely_duration_value')"
                            @keyup.enter="submit"
                        />
                    </aui-base-form-field>
                </div>
                <div
                    class="col-3"
                >
                    <aui-base-form-field>
                        <q-select
                            v-model="formData.timely_duration_unit"
                            :options="unitTimes"
                            data-cy="profilepackages-timelyduration"
                            emit-value
                            map-options
                            dense
                            :disable="loading"
                            :error="false"
                        />
                    </aui-base-form-field>
                </div>
            </div>
        </template>
        <template #col-2>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.notopup_discard_intervals"
                    dense
                    clearable
                    :label="$t('Discard balance after intervals')"
                    data-cy="profilepackages-notupup"
                    :disable="loading"
                    :error="hasFieldError('notopup_discard_intervals')"
                    :error-message="getFieldError('notopup_discard_intervals')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.underrun_lock_threshold"
                    dense
                    clearable
                    :label="$t('Underrun lock threshold')"
                    data-cy="profilepackages-underrun"
                    :disable="loading"
                    :error="hasFieldError('underrun_lock_threshold')"
                    :error-message="getFieldError('underrun_lock_threshold')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model="formData.underrun_lock_level"
                    :options="underrunLockLevel"
                    :label="$t('Underrun lock level')"
                    data-cy="profilepackages-lock"
                    emit-value
                    map-options
                    dense
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.underrun_profile_threshold"
                    dense
                    clearable
                    :label="$t('Underrun profile threshold')"
                    data-cy="profilepackages-profile"
                    :disable="loading"
                    :error="hasFieldError('underrun_profile_threshold')"
                    :error-message="getFieldError('underrun_profile_threshold')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <q-list
                dense
            >
                <q-item-label
                    header
                    class="text-uppercase"
                >
                    {{ $t('UNDERRUN BILLING PROFILE/NETWORK') }}
                </q-item-label>
                <template
                    v-if="editableUnderruns && editableUnderruns.length > 0"
                >
                    <q-item
                        v-for="(editableUnderrun, index) in editableUnderruns"
                        :key="index"
                    >
                        <q-item-section>
                            <div
                                class="row q-col-gutter-x-sm"
                            >
                                <div
                                    class="col-6"
                                >
                                    <aui-select-lazy
                                        v-model="formData.underrun_profiles[index].profile_id"
                                        class="aui-required"
                                        :label="$t('Active Billing Profile')"
                                        data-cy="aui-select-underrun-billing-profile"
                                        store-generator-name="selectLazy/billingProfilesList"
                                        :initial-option="underrunProfilesInitialOption(index)"
                                        :error="v$.$error && v$.formData.underrun_profiles.$each.$response.$errors[index].profile_id.length > 0"
                                        :error-message="$errMsg(v$.formData.underrun_profiles.$each.$response.$errors[index].profile_id)"
                                        :load-initially="false"
                                        :disable="loading"
                                        dense
                                    />
                                </div>
                                <div
                                    class="col-6"
                                >
                                    <aui-select-lazy
                                        v-model="formData.underrun_profiles[index].network_id"
                                        :label="$t('Active Billing Network')"
                                        data-cy="aui-select-underrun-billing-network"
                                        store-generator-name="selectLazy/billingNetworksList"
                                        :initial-option="underrunNetworksInitialOption(index)"
                                        :error="v$.$error && v$.formData.underrun_profiles.$each.$response.$errors[index].network_id.length > 0"
                                        :error-message="$errMsg(v$.formData.underrun_profiles.$each.$response.$errors[index].network_id)"
                                        :load-initially="false"
                                        :disable="loading"
                                        dense
                                    />
                                </div>
                            </div>
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
                                @click="deleteUnderrun(index)"
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
                            :label="$t('ADD ANOTHER UNDERRUN BILLING PROFILE/NETWORK')"
                            data-cy="profilepackages-underrun-add"
                            color="primary"
                            icon="add"
                            size="sm"
                            unelevated
                            outline
                            :disable="loading"
                            @click="addUnderrun"
                        />
                    </q-item-section>
                </q-item>
            </q-list>
            <aui-base-form-field>
                <q-select
                    v-model="formData.topup_lock_level"
                    :options="topupLockLevel"
                    :label="$t('Top-up lock level')"
                    data-cy="profilepackages-topup"
                    emit-value
                    map-options
                    dense
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.service_charge"
                    dense
                    clearable
                    :label="$t('Service charge')"
                    data-cy="profilepackages-service"
                    :disable="loading"
                    :error="hasFieldError('Service charge')"
                    :error-message="getFieldError('Service charge')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <q-list
                dense
            >
                <q-item-label
                    header
                    class="text-uppercase"
                >
                    {{ $t('TOP-UP BILLING PROFILE/NETWORK') }}
                </q-item-label>
                <template
                    v-if="editableTopups && editableTopups.length > 0"
                >
                    <q-item
                        v-for="(editableTopup, index) in editableTopups"
                        :key="index"
                    >
                        <q-item-section>
                            <div
                                class="row q-col-gutter-x-sm"
                            >
                                <div
                                    class="col-6"
                                >
                                    <aui-select-lazy
                                        v-model="formData.topup_profiles[index].profile_id"
                                        class="aui-required"
                                        :label="$t('Active Billing Profile')"
                                        data-cy="aui-select-topup-billing-profile"
                                        store-generator-name="selectLazy/billingProfilesList"
                                        :initial-option="topupProfilesInitialOption(index)"
                                        :error="v$.$error && v$.formData.topup_profiles.$each.$response.$errors[index].profile_id.length > 0"
                                        :error-message="$errMsg(v$.formData.topup_profiles.$each.$response.$errors[index].profile_id)"
                                        :load-initially="false"
                                        :disable="loading"
                                        dense
                                    />
                                </div>
                                <div
                                    class="col-6"
                                >
                                    <aui-select-lazy
                                        v-model="formData.topup_profiles[index].network_id"
                                        :label="$t('Active Billing Network')"
                                        data-cy="aui-select-topup-billing-network"
                                        store-generator-name="selectLazy/billingNetworksList"
                                        :initial-option="topupNetworksInitialOption(index)"
                                        :error="v$.$error && v$.formData.topup_profiles.$each.$response.$errors[index].network_id.length > 0"
                                        :error-message="$errMsg(v$.formData.topup_profiles.$each.$response.$errors[index].network_id)"
                                        :load-initially="false"
                                        :disable="loading"
                                        dense
                                    />
                                </div>
                            </div>
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
                                @click="deleteTopup(index)"
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
                            :label="$t('ADD ANOTHER TOP-UP BILLING PROFILE/NETWORK')"
                            data-cy="profilepackages-topup-add"
                            color="primary"
                            icon="add"
                            size="sm"
                            unelevated
                            outline
                            :disable="loading"
                            @click="addTopup"
                        />
                    </q-item-section>
                </q-item>
            </q-list>
        </template>
    </aui-reseller-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    helpers,
    integer,
    minValue,
    numeric,
    required
} from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiCreateResellerButton from 'components/buttons/AuiCreateResellerButton'
import AuiResellerForm from 'components/edit-forms/AuiResellerForm'
import AuiSelectLazy from 'components/input/AuiSelectLazy'
import {
    billingNetworkLabel,
    billingProfileLabel
} from 'src/filters/resource'
import resellerFormMixin from 'src/mixins/reseller-form'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiNewProfile',
    components: {
        AuiBaseFormField,
        AuiCreateResellerButton,
        AuiResellerForm,
        AuiSelectLazy
    },
    mixins: [resellerFormMixin],
    props: {
        billingProfiles: {
            type: Array,
            default: null
        },
        underrunProfiles: {
            type: Array,
            default: null
        },
        topupProfiles: {
            type: Array,
            default: null
        },
        reseller: {
            type: Object,
            default: null
        },
        resellerId: {
            type: Number,
            default: null
        }
    },
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
                description: {
                    required
                },
                initial_profiles: {
                    $each: helpers.forEach({
                        profile_id: {
                            required
                        }
                    })
                },
                underrun_profiles: {
                    $each: helpers.forEach({
                        profile_id: {
                            required
                        }
                    })
                },
                topup_profiles: {
                    $each: helpers.forEach({
                        profile_id: {
                            required
                        }
                    })
                },
                balance_interval_value: {
                    minValue: minValue(1),
                    numeric,
                    integer,
                    required
                },
                initial_balance: {
                    integer,
                    numeric,
                    required
                },
                notopup_discard_intervals: {
                    integer,
                    numeric
                },
                underrun_profile_threshold: {
                    numeric
                },
                service_charge: {
                    numeric
                },
                timely_duration_value: {
                    integer,
                    numeric
                },
                underrun_lock_threshold: {
                    numeric
                }
            }
        }
    },
    computed: {
        ...mapGetters('billing', [
            'balanceIntervalStart',
            'carryOver',
            'underrunLockLevel',
            'topupLockLevel',
            'unitTimes'
        ]),
        aclEntity () {
            return 'profilepackages'
        },
        getDefaultData () {
            return {
                reseller_id: this.resellerId,
                name: null,
                description: null,
                initial_profiles: [{
                    profile_id: null,
                    network_id: null
                }],
                initial_balance: '0',
                balance_interval_value: null,
                balance_interval_unit: 'minute',
                balance_interval_start_mode: '1st',
                carry_over_mode: 'carry_over',
                timely_duration_value: null,
                timely_duration_unit: 'minute',
                notopup_discard_intervals: null,
                underrun_lock_threshold: null,
                underrun_lock_level: '',
                underrun_profile_threshold: null,
                underrun_profiles: [],
                topup_lock_level: '',
                service_charge: '0',
                topup_profiles: []
            }
        },
        billingProfilesInitialOption (index) {
            return (index) => {
                if (this.billingProfiles && this.billingProfiles[index]) {
                    return {
                        label: billingProfileLabel(this.billingProfiles[index].profile),
                        value: this.billingProfiles[index].profile.id
                    }
                }
                return null
            }
        },
        billingNetworksInitialOption (index) {
            return (index) => {
                if (this.billingProfiles && this.billingProfiles[index] && this.billingProfiles[index].network) {
                    return {
                        label: billingNetworkLabel(this.billingProfiles[index].network),
                        value: this.billingProfiles[index].network.id
                    }
                }
                return null
            }
        },
        underrunProfilesInitialOption (index) {
            return (index) => {
                if (this.underrunProfiles && this.underrunProfiles[index]) {
                    return {
                        label: billingProfileLabel(this.underrunProfiles[index].profile),
                        value: this.underrunProfiles[index].profile.id
                    }
                }
                return null
            }
        },
        underrunNetworksInitialOption (index) {
            return (index) => {
                if (this.underrunProfiles && this.underrunProfiles[index] && this.underrunProfiles[index].network) {
                    return {
                        label: billingNetworkLabel(this.underrunProfiles[index].network),
                        value: this.underrunProfiles[index].network.id
                    }
                }
                return null
            }
        },
        topupProfilesInitialOption (index) {
            return (index) => {
                if (this.topupProfiles && this.topupProfiles[index]) {
                    return {
                        label: billingProfileLabel(this.topupProfiles[index].profile),
                        value: this.topupProfiles[index].profile.id
                    }
                }
                return null
            }
        },
        topupNetworksInitialOption (index) {
            return (index) => {
                if (this.topupProfiles && this.topupProfiles[index] && this.topupProfiles[index].network) {
                    return {
                        label: billingNetworkLabel(this.topupProfiles[index].network),
                        value: this.topupProfiles[index].network.id
                    }
                }
                return null
            }
        },
        editableProfiles () {
            const profiles = []
            if (this.formData.initial_profiles && this.formData.initial_profiles.length > 0) {
                this.formData.initial_profiles.forEach((profile, index) => {
                    if (this.billingProfiles && this.billingProfiles[index]) {
                        profiles.push({
                            profile: {
                                id: profile.profile_id,
                                label: billingProfileLabel(this.billingProfiles[index].profile)
                            },
                            network: {
                                id: profile.network_id,
                                label: billingNetworkLabel(this.billingProfiles[index].network)
                            }
                        })
                    } else {
                        profiles.push({
                            profile: {
                                id: profile.profile_id,
                                label: ''
                            },
                            network: {
                                id: profile.network_id,
                                label: ''
                            }
                        })
                    }
                })
            }
            return profiles
        },
        editableUnderruns () {
            const underruns = []
            if (this.formData.underrun_profiles && this.formData.underrun_profiles.length > 0) {
                this.formData.underrun_profiles.forEach((underrun, index) => {
                    if (this.underrunProfiles && this.underrunProfiles[index]) {
                        underruns.push({
                            profile: {
                                id: underrun.profile_id,
                                label: billingProfileLabel(this.underrunProfiles[index].profile)
                            },
                            network: {
                                id: underrun.network_id,
                                label: billingNetworkLabel(this.underrunProfiles[index].network)
                            }
                        })
                    } else {
                        underruns.push({
                            profile: {
                                id: underrun.profile_id,
                                label: ''
                            },
                            network: {
                                id: underrun.network_id,
                                label: ''
                            }
                        })
                    }
                })
            }
            return underruns
        },
        editableTopups () {
            const topups = []
            if (this.formData.topup_profiles && this.formData.topup_profiles.length > 0) {
                this.formData.topup_profiles.forEach((topup, index) => {
                    if (this.topupProfiles && this.topupProfiles[index]) {
                        topups.push({
                            profile: {
                                id: topup.profile_id,
                                label: billingProfileLabel(this.topupProfiles[index].profile)
                            },
                            network: {
                                id: topup.network_id,
                                label: billingNetworkLabel(this.topupProfiles[index].network)
                            }
                        })
                    } else {
                        topups.push({
                            profile: {
                                id: topup.profile_id,
                                label: ''
                            },
                            network: {
                                id: topup.network_id,
                                label: ''
                            }
                        })
                    }
                })
            }
            return topups
        }
    },
    methods: {
        addBilling () {
            this.formData.initial_profiles.push({
                profile_id: null,
                network_id: null
            })
        },
        addUnderrun () {
            this.formData.underrun_profiles.push({
                profile_id: null,
                network_id: null
            })
        },
        addTopup () {
            this.formData.topup_profiles.push({
                profile_id: null,
                network_id: null
            })
        },
        deleteInterval (index) {
            this.formData.initial_profiles.splice(index, 1)
        },
        deleteUnderrun (index) {
            this.formData.underrun_profiles.splice(index, 1)
        },
        deleteTopup (index) {
            this.formData.topup_profiles.splice(index, 1)
        }
    }
}
</script>
