<template>
    <q-form>
        <div
            class="row"
        >
            <div
                class="col-md-6 col-sm-12"
            >
                <q-list
                    dense
                >
                    <q-item-label
                        header
                        class="text-uppercase"
                    >
                        <q-icon
                            name="description"
                            size="sm"
                            class="q-mr-sm"
                        />
                        {{ $t('Details') }}
                    </q-item-label>
                    <q-item>
                        <q-item-section>
                            <q-input
                                :value="type"
                                dense
                                :label="$t('Contract type')"
                                :disable="true"
                                :readonly="true"
                                :error="false"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-select-contact
                                v-model="data.contact_id"
                                dense
                                class="aui-required"
                                type="system"
                                :disable="loading"
                                :error="$v.data.contact_id.$error"
                                :error-message="$errMsg($v.data.contact_id)"
                                :initial-option="contactInitialOption"
                                @blur="$v.data.contact_id.$touch()"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-select
                                v-model="data.status"
                                :options="customerStatusOptions"
                                class="aui-required"
                                :label="$t('Status')"
                                emit-value
                                map-options
                                dense
                                :disable="loading"
                                :error="$v.data.status.$error"
                                :error-message="$errMsg($v.data.status)"
                            >
                                <q-tooltip>
                                    {{ $t('The status of the contract.') }}
                                </q-tooltip>
                            </q-select>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="data.external_id"
                                clearable
                                dense
                                :label="$t('External #')"
                                :disable="loading"
                                :error="false"
                            >
                                <q-tooltip>
                                    {{ $t('A non-unique external ID e.g., provided by a 3rd party provisioning') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                </q-list>
                <q-list
                    v-if="contract && allBillingProfilesItems && allBillingProfilesItems.length > 0"
                    separator
                >
                    <q-item-label
                        header
                        class="text-uppercase"
                    >
                        <q-icon
                            name="history"
                            size="sm"
                            class="q-mr-sm"
                        />
                        {{ $t('Billing Profile History') }}
                    </q-item-label>
                    <q-item
                        v-for="(billingProfileItem, index) in allBillingProfilesItems"
                        :key="index"
                        :active="billingProfileItem.id === data.billing_profile_id &&
                            index === contract.billing_profiles.length"
                        :disable="loading"
                    >
                        <q-item-section
                            avatar
                        >
                            <q-icon
                                v-if="index < contract.billing_profiles.length"
                                name="date_range"
                            />
                            <q-icon
                                v-else-if="index === contract.billing_profiles.length"
                                name="fas fa-hand-holding-usd"
                            />
                            <q-icon
                                v-else
                                name="remove"
                            />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>
                                {{ billingProfileItem.label }}
                            </q-item-label>
                            <q-item-label
                                class="text-weight-light"
                            >
                                {{ billingProfileItem.start }} - {{ billingProfileItem.stop }}
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
            <div
                class="col-md-6 col-sm-12"
            >
                <q-list
                    dense
                >
                    <q-item-label
                        header
                        class="text-uppercase"
                    >
                        <q-icon
                            name="fas fa-hand-holding-usd"
                            size="sm"
                            class="q-mr-sm"
                        />
                        {{ $t('Billing Profile') }}
                    </q-item-label>
                    <q-item>
                        <q-item-section>
                            <aui-select-lazy
                                v-model="data.billing_profile_id"
                                class="aui-required"
                                :label="$t('Active Billing Profile')"
                                store-generator-name="selectLazy/billingProfilesList"
                                :error="$v.data.billing_profile_id.$error"
                                :error-message="$errMsg($v.data.billing_profile_id)"
                                :load-initially="false"
                                :initial-option="billingProfileInitialOption"
                                :disabled="loading"
                                create-buttons="/billing/create/noreseller"
                                label-color="primary"
                                filled
                                dense
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
                <q-list
                    dense
                >
                    <q-item-label
                        header
                        class="text-uppercase"
                    >
                        <q-icon
                            name="date_range"
                            size="sm"
                            class="q-mr-sm"
                        />
                        {{ $t('Scheduled Billing Profiles') }}
                    </q-item-label>
                    <q-item>
                        <q-item-section
                            class="aui-list-item-section-button"
                            side
                        >
                            <q-btn
                                :label="$t('Schedule Billing Profile')"
                                color="primary"
                                icon="add"
                                size="sm"
                                unelevated
                                :disabled="loading"
                                @click="addInterval"
                            />
                        </q-item-section>
                    </q-item>
                    <template
                        v-if="editableProfiles && editableProfiles.length > 0"
                    >
                        <template
                            v-for="(editableProfile, index) in editableProfiles"
                        >
                            <q-item
                                :key="index"
                            >
                                <q-item-section>
                                    <div
                                        class="row"
                                    >
                                        <div
                                            class="col-12"
                                        >
                                            <aui-select-lazy
                                                v-model="data.billing_profiles[index].profile_id"
                                                dense
                                                class="aui-required"
                                                :label="$t('Billing Profile')"
                                                store-generator-name="selectLazy/billingProfilesList"
                                                :initial-option="billingProfilesInitialOption(index)"
                                                :error="$v.data.billing_profiles.$each[index].profile_id.$error"
                                                :error-message="$errMsg($v.data.billing_profiles.$each[index].profile_id)"
                                                :load-initially="false"
                                                :disabled="loading"
                                            >
                                                <template
                                                    v-slot:prepend
                                                >
                                                    <q-icon
                                                        name="fas fa-hand-holding-usd"
                                                        size="sm"
                                                        class="q-mr-sm"
                                                    />
                                                </template>
                                            </aui-select-lazy>
                                        </div>
                                        <div
                                            class="col-12"
                                        >
                                            <aui-input-date-time-period
                                                :value="getBillingProfilePeriods(index)"
                                                dense
                                                column-gutter-size="sm"
                                                :disabled="loading"
                                                :error-start="$v.data.billing_profiles.$each[index].start.$error"
                                                :error-message-start="$errMsg($v.data.billing_profiles.$each[index].start)"
                                                :error-stop="$v.data.billing_profiles.$each[index].stop.$error"
                                                :error-message-stop="$errMsg($v.data.billing_profiles.$each[index].stop)"
                                                @input="setBillingProfilePeriod(index, $event)"
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
                                        @click="deleteInterval(index)"
                                    />
                                </q-item-section>
                            </q-item>
                        </template>
                    </template>
                </q-list>
            </div>
        </div>
    </q-form>
</template>

<script>
import _ from 'lodash'
import {
    required
} from 'vuelidate/lib/validators'
import {
    mapWaitingActions
} from 'vue-wait'
import AuiSelectContact from 'components/AuiSelectContact'
import {
    mapGetters
} from 'vuex'
import AuiSelectLazy from 'components/input/AuiSelectLazy'
import AuiInputDateTimePeriod from 'components/input/AuiInputDateTimePeriod'

function createBillingProfileOption (profile) {
    return {
        label: '#' + profile.id + ' - ' + profile.name + ' (' + profile.handle + ')',
        value: profile.id
    }
}

export default {
    name: 'AuiNewContract',
    components: {
        AuiInputDateTimePeriod,
        AuiSelectLazy,
        AuiSelectContact
    },
    props: {
        contract: {
            type: Object,
            default: null
        },
        contact: {
            type: Object,
            default: null
        },
        billingProfile: {
            type: Object,
            default: null
        },
        billingProfiles: {
            type: Array,
            default: null
        },
        allBillingProfiles: {
            type: Array,
            default: null
        },
        loading: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: null
        }
    },
    data () {
        return {
            data: this.getDynamicData(this.contract)
        }
    },
    validations () {
        return {
            data: {
                contact_id: {
                    required
                },
                status: {
                    required
                },
                billing_profile_id: {
                    required
                },
                billing_profiles: {
                    $each: {
                        profile_id: {
                            required
                        },
                        start: {
                            required
                        },
                        stop: {
                        }
                    }
                }
            }
        }
    },
    computed: {
        ...mapGetters('billing', [
            'billingProfileTypeOptions'
        ]),
        ...mapGetters('customers', [
            'customerStatusOptions'
        ]),
        contactInitialOption () {
            if (this.contact) {
                return {
                    label: this.contact.email,
                    value: this.contact.id
                }
            } else {
                return null
            }
        },
        billingProfileInitialOption () {
            if (this.billingProfile) {
                return createBillingProfileOption(this.billingProfile)
            } else {
                return null
            }
        },
        billingProfilesInitialOption () {
            return (index) => {
                if (this.billingProfiles && this.billingProfiles[index]) {
                    return createBillingProfileOption(this.billingProfiles[index].profile)
                } else {
                    return null
                }
            }
        },
        allBillingProfilesItems () {
            const profiles = []
            if (this.contract && this.contract.all_billing_profiles) {
                this.contract.all_billing_profiles.forEach((profile, index) => {
                    profiles.push({
                        id: profile.profile_id,
                        label: createBillingProfileOption(this.allBillingProfiles[index].profile).label,
                        start: profile.start || profile.effective_start_time,
                        stop: profile.stop
                    })
                })
            }
            return profiles.reverse()
        },
        editableProfiles () {
            const profiles = []
            if (this.data.billing_profiles && this.data.billing_profiles.length > 0) {
                this.data.billing_profiles.forEach((profile, index) => {
                    if (this.relations && this.relations.billingProfiles && this.relations.billingProfiles[index]) {
                        profiles.push({
                            id: profile.profile_id,
                            label: this.relations.billingProfiles[index].profile.name,
                            start: profile.start || profile.effective_start_time,
                            stop: profile.stop
                        })
                    } else {
                        profiles.push({
                            id: null,
                            label: null,
                            start: null,
                            stop: null
                        })
                    }
                })
            }
            return profiles
        },
        hasUnsavedData () {
            const initialData = this.getDynamicData(this.contract)
            const currentData = this.getDynamicData(this.data)
            return !_.isEqual(initialData, currentData)
        }
    },
    watch: {
        contract (value) {
            this.data = this.getDynamicData(value)
        },
        hasUnsavedData (value) {
            this.$emit('has-unsaved-data', value)
            this.$parent.$emit('form-has-unsaved-data', value)
        }
    },
    methods: {
        ...mapWaitingActions('contracts', {
            createContract: 'processing createContract'
        }),
        submit () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                const additionalData = {}
                if (this.contract) {
                    additionalData.id = this.contract.id
                    if (this.contract.billing_profile_id !== this.data.billing_profile_id) {
                        additionalData.billing_profile_id = this.data.billing_profile_id
                    }
                } else {
                    additionalData.billing_profile_id = this.data.billing_profile_id
                }
                const finalData = {
                    type: this.type,
                    billing_profiles: this.data.billing_profiles,
                    contact_id: this.data.contact_id,
                    external_id: this.data.external_id,
                    status: this.data.status,
                    ...additionalData
                }
                this.$emit('input', finalData)
                this.$parent.$emit('form-input', finalData)
            }
        },
        reset () {
            this.data = this.getDynamicData(this.contract)
            this.$v.$reset()
        },
        addInterval () {
            this.data.billing_profiles.push({
                start: null,
                stop: null,
                profile_id: null
            })
        },
        deleteInterval (index) {
            this.data.billing_profiles.splice(index, 1)
        },
        setBillingProfilePeriod (index, period) {
            this.data.billing_profiles[index].start = period.start
            this.data.billing_profiles[index].stop = period.stop
        },
        getBillingProfilePeriods (index) {
            return {
                start: this.data.billing_profiles[index].start,
                stop: this.data.billing_profiles[index].stop
            }
        },
        getDynamicData (data) {
            if (data) {
                let profiles = []
                if (data.billing_profiles) {
                    profiles = [
                        ...data.billing_profiles
                    ]
                }
                return {
                    contact_id: data.contact_id,
                    status: data.status,
                    external_id: data.external_id,
                    billing_profile_id: data.billing_profile_id,
                    billing_profiles: profiles
                }
            } else {
                return {
                    contact_id: null,
                    status: null,
                    external_id: null,
                    billing_profile_id: null,
                    billing_profiles: []
                }
            }
        }
    }
}
</script>
