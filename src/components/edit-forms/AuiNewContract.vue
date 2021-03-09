<template>
    <q-form>
        <q-list
            dense
        >
            <q-item>
                <q-item-section>
                    <aui-select-contact
                        v-model="contactId"
                        dense
                        :error="$v.contactId.$error"
                        :error-message="$errMsg($v.contactId)"
                        @blur="$v.contactId.$touch()"
                    />
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>
                    <q-select
                        v-model="billingProfile"
                        :options="billingProfileTypeOptionsNoPackage"
                        :label="$t('Set Billing Profiles')"
                        emit-value
                        map-options
                        dense
                        :disable="loading"
                        @input="billingProfileChanged"
                    >
                        <q-tooltip>
                            {{ $t('Choose how to set billing profiles.') }}
                        </q-tooltip>
                    </q-select>
                </q-item-section>
            </q-item>
            <q-item
                v-if="billingProfile === 'single'"
            >
                <q-item-section>
                    <aui-select-lazy
                        v-model="billingProfileId"
                        :label="$t('Billing Profile')"
                        store-getter="billing/billingProfilesAsOptions"
                        store-action="billing/fetchBillingProfiles"
                        class="q-mt-md"
                        dense
                        :disable="loading"
                        :error="$v.billingProfileId.$error"
                        :error-message="$errMsg($v.billingProfileId)"
                        :load-initially="false"
                    />
                </q-item-section>
            </q-item>
            <template
                v-for="(profile, index) in billingProfileIntervals"
            >
                <q-item
                    :key="index + '-profile'"
                >
                    <q-item-section>
                        <aui-select-billing-profile
                            ref="billingProfile"
                            :index="index"
                            :disable="loading"
                            @billingProfileSelected="billingProfileSelected"
                        />
                    </q-item-section>
                </q-item>
                <q-item
                    :key="index + '-interval'"
                >
                    <q-item-section>
                        <aui-input-billing-profile-interval
                            ref="intervals"
                            :index="index"
                            :disable="loading"
                            @startInput="onStartInput"
                            @endInput="onEndInput"
                        />
                    </q-item-section>
                </q-item>
                <q-item
                    :key="index + '-actions'"
                >
                    <q-item-section>
                        <q-btn
                            icon="delete"
                            :label="$t('Delete interval')"
                            color="negative"
                            :disable="billingProfileIntervals.length === 1 || loading"
                            unelevated
                            size="sm"
                            @click="deleteInterval(index)"
                        />
                    </q-item-section>
                    <q-item-section>
                        <q-btn
                            v-if="index === billingProfileIntervals.length - 1 || loading"
                            icon="add"
                            :label="$t('Add interval')"
                            color="primary"
                            unelevated
                            size="sm"
                            @click="addInterval"
                        />
                    </q-item-section>
                </q-item>
            </template>
            <q-item>
                <q-item-section>
                    <q-select
                        v-model="status"
                        :options="customerStatusOptions"
                        :label="$t('Status')"
                        emit-value
                        map-options
                        dense
                        :disable="loading"
                        :error="$v.status.$error"
                        :error-message="$errMsg($v.status)"
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
                        v-model.trim="externalId"
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
    </q-form>
</template>

<script>
import {
    required
} from 'vuelidate/lib/validators'
import { mapWaitingActions, mapWaitingGetters } from 'vue-wait'
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiSelectLazy from 'components/input/AuiSelectLazy'
import AuiSelectContact from 'components/AuiSelectContact'
import AuiSelectBillingProfile from 'components/AuiSelectBillingProfile'
import AuiInputBillingProfileInterval from 'components/AuiInputBillingProfileInterval'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
    name: 'AuiNewContract',
    components: {
        AuiSelectLazy,
        AuiSelectContact,
        AuiSelectBillingProfile,
        AuiInputBillingProfileInterval
    },
    props: {
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
            contactId: null,
            billingProfile: 'single',
            billingProfileId: null,
            status: 'active',
            externalId: null
        }
    },
    validations () {
        let additionalFields
        if (this.billingProfileDefinition === 'id') {
            additionalFields = {
                billingProfileId: {
                    required
                }
            }
        }
        return {
            ...additionalFields,
            ...{
                contactId: {
                    required
                },
                billingProfile: {
                    required
                },
                status: {
                    required
                }
            }
        }
    },
    computed: {
        ...mapWaitingGetters({
            processingCreateDomain: 'processing createContract'
        }),
        ...mapState('billing', [
            'billingProfileIntervals'
        ]),
        ...mapGetters('billing', [
            'billingProfileTypeOptions'
        ]),
        ...mapGetters('customers', [
            'customerStatusOptions'
        ]),
        billingProfileDefinition () {
            const selectedProfile = this.billingProfileTypeOptionsNoPackage.filter(billingProfile => billingProfile.value === this.billingProfile)[0]
            return selectedProfile ? selectedProfile.definition : null
        },
        billingProfileTypeOptionsNoPackage () {
            return this.billingProfileTypeOptions.filter(item => item.value !== 'package')
        }
    },
    watch: {
        processingCreateContract (value) {
            this.$emit('processing', value)
        }
    },
    beforeMount () {
        this.resetIntervals()
    },
    methods: {
        ...mapWaitingActions('contracts', {
            createContract: 'processing createContract'
        }),
        ...mapActions('billing', [
            'addInterval',
            'resetIntervals',
            'editInterval',
            'deleteInterval'
        ]),
        billingProfileChanged (val) {
            if (val === 'schedule') {
                this.addInterval()
            } else {
                this.resetIntervals()
            }
        },
        onStartInput ({ value, index }) {
            this.editInterval({ index: index, field: 'start', value: value })
        },
        onEndInput ({ value, index }) {
            this.editInterval({ index: index, field: 'stop', value: value })
        },
        billingProfileSelected ({ value, index }) {
            this.editInterval({ index: index, field: 'profile_id', value: value })
        },
        async submit () {
            this.$v.$touch()
            let areIntervalsValid = true
            if (this.$refs.intervals) {
                this.$refs.intervals.forEach((comp) => {
                    comp.touch()
                    if (comp.$v.$invalid) {
                        areIntervalsValid = false
                    }
                })
            }
            if (this.$refs.billingProfile) {
                this.$refs.billingProfile.forEach((comp) => {
                    comp.touch()
                    if (comp.$v.$invalid) {
                        areIntervalsValid = false
                    }
                })
            }
            if (!this.$v.$invalid && areIntervalsValid) {
                try {
                    let submitData = {
                        contact_id: this.contactId,
                        type: this.type,
                        billing_profile_id: this.billingProfileId,
                        billing_profile_definition: this.billingProfileDefinition,
                        status: this.status,
                        external_id: this.externalId

                    }
                    if (this.billingProfile === 'schedule') {
                        submitData = {
                            ...submitData,
                            ...{
                                // the endpoint requires an empty interval as fallback
                                billing_profiles: [{
                                    // as fallback (i.e. when all intervals are expired)
                                    // profile_id of the first interval is taken
                                    profile_id: this.billingProfileIntervals[0].profile_id
                                }, ...this.billingProfileIntervals]
                            }
                        }
                    }
                    await this.createContract(submitData)
                    this.$emit('saved', submitData)

                    showGlobalSuccessMessage(this.$t('New contract created successfully'))
                } catch (err) {
                    showGlobalErrorMessage(err)
                }
            }
        }
    }
}
</script>
