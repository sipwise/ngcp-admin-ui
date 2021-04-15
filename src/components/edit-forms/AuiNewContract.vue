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
                    v-if="data.id && allBillingProfiles && allBillingProfiles.length > 0"
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
                        v-for="(billingProfile, index) in allBillingProfiles"
                        :key="index"
                        :active="billingProfile.id === data.billing_profile_id"
                        :disable="loading"
                    >
                        <q-item-section
                            avatar
                        >
                            <q-icon
                                name="fas fa-hand-holding-usd"
                            />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>
                                {{ billingProfile.label }}
                            </q-item-label>
                            <q-item-label
                                class="text-weight-light"
                            >
                                {{ billingProfile.start }} - {{ billingProfile.stop }}
                            </q-item-label>
                        </q-item-section>
                        <q-item-section
                            side
                        >
                            <q-toggle
                                :value="billingProfile.id === data.billing_profile_id"
                                :disable="billingProfile.id === data.billing_profile_id"
                                @input="triggerActivateBillingProfile({
                                    billingProfileId: billingProfile.id
                                })"
                            />
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
                    <q-item
                        v-if="data.id"
                    >
                        <q-item-section>
                            <q-input
                                :value="billingProfileInitialOption.label"
                                :label="$t('Active Billing Profile')"
                                dense
                                readonly
                                filled
                                label-color="primary"
                                color="primary"
                                :disable="loading"
                                :error="false"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-else
                    >
                        <q-item-section>
                            <aui-select-lazy
                                v-model="data.billing_profile_id"
                                dense
                                :label="$t('Billing Profile')"
                                store-getter="billing/billingProfilesAsOptions"
                                store-action="billing/fetchBillingProfiles"
                                :error="$v.data.billing_profile_id.$error"
                                :error-message="$errMsg($v.data.billing_profile_id)"
                                :load-initially="false"
                                :disabled="loading"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="data.id"
                    >
                        <q-item-section
                            v-if="!activateBillingProfile"
                            class="aui-list-item-section-button"
                            side
                        >
                            <q-btn
                                :label="$t('Activate Billing Profile')"
                                color="primary"
                                icon="toggle_on"
                                size="sm"
                                unelevated
                                :disabled="loading"
                                @click="enableBillingProfileActivation"
                            />
                        </q-item-section>
                        <q-item-section
                            v-else
                        >
                            <aui-select-lazy
                                v-model="activatedBillingProfile"
                                :label="$t('Billing Profile')"
                                store-getter="billing/billingProfilesAsOptions"
                                store-action="billing/fetchBillingProfiles"
                                dense
                                :disable="loading"
                                :load-initially="false"
                                :error="false"
                            >
                                <template
                                    v-slot:after
                                >
                                    <q-btn
                                        icon="check"
                                        :label="$t('Activate')"
                                        color="primary"
                                        unelevated
                                        size="sm"
                                        :disable="!activatedBillingProfile"
                                        @click="triggerActivateBillingProfile({
                                            billingProfileId: activatedBillingProfile
                                        })"
                                    />
                                    <q-btn
                                        icon="clear"
                                        :label="$t('Cancel')"
                                        color="primary"
                                        unelevated
                                        outline
                                        size="sm"
                                        @click="disableBillingProfileActivation"
                                    />
                                </template>
                            </aui-select-lazy>
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
                                                :label="$t('Billing Profile')"
                                                store-getter="billing/billingProfilesAsOptions"
                                                store-action="billing/fetchBillingProfiles"
                                                :initial-option="billingProfilesInitialOption(index)"
                                                :error="$v.data.billing_profiles.$each[index].profile_id.$error"
                                                :error-message="$errMsg($v.data.billing_profiles.$each[index].profile_id)"
                                                :load-initially="false"
                                                :disabled="loading"
                                            />
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
        value: {
            type: Object,
            default () {
                return {
                    id: null,
                    type: this.type,
                    contact_id: null,
                    status: null,
                    external_id: null,
                    billing_profile_definition: 'id',
                    billing_profile_id: null,
                    billing_profiles: [],
                    all_billing_profiles: []
                }
            }
        },
        relations: {
            type: Object,
            default: null
        },
        loading: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            data: _.cloneDeep(this.value),
            activateBillingProfile: false,
            activatedBillingProfile: null
        }
    },
    validations () {
        const dynamicValidations = {}
        if (!this.data.id) {
            dynamicValidations.billing_profile_id = {
                required
            }
        }
        return {
            data: {
                contact_id: {
                    required
                },
                status: {
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
                },
                ...dynamicValidations
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
            if (this.relations && this.relations.contact) {
                return {
                    label: this.relations.contact.email,
                    value: this.relations.contact.id
                }
            } else {
                return null
            }
        },
        billingProfileInitialOption () {
            if (this.relations && this.relations.billingProfile) {
                return createBillingProfileOption(this.relations.billingProfile)
            } else {
                return null
            }
        },
        billingProfilesInitialOption () {
            return (index) => {
                if (this.relations && this.relations.billingProfiles && this.relations.billingProfiles[index]) {
                    return createBillingProfileOption(this.relations.billingProfiles[index].profile)
                } else {
                    return null
                }
            }
        },
        allBillingProfiles () {
            const profiles = []
            if (this.data.all_billing_profiles) {
                this.data.all_billing_profiles.forEach((profile, index) => {
                    profiles.push({
                        id: profile.profile_id,
                        label: createBillingProfileOption(this.relations.allBillingProfiles[index].profile).label,
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
        }
    },
    watch: {
        value (contract) {
            this.syncData(contract)
        }
    },
    mounted () {
        this.syncData(this.value)
    },
    methods: {
        ...mapWaitingActions('contracts', {
            createContract: 'processing createContract'
        }),
        async submit () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                const additionalData = {}
                let profiles = this.data.billing_profiles
                if (this.data.id) {
                    additionalData.id = this.data.id
                } else {
                    profiles = [{
                        profile_id: this.data.billing_profile_id,
                        start: null,
                        stop: null
                    }, ...profiles]
                }
                this.$emit('input', {
                    type: this.type,
                    billing_profile_definition: 'profiles',
                    billing_profiles: profiles,
                    contact_id: this.data.contact_id,
                    external_id: this.data.external_id,
                    status: this.data.status,
                    ...additionalData
                })
            }
        },
        reset () {
            this.syncData(this.value)
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
        resetIntervals () {
            this.data.billing_profiles = []
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
        enableBillingProfileActivation () {
            this.activateBillingProfile = true
            this.activatedBillingProfile = null
        },
        disableBillingProfileActivation () {
            this.activateBillingProfile = false
            this.activatedBillingProfile = null
        },
        triggerActivateBillingProfile ({ billingProfileId }) {
            this.$emit('activate-billing-profile', {
                billingProfileId,
                contractId: this.value.id
            })
        },
        syncData (data) {
            this.data = _.cloneDeep(data)
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass" scoped>
.aui-list-item-section-button
    height: 60px
    padding-bottom: 20px
</style>
